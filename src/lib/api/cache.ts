// Cache utility with IndexedDB (with localStorage fallback) and 24-hour expiration

interface CacheEntry<T> {
	data: T;
	timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const DB_NAME = 'marvel-cache';
const DB_VERSION = 1;
const STORE_NAME = 'cache';

let dbPromise: Promise<IDBDatabase> | null = null;

// Initialize IndexedDB
function initDB(): Promise<IDBDatabase> {
	if (dbPromise) return dbPromise;

	dbPromise = new Promise((resolve, reject) => {
		if (typeof indexedDB === 'undefined') {
			reject(new Error('IndexedDB not available'));
			return;
		}

		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => reject(request.error);
		request.onsuccess = () => resolve(request.result);

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME);
			}
		};
	});

	return dbPromise;
}

// IndexedDB operations
async function getFromIndexedDB<T>(key: string): Promise<T | null> {
	try {
		const db = await initDB();
		const transaction = db.transaction(STORE_NAME, 'readonly');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.get(key);

		return new Promise((resolve, reject) => {
			request.onsuccess = () => {
				const entry: CacheEntry<T> | undefined = request.result;
				if (!entry) {
					resolve(null);
					return;
				}

				const now = Date.now();
				if (now - entry.timestamp < CACHE_DURATION) {
					resolve(entry.data);
				} else {
					// Cache expired, remove it
					deleteFromIndexedDB(key);
					resolve(null);
				}
			};
			request.onerror = () => reject(request.error);
		});
	} catch (error) {
		console.warn('IndexedDB get failed, falling back to localStorage:', error);
		return null;
	}
}

async function setToIndexedDB<T>(key: string, data: T): Promise<void> {
	try {
		const db = await initDB();
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		const entry: CacheEntry<T> = {
			data,
			timestamp: Date.now()
		};
		store.put(entry, key);

		return new Promise((resolve, reject) => {
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
	} catch (error) {
		console.warn('IndexedDB set failed:', error);
		throw error;
	}
}

async function deleteFromIndexedDB(key: string): Promise<void> {
	try {
		const db = await initDB();
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		store.delete(key);

		return new Promise((resolve, reject) => {
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
	} catch (error) {
		console.warn('IndexedDB delete failed:', error);
	}
}

async function clearIndexedDB(prefix?: string): Promise<void> {
	try {
		const db = await initDB();
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);

		if (prefix) {
			// Clear specific prefix
			const request = store.openCursor();
			request.onsuccess = (event) => {
				const cursor = (event.target as IDBRequest).result;
				if (cursor) {
					if (cursor.key.toString().startsWith(prefix)) {
						cursor.delete();
					}
					cursor.continue();
				}
			};
		} else {
			// Clear all
			store.clear();
		}

		return new Promise((resolve, reject) => {
			transaction.oncomplete = () => resolve();
			transaction.onerror = () => reject(transaction.error);
		});
	} catch (error) {
		console.warn('IndexedDB clear failed:', error);
	}
}

// LocalStorage fallback operations
function getFromLocalStorage<T>(key: string): T | null {
	if (typeof localStorage === 'undefined') return null;

	try {
		const cached = localStorage.getItem(key);
		if (!cached) return null;

		const entry: CacheEntry<T> = JSON.parse(cached);
		const now = Date.now();

		if (now - entry.timestamp < CACHE_DURATION) {
			return entry.data;
		}

		localStorage.removeItem(key);
		return null;
	} catch (error) {
		console.error('Error reading from localStorage:', error);
		return null;
	}
}

function setToLocalStorage<T>(key: string, data: T): void {
	if (typeof localStorage === 'undefined') return;

	try {
		const entry: CacheEntry<T> = {
			data,
			timestamp: Date.now()
		};
		localStorage.setItem(key, JSON.stringify(entry));
	} catch (error) {
		console.error('Error writing to localStorage:', error);
	}
}

function clearLocalStorage(key?: string): void {
	if (typeof localStorage === 'undefined') return;

	if (key) {
		localStorage.removeItem(key);
	} else {
		const keys = Object.keys(localStorage);
		keys.forEach((k) => {
			if (k.startsWith('marvel_')) {
				localStorage.removeItem(k);
			}
		});
	}
}

// Public API with automatic fallback
export async function getCachedData<T>(key: string): Promise<T | null> {
	// Try IndexedDB first
	const indexedDBResult = await getFromIndexedDB<T>(key);
	if (indexedDBResult !== null) {
		return indexedDBResult;
	}

	// Fallback to localStorage
	return getFromLocalStorage<T>(key);
}

export async function setCachedData<T>(key: string, data: T): Promise<void> {
	// Try IndexedDB first
	try {
		await setToIndexedDB(key, data);
	} catch (error) {
		// Fallback to localStorage
		console.warn('Using localStorage fallback for caching');
		setToLocalStorage(key, data);
	}
}

export async function clearCache(key?: string): Promise<void> {
	// Clear from both stores
	await clearIndexedDB(key ? undefined : 'marvel_');
	if (key) {
		await deleteFromIndexedDB(key);
		clearLocalStorage(key);
	} else {
		clearLocalStorage();
	}
}

export async function clearExpiredCache(): Promise<void> {
	const now = Date.now();

	// Clear expired from IndexedDB
	try {
		const db = await initDB();
		const transaction = db.transaction(STORE_NAME, 'readwrite');
		const store = transaction.objectStore(STORE_NAME);
		const request = store.openCursor();

		request.onsuccess = (event) => {
			const cursor = (event.target as IDBRequest).result;
			if (cursor) {
				const entry: CacheEntry<unknown> = cursor.value;
				if (now - entry.timestamp >= CACHE_DURATION) {
					cursor.delete();
				}
				cursor.continue();
			}
		};
	} catch (error) {
		console.warn('Failed to clear expired IndexedDB cache:', error);
	}

	// Clear expired from localStorage
	if (typeof localStorage !== 'undefined') {
		const keys = Object.keys(localStorage);
		keys.forEach((key) => {
			if (key.startsWith('marvel_')) {
				try {
					const cached = localStorage.getItem(key);
					if (cached) {
						const entry: CacheEntry<unknown> = JSON.parse(cached);
						if (now - entry.timestamp >= CACHE_DURATION) {
							localStorage.removeItem(key);
						}
					}
				} catch (error) {
					localStorage.removeItem(key);
				}
			}
		});
	}
}
