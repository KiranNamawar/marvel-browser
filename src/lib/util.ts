import { error } from '@sveltejs/kit';
import {
	getCharacterById,
	getComicsFromURIs,
	getSeriesFromURIs,
	getEventsFromURIs,
	getStoriesFromURIs,
	getComicById,
	getCharactersFromURIs,
	getSeriesById,
	getEventById,
	getStoryById,
	getCreatorById,
	getCreatorsFromURIs
} from './api';
import type { Character, Comic, Series, Event, Story, Creator } from './types/marvel';

type Entity = 'character' | 'comic' | 'series' | 'event' | 'story' | 'creator';

// Return types for each entity
interface CharacterData {
	character: Character;
	comics: Comic[];
	series: Series[];
	events: Event[];
	stories: Story[];
}

interface ComicData {
	comic: Comic;
	characters: Character[];
	series: Series[];
	events: Event[];
	stories: Story[];
	creators: Creator[];
}

interface EventData {
	event: Event;
	comics: Comic[];
	series: Series[];
	characters: Character[];
	stories: Story[];
	creators: Creator[];
}

interface SeriesData {
	series: Series;
	comics: Comic[];
	characters: Character[];
	events: Event[];
	stories: Story[];
	creators: Creator[];
}

interface StoryData {
	story: Story;
	comics: Comic[];
	series: Series[];
	events: Event[];
	characters: Character[];
	creators: Creator[];
}

interface CreatorData {
	creator: Creator;
	comics: Comic[];
	series: Series[];
	events: Event[];
	stories: Story[];
}

// Function overloads for type safety
export async function loadDataForEntity(entity: 'character', id: number): Promise<CharacterData>;
export async function loadDataForEntity(entity: 'comic', id: number): Promise<ComicData>;
export async function loadDataForEntity(entity: 'event', id: number): Promise<EventData>;
export async function loadDataForEntity(entity: 'series', id: number): Promise<SeriesData>;
export async function loadDataForEntity(entity: 'story', id: number): Promise<StoryData>;
export async function loadDataForEntity(entity: 'creator', id: number): Promise<CreatorData>;
export async function loadDataForEntity(
	entity: Entity,
	id: number
): Promise<CharacterData | ComicData | EventData | SeriesData | StoryData | CreatorData> {
	if (Number.isNaN(id)) {
		error(404, { message: 'Invalid Id' });
	}

	try {
		if (entity === 'character') {
			const response = await getCharacterById(id);
			if (!response?.data?.results?.[0]) {
				error(404, { message: 'Character not found' });
			}
			const character = response.data.results[0];

			const [comics, series, events, stories] = await Promise.allSettled([
				getComicsFromURIs(character.comics.items),
				getSeriesFromURIs(character.series.items),
				getEventsFromURIs(character.events.items),
				getStoriesFromURIs(character.stories.items)
			]);

			return {
				character,
				comics: comics.status === 'fulfilled' ? comics.value : [],
				series: series.status === 'fulfilled' ? series.value : [],
				events: events.status === 'fulfilled' ? events.value : [],
				stories: stories.status === 'fulfilled' ? stories.value : []
			};
		} else if (entity === 'comic') {
			const response = await getComicById(id);
			if (!response?.data?.results?.[0]) {
				error(404, { message: 'Comic not found' });
			}
			const comic = response.data.results[0];

			const [characters, series, events, stories, creators] = await Promise.allSettled([
				getCharactersFromURIs(comic.characters.items),
				getSeriesFromURIs([comic.series]),
				getEventsFromURIs(comic.events.items),
				getStoriesFromURIs(comic.stories.items),
				getCreatorsFromURIs(comic.creators.items)
			]);

			return {
				comic,
				characters: characters.status === 'fulfilled' ? characters.value : [],
				series: series.status === 'fulfilled' ? series.value : [],
				events: events.status === 'fulfilled' ? events.value : [],
				stories: stories.status === 'fulfilled' ? stories.value : [],
				creators: creators.status === 'fulfilled' ? creators.value : []
			};
		} else if (entity === 'event') {
			const response = await getEventById(id);
			if (!response?.data?.results?.[0]) {
				error(404, { message: 'Event not found' });
			}
			const event = response.data.results[0];

			const [comics, series, characters, stories, creators] = await Promise.allSettled([
				getComicsFromURIs(event.comics.items),
				getSeriesFromURIs(event.series.items),
				getCharactersFromURIs(event.characters.items),
				getStoriesFromURIs(event.stories.items),
				getCreatorsFromURIs(event.creators.items)
			]);

			return {
				event,
				comics: comics.status === 'fulfilled' ? comics.value : [],
				series: series.status === 'fulfilled' ? series.value : [],
				characters: characters.status === 'fulfilled' ? characters.value : [],
				stories: stories.status === 'fulfilled' ? stories.value : [],
				creators: creators.status === 'fulfilled' ? creators.value : []
			};
		} else if (entity === 'series') {
			const response = await getSeriesById(id);
			if (!response?.data?.results?.[0]) {
				error(404, { message: 'Series not found' });
			}
			const series = response.data.results[0];

			const [comics, characters, events, stories, creators] = await Promise.allSettled([
				getComicsFromURIs(series.comics.items),
				getCharactersFromURIs(series.characters.items),
				getEventsFromURIs(series.events.items),
				getStoriesFromURIs(series.stories.items),
				getCreatorsFromURIs(series.creators.items)
			]);

			return {
				series,
				comics: comics.status === 'fulfilled' ? comics.value : [],
				characters: characters.status === 'fulfilled' ? characters.value : [],
				events: events.status === 'fulfilled' ? events.value : [],
				stories: stories.status === 'fulfilled' ? stories.value : [],
				creators: creators.status === 'fulfilled' ? creators.value : []
			};
		} else if (entity === 'story') {
			const response = await getStoryById(id);
			if (!response?.data?.results?.[0]) {
				error(404, { message: 'Story not found' });
			}
			const story = response.data.results[0];

			const [comics, series, events, characters, creators] = await Promise.allSettled([
				getComicsFromURIs(story.comics.items),
				getSeriesFromURIs(story.series.items),
				getEventsFromURIs(story.events.items),
				getCharactersFromURIs(story.characters.items),
				getCreatorsFromURIs(story.creators.items)
			]);

			return {
				story,
				comics: comics.status === 'fulfilled' ? comics.value : [],
				series: series.status === 'fulfilled' ? series.value : [],
				events: events.status === 'fulfilled' ? events.value : [],
				characters: characters.status === 'fulfilled' ? characters.value : [],
				creators: creators.status === 'fulfilled' ? creators.value : []
			};
		} else if (entity === 'creator') {
			const response = await getCreatorById(id);
			if (!response?.data?.results?.[0]) {
				error(404, { message: 'Creator not found' });
			}
			const creator = response.data.results[0];

			const [comics, series, events, stories] = await Promise.allSettled([
				getComicsFromURIs(creator.comics.items),
				getSeriesFromURIs(creator.series.items),
				getEventsFromURIs(creator.events.items),
				getStoriesFromURIs(creator.stories.items)
			]);

			return {
				creator,
				comics: comics.status === 'fulfilled' ? comics.value : [],
				series: series.status === 'fulfilled' ? series.value : [],
				events: events.status === 'fulfilled' ? events.value : [],
				stories: stories.status === 'fulfilled' ? stories.value : []
			};
		}

		// This should never happen due to TypeScript's type checking
		throw new Error(`Unknown entity type: ${entity}`);
	} catch (err) {
		console.error(err);
		error(500);
	}
}
