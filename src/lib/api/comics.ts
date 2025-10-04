import type { Comic, ComicDataWrapper, ComicSummary } from '$lib/types';
import { fetchMarvelData, type FetchOptions } from './client';
import { fetchFromURIs } from './util';

/**
 * Get all comics with optional filters
 */
export function getComics(options: FetchOptions = {}): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>('/comics', options);
}

/**
 * Get a specific comic by ID
 */
export function getComicById(id: number): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>(`/comics/${id}`);
}

/**
 * Get comics by title (starts with)
 */
export function getComicsByTitle(
	title: string,
	options: FetchOptions = {}
): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>('/comics', {
		titleStartsWith: title,
		...options
	});
}

/**
 * Get comics by format (e.g., 'comic', 'magazine', 'trade paperback', 'hardcover', 'digest', 'graphic novel', 'digital comic', 'infinite comic')
 */
export function getComicsByFormat(
	format: string,
	options: FetchOptions = {}
): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>('/comics', {
		format,
		...options
	});
}

/**
 * Get comics by date range
 */
export function getComicsByDateRange(
	dateDescriptor: 'lastWeek' | 'thisWeek' | 'nextWeek' | 'thisMonth',
	options: FetchOptions = {}
): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>('/comics', {
		dateDescriptor,
		...options
	});
}

/**
 * Get comics for a specific character
 */
export function getComicsByCharacter(
	characterId: number,
	options: FetchOptions = {}
): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>(`/characters/${characterId}/comics`, options);
}

/**
 * Get comics for a specific series
 */
export function getComicsBySeries(
	seriesId: number,
	options: FetchOptions = {}
): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>(`/series/${seriesId}/comics`, options);
}

/**
 * Get comics for a specific event
 */
export function getComicsByEvent(
	eventId: number,
	options: FetchOptions = {}
): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>(`/events/${eventId}/comics`, options);
}

/**
 * Get comics for a specific story
 */
export function getComicsByStory(
	storyId: number,
	options: FetchOptions = {}
): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>(`/stories/${storyId}/comics`, options);
}

/**
 * Get comics by creator
 */
export function getComicsByCreator(
	creatorId: number,
	options: FetchOptions = {}
): Promise<ComicDataWrapper> {
	return fetchMarvelData<ComicDataWrapper>(`/creators/${creatorId}/comics`, options);
}

/**
 * Get characters in a specific comic
 */
export function getComicCharacters(comicId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/comics/${comicId}/characters`, options);
}

/**
 * Get creators of a specific comic
 */
export function getComicCreators(comicId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/comics/${comicId}/creators`, options);
}

/**
 * Get events in a specific comic
 */
export function getComicEvents(comicId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/comics/${comicId}/events`, options);
}

/**
 * Get stories in a specific comic
 */
export function getComicStories(comicId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/comics/${comicId}/stories`, options);
}

/**
 * Get Comics From URI List
 * Given a list of Resource Summary, fetch the corresponding comics.
 * Comics that fail to fetch (e.g., 404) are filtered out.
 */
export async function getComicsFromURIs(resources: ComicSummary[]): Promise<Comic[]> {
	return fetchFromURIs(resources, getComicById);
}
