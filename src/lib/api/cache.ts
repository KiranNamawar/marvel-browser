// Cache utility with 24-hour expiration

interface CacheEntry<T> {
	data: T;
	timestamp: number;
}

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function getCachedData<T>(key: string): T | null {
	if (typeof localStorage === 'undefined') return null;

	try {
		const cached = localStorage.getItem(key);
		if (!cached) return null;

		const entry: CacheEntry<T> = JSON.parse(cached);
		const now = Date.now();

		// Check if cache is still valid (within 24 hours)
		if (now - entry.timestamp < CACHE_DURATION) {
			return entry.data;
		}

		// Cache expired, remove it
		localStorage.removeItem(key);
		return null;
	} catch (error) {
		console.error('Error reading from cache:', error);
		return null;
	}
}

export function setCachedData<T>(key: string, data: T): void {
	if (typeof localStorage === 'undefined') return;

	try {
		const entry: CacheEntry<T> = {
			data,
			timestamp: Date.now()
		};
		localStorage.setItem(key, JSON.stringify(entry));
	} catch (error) {
		console.error('Error writing to cache:', error);
	}
}

export function clearCache(key?: string): void {
	if (typeof localStorage === 'undefined') return;

	if (key) {
		localStorage.removeItem(key);
	} else {
		// Clear all Marvel API cache
		const keys = Object.keys(localStorage);
		keys.forEach((k) => {
			if (k.startsWith('marvel_')) {
				localStorage.removeItem(k);
			}
		});
	}
}

export function clearExpiredCache(): void {
	if (typeof localStorage === 'undefined') return;

	const keys = Object.keys(localStorage);
	const now = Date.now();

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
				// Invalid cache entry, remove it
				localStorage.removeItem(key);
			}
		}
	});
}
