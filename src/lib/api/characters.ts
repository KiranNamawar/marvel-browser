import type { Character, CharacterDataWrapper, ResourceSummary } from '$lib/types';
import { fetchMarvelData, type FetchOptions } from './client';
import { fetchFromURIs } from './util';

/**
 * Get all characters with optional filters
 */
export function getCharacters(options: FetchOptions = {}): Promise<CharacterDataWrapper> {
	return fetchMarvelData<CharacterDataWrapper>('/characters', options);
}

/**
 * Get a specific character by ID
 */
export function getCharacterById(id: number): Promise<CharacterDataWrapper> {
	return fetchMarvelData<CharacterDataWrapper>(`/characters/${id}`);
}

/**
 * Get characters by name (starts with)
 */
export function getCharactersByName(
	name: string,
	options: FetchOptions = {}
): Promise<CharacterDataWrapper> {
	return fetchMarvelData<CharacterDataWrapper>('/characters', {
		nameStartsWith: name,
		...options
	});
}

/**
 * Get characters that appear in a specific comic
 */
export function getCharactersByComic(
	comicId: number,
	options: FetchOptions = {}
): Promise<CharacterDataWrapper> {
	return fetchMarvelData<CharacterDataWrapper>(`/comics/${comicId}/characters`, options);
}

/**
 * Get characters that appear in a specific series
 */
export function getCharactersBySeries(
	seriesId: number,
	options: FetchOptions = {}
): Promise<CharacterDataWrapper> {
	return fetchMarvelData<CharacterDataWrapper>(`/series/${seriesId}/characters`, options);
}

/**
 * Get characters that appear in a specific event
 */
export function getCharactersByEvent(
	eventId: number,
	options: FetchOptions = {}
): Promise<CharacterDataWrapper> {
	return fetchMarvelData<CharacterDataWrapper>(`/events/${eventId}/characters`, options);
}

/**
 * Get characters that appear in a specific story
 */
export function getCharactersByStory(
	storyId: number,
	options: FetchOptions = {}
): Promise<CharacterDataWrapper> {
	return fetchMarvelData<CharacterDataWrapper>(`/stories/${storyId}/characters`, options);
}

/**
 * Get comics for a specific character
 */
export function getCharacterComics(characterId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/characters/${characterId}/comics`, options);
}

/**
 * Get events for a specific character
 */
export function getCharacterEvents(characterId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/characters/${characterId}/events`, options);
}

/**
 * Get series for a specific character
 */
export function getCharacterSeries(characterId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/characters/${characterId}/series`, options);
}

/**
 * Get stories for a specific character
 */
export function getCharacterStories(characterId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/characters/${characterId}/stories`, options);
}

/**
 * Get Characters From URI List
 * Given a list of Resource Summary, fetch the corresponding characters.
 * Characters that fail to fetch (e.g., 404) are filtered out.
 */
export async function getCharactersFromURIs(resources: ResourceSummary[]): Promise<Character[]> {
	return fetchFromURIs(resources, getCharacterById);
}
