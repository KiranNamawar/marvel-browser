import { PUBLIC_MARVEL_API_KEY } from '$env/static/public';

const BASE_URL = 'https://gateway.marvel.com/v1/public/';

interface Options {
	offset: number;
	limit: number;
	[query: string]: string | number;
}

type Endpoint =
	`${'characters' | 'comics' | 'series' | 'events' | 'stories' | 'creators'}${string}`;

export async function getMarvelData(endpoint: Endpoint, options: Options) {
	try {
		const url = new URL(endpoint, BASE_URL);

		const params = new URLSearchParams(url.search);
		params.set('apikey', PUBLIC_MARVEL_API_KEY);
		for (let [key, value] of Object.entries(options)) {
			params.set(key, String(value));
		}
		url.search = params.toString();

		const res = await fetch(url.href);
		if (!res.ok) {
			throw new Error(`API Error: ${res.status} ${res.statusText}`);
		}
		return res.json();
	} catch (err) {
		console.error('Error in getMarvelData: ', err);
		throw err;
	}
}
