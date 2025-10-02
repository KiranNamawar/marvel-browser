import type { EventDataWrapper } from '$lib/types';
import { fetchMarvelData, type FetchOptions } from './client';

/**
 * Get all events with optional filters
 */
export function getEvents(options: FetchOptions = {}): Promise<EventDataWrapper> {
	return fetchMarvelData<EventDataWrapper>('/events', options);
}

/**
 * Get a specific event by ID
 */
export function getEventById(id: number): Promise<EventDataWrapper> {
	return fetchMarvelData<EventDataWrapper>(`/events/${id}`);
}

/**
 * Get events by name (starts with)
 */
export function getEventsByName(
	name: string,
	options: FetchOptions = {}
): Promise<EventDataWrapper> {
	return fetchMarvelData<EventDataWrapper>('/events', {
		nameStartsWith: name,
		...options
	});
}

/**
 * Get events for a specific character
 */
export function getEventsByCharacter(
	characterId: number,
	options: FetchOptions = {}
): Promise<EventDataWrapper> {
	return fetchMarvelData<EventDataWrapper>(`/characters/${characterId}/events`, options);
}

/**
 * Get events for a specific comic
 */
export function getEventsByComic(
	comicId: number,
	options: FetchOptions = {}
): Promise<EventDataWrapper> {
	return fetchMarvelData<EventDataWrapper>(`/comics/${comicId}/events`, options);
}

/**
 * Get events for a specific series
 */
export function getEventsBySeries(
	seriesId: number,
	options: FetchOptions = {}
): Promise<EventDataWrapper> {
	return fetchMarvelData<EventDataWrapper>(`/series/${seriesId}/events`, options);
}

/**
 * Get events for a specific story
 */
export function getEventsByStory(
	storyId: number,
	options: FetchOptions = {}
): Promise<EventDataWrapper> {
	return fetchMarvelData<EventDataWrapper>(`/stories/${storyId}/events`, options);
}

/**
 * Get events by creator
 */
export function getEventsByCreator(
	creatorId: number,
	options: FetchOptions = {}
): Promise<EventDataWrapper> {
	return fetchMarvelData<EventDataWrapper>(`/creators/${creatorId}/events`, options);
}

/**
 * Get characters in a specific event
 */
export function getEventCharacters(eventId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/events/${eventId}/characters`, options);
}

/**
 * Get comics in a specific event
 */
export function getEventComics(eventId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/events/${eventId}/comics`, options);
}

/**
 * Get creators of a specific event
 */
export function getEventCreators(eventId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/events/${eventId}/creators`, options);
}

/**
 * Get series in a specific event
 */
export function getEventSeries(eventId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/events/${eventId}/series`, options);
}

/**
 * Get stories in a specific event
 */
export function getEventStories(eventId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/events/${eventId}/stories`, options);
}
