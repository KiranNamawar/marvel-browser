import { PUBLIC_MARVEL_API_KEY as apikey } from '$env/static/public';
import { getCachedData, setCachedData } from './cache';

const API_BASE_URL = 'https://gateway.marvel.com/v1/public';

export interface FetchOptions {
	limit?: number;
	offset?: number;
	orderBy?: string;
	[key: string]: string | number | undefined;
}

/**
 * Build URL with query parameters
 */
function buildUrl(endpoint: string, params: FetchOptions = {}): string {
	const url = new URL(`${API_BASE_URL}${endpoint}`);
	url.searchParams.set('apikey', apikey);

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			url.searchParams.set(key, String(value));
		}
	});

	return url.toString();
}

/**
 * Generate cache key from endpoint and params
 */
function getCacheKey(endpoint: string, params: FetchOptions = {}): string {
	const paramString = Object.entries(params)
		.filter(([_, value]) => value !== undefined && value !== null)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => `${key}=${value}`)
		.join('&');

	return `marvel_${endpoint.replace(/\//g, '_')}${paramString ? '_' + paramString : ''}`;
}

/**
 * Generic fetch function with caching
 */
export async function fetchMarvelData<T>(endpoint: string, params: FetchOptions = {}): Promise<T> {
	const cacheKey = getCacheKey(endpoint, params);

	// Try to get from cache
	const cached = await getCachedData<T>(cacheKey);
	if (cached) {
		console.log(`Cache hit for: ${endpoint}`);
		return cached;
	}

	// Fetch from API
	console.log(`Fetching from API: ${endpoint}`);
	const url = buildUrl(endpoint, params);

	try {
		const response = await fetch(url);

		if (!response.ok) {
			const errorMsg = `Marvel API error: ${response.status}`;
			console.warn(`${errorMsg} for ${endpoint}`);
			throw new Error(errorMsg);
		}

		const data = await response.json();

		// Check if the response indicates an error
		if (data.code && data.code !== 200) {
			throw new Error(`Marvel API error: ${data.status || 'Unknown error'}`);
		}

		// Cache the successful response
		await setCachedData(cacheKey, data);

		return data;
	} catch (error) {
		console.error('Error fetching Marvel data:', error);
		throw error;
	}
}
