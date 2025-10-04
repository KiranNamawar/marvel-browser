import type { Image, MarvelDataWrapper } from '$lib/types';

type ImageVariant =
	| 'detail'
	| 'portrait_small'
	| 'portrait_medium'
	| 'portrait_xlarge'
	| 'portrait_fantastic'
	| 'portrait_uncanny'
	| 'portrait_incredible'
	| 'standard_small'
	| 'standard_medium'
	| 'standard_large'
	| 'standard_xlarge'
	| 'standard_fantastic'
	| 'standard_amazing'
	| 'landscape_small'
	| 'landscape_medium'
	| 'landscape_large'
	| 'landscape_xlarge'
	| 'landscape_amazing'
	| 'landscape_incredible';

export function getImageUrl(
	thumbnail: Image,
	variant: ImageVariant = 'detail'
): string {
	return `${thumbnail.path}/${variant}.${thumbnail.extension}`;
}

type ResourceType = 'characters' | 'comics' | 'creators' | 'events' | 'series' | 'stories';

export function parseResourceURI(uri: string): { type: ResourceType; id: number } | null {
	const match = uri.match(/\/(\w+)\/(\d+)$/);
	if (match) {
		return { type: match[1] as ResourceType, id: parseInt(match[2], 10) };
	}
	return null;
}

export function getIdFromURI(uri: string): number | null {
	const parsed = parseResourceURI(uri);
	return parsed ? parsed.id : null;
}

/**
 * Generic function to fetch resources from URIs with graceful error handling.
 * Resources that fail to fetch (e.g., 404) are filtered out.
 *
 * @param resources - Array of resource summaries with resourceURI
 * @param fetchById - Function to fetch a single resource by ID
 * @returns Promise of array of successfully fetched resources
 */
export async function fetchFromURIs<TSummary extends { resourceURI: string }, T>(
	resources: TSummary[],
	fetchById: (id: number) => Promise<MarvelDataWrapper<T>>
): Promise<T[]> {
	const ids = resources
		.map((resource) => getIdFromURI(resource.resourceURI))
		.filter((n): n is number => n !== null);

	// Use Promise.allSettled to handle individual failures gracefully
	const results = await Promise.allSettled(ids.map((id) => fetchById(id)));

	// Filter out rejected promises and extract successful results
	return results
		.filter((result) => result.status === 'fulfilled')
		.map((result) => result.value.data.results[0])
		.filter((item) => item !== undefined);
}
