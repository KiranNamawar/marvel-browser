const version = 'v0';
const CACHE_PREFIX = 'marvel-browser-cache-';
const CACHE = CACHE_PREFIX + version;
const IMAGES_CACHE = CACHE + '-images';

const marvelEndpoint = 'gateway.marvel.com/v1/public/';

self.addEventListener('fetch', (evt) => {
	if (evt.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(evt.request.url);
		if (url.href.includes(marvelEndpoint)) {
			const cache = await caches.open(CACHE);
			const cached = await cache.match(evt.request);
			if (cached) {
				console.log('[SW] Cache hit for:', url.href); // DEBUG
				return cached;
			}
			try {
				console.log('[SW] Cache miss, fetching from network:', url.href); // DEBUG
				const res = await fetch(evt.request);
				if (res.ok) {
					cache.put(evt.request, res.clone());
				}
				return res;
			} catch (err) {
				return new Response('Offline or network error', {
					status: 503,
					statusText: 'Service Unavailable'
				});
			}
		} else if (url.pathname.includes('/i/mg/')) {
			const cache = await caches.open(IMAGES_CACHE);
			const cached = await cache.match(evt.request);
			if (cached) {
				console.log('[SW] Cache hit for:', url.href); // DEBUG
				return cached;
			}
			try {
				console.log('[SW] Cache miss, fetching from network:', url.href); // DEBUG
				const res = await fetch(evt.request, { mode: 'no-cors' });
				if (res.ok || res.type === 'opaque') {
					cache.put(evt.request, res.clone());
				}
				return res;
			} catch (err) {
				return new Response('Offline or network error', {
					status: 503,
					statusText: 'Service Unavailable'
				});
			}
		} else {
			return fetch(evt.request);
		}
	}
	evt.respondWith(respond());
});

self.addEventListener('activate', (evt) => {
	evt.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(
				keys
					.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE)
					.map((key) => caches.delete(key))
			);
			self.clients.claim();
		})()
	);
});
