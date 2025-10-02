import type { CreatorDataWrapper } from '$lib/types';
import { fetchMarvelData, type FetchOptions } from './client';

/**
 * Get all creators with optional filters
 */
export function getCreators(options: FetchOptions = {}): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>('/creators', options);
}

/**
 * Get a specific creator by ID
 */
export function getCreatorById(id: number): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>(`/creators/${id}`);
}

/**
 * Get creators by name (starts with)
 */
export function getCreatorsByName(
	name: string,
	options: FetchOptions = {}
): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>('/creators', {
		nameStartsWith: name,
		...options
	});
}

/**
 * Get creators by first name (starts with)
 */
export function getCreatorsByFirstName(
	firstName: string,
	options: FetchOptions = {}
): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>('/creators', {
		firstNameStartsWith: firstName,
		...options
	});
}

/**
 * Get creators by last name (starts with)
 */
export function getCreatorsByLastName(
	lastName: string,
	options: FetchOptions = {}
): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>('/creators', {
		lastNameStartsWith: lastName,
		...options
	});
}

/**
 * Get creators for a specific comic
 */
export function getCreatorsByComic(
	comicId: number,
	options: FetchOptions = {}
): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>(`/comics/${comicId}/creators`, options);
}

/**
 * Get creators for a specific series
 */
export function getCreatorsBySeries(
	seriesId: number,
	options: FetchOptions = {}
): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>(`/series/${seriesId}/creators`, options);
}

/**
 * Get creators for a specific event
 */
export function getCreatorsByEvent(
	eventId: number,
	options: FetchOptions = {}
): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>(`/events/${eventId}/creators`, options);
}

/**
 * Get creators for a specific story
 */
export function getCreatorsByStory(
	storyId: number,
	options: FetchOptions = {}
): Promise<CreatorDataWrapper> {
	return fetchMarvelData<CreatorDataWrapper>(`/stories/${storyId}/creators`, options);
}

/**
 * Get comics by a specific creator
 */
export function getCreatorComics(creatorId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/creators/${creatorId}/comics`, options);
}

/**
 * Get events by a specific creator
 */
export function getCreatorEvents(creatorId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/creators/${creatorId}/events`, options);
}

/**
 * Get series by a specific creator
 */
export function getCreatorSeries(creatorId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/creators/${creatorId}/series`, options);
}

/**
 * Get stories by a specific creator
 */
export function getCreatorStories(creatorId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/creators/${creatorId}/stories`, options);
}
