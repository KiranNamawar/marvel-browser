import type { SeriesDataWrapper } from '$lib/types';
import { fetchMarvelData, type FetchOptions } from './client';

/**
 * Get all series with optional filters
 */
export function getSeries(options: FetchOptions = {}): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>('/series', options);
}

/**
 * Get a specific series by ID
 */
export function getSeriesById(id: number): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>(`/series/${id}`);
}

/**
 * Get series by title (starts with)
 */
export function getSeriesByTitle(
	title: string,
	options: FetchOptions = {}
): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>('/series', {
		titleStartsWith: title,
		...options
	});
}

/**
 * Get series by start year
 */
export function getSeriesByYear(
	year: number,
	options: FetchOptions = {}
): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>('/series', {
		startYear: year,
		...options
	});
}

/**
 * Get series by type (e.g., 'collection', 'one shot', 'limited', 'ongoing')
 */
export function getSeriesByType(
	seriesType: string,
	options: FetchOptions = {}
): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>('/series', {
		seriesType,
		...options
	});
}

/**
 * Get series for a specific character
 */
export function getSeriesByCharacter(
	characterId: number,
	options: FetchOptions = {}
): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>(`/characters/${characterId}/series`, options);
}

/**
 * Get series for a specific event
 */
export function getSeriesByEvent(
	eventId: number,
	options: FetchOptions = {}
): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>(`/events/${eventId}/series`, options);
}

/**
 * Get series for a specific story
 */
export function getSeriesByStory(
	storyId: number,
	options: FetchOptions = {}
): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>(`/stories/${storyId}/series`, options);
}

/**
 * Get series by creator
 */
export function getSeriesByCreator(
	creatorId: number,
	options: FetchOptions = {}
): Promise<SeriesDataWrapper> {
	return fetchMarvelData<SeriesDataWrapper>(`/creators/${creatorId}/series`, options);
}

/**
 * Get characters in a specific series
 */
export function getSeriesCharacters(seriesId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/series/${seriesId}/characters`, options);
}

/**
 * Get comics in a specific series
 */
export function getSeriesComics(seriesId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/series/${seriesId}/comics`, options);
}

/**
 * Get creators of a specific series
 */
export function getSeriesCreators(seriesId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/series/${seriesId}/creators`, options);
}

/**
 * Get events in a specific series
 */
export function getSeriesEvents(seriesId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/series/${seriesId}/events`, options);
}

/**
 * Get stories in a specific series
 */
export function getSeriesStories(seriesId: number, options: FetchOptions = {}): Promise<any> {
	return fetchMarvelData(`/series/${seriesId}/stories`, options);
}
