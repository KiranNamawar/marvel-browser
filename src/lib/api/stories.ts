import type { Story, StoryDataWrapper, StorySummary } from '$lib/types';
import { fetchMarvelData, type FetchOptions } from './client';
import { fetchFromURIs } from './util';

/**
 * Get all stories with optional filters
 */
export function getStories(options: FetchOptions = {}): Promise<StoryDataWrapper> {
	return fetchMarvelData<StoryDataWrapper>('/stories', options);
}

/**
 * Get a specific story by ID
 */
export function getStoryById(id: number): Promise<StoryDataWrapper> {
	return fetchMarvelData<StoryDataWrapper>(`/stories/${id}`);
}

/**
 * Get stories for a specific character
 */
export function getStoriesByCharacter(
	characterId: number,
	options: FetchOptions = {}
): Promise<StoryDataWrapper> {
	return fetchMarvelData<StoryDataWrapper>(`/characters/${characterId}/stories`, options);
}

/**
 * Get stories for a specific comic
 */
export function getStoriesByComic(
	comicId: number,
	options: FetchOptions = {}
): Promise<StoryDataWrapper> {
	return fetchMarvelData<StoryDataWrapper>(`/comics/${comicId}/stories`, options);
}

/**
 * Get stories for a specific series
 */
export function getStoriesBySeries(
	seriesId: number,
	options: FetchOptions = {}
): Promise<StoryDataWrapper> {
	return fetchMarvelData<StoryDataWrapper>(`/series/${seriesId}/stories`, options);
}

/**
 * Get stories for a specific event
 */
export function getStoriesByEvent(
	eventId: number,
	options: FetchOptions = {}
): Promise<StoryDataWrapper> {
	return fetchMarvelData<StoryDataWrapper>(`/events/${eventId}/stories`, options);
}

/**
 * Get stories by creator
 */
export function getStoriesByCreator(
	creatorId: number,
	options: FetchOptions = {}
): Promise<StoryDataWrapper> {
	return fetchMarvelData<StoryDataWrapper>(`/creators/${creatorId}/stories`, options);
}

/**
 * Get characters in a specific story
 */
export function getStoryCharacters(storyId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/stories/${storyId}/characters`, options);
}

/**
 * Get comics in a specific story
 */
export function getStoryComics(storyId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/stories/${storyId}/comics`, options);
}

/**
 * Get creators of a specific story
 */
export function getStoryCreators(storyId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/stories/${storyId}/creators`, options);
}

/**
 * Get events in a specific story
 */
export function getStoryEvents(storyId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/stories/${storyId}/events`, options);
}

/**
 * Get series in a specific story
 */
export function getStorySeries(storyId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/stories/${storyId}/series`, options);
}

/**
 * Get stories from URI List
 * Given a list of Story Summary, fetch the corresponding stories.
 * Stories that fail to fetch (e.g., 404) are filtered out.
 */
export async function getStoriesFromURIs(resources: StorySummary[]): Promise<Story[]> {
	return fetchFromURIs(resources, getStoryById);
}
