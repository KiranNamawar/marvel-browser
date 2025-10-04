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
			const character = (await getCharacterById(id)).data.results[0];
			return {
				character,
				comics: await getComicsFromURIs(character.comics.items),
				series: await getSeriesFromURIs(character.series.items),
				events: await getEventsFromURIs(character.events.items),
				stories: await getStoriesFromURIs(character.stories.items)
			};
		} else if (entity === 'comic') {
			const comic = (await getComicById(id)).data.results[0];
			return {
				comic,
				characters: await getCharactersFromURIs(comic.characters.items),
				series: await getSeriesFromURIs([comic.series]),
				events: await getEventsFromURIs(comic.events.items),
				stories: await getStoriesFromURIs(comic.stories.items),
				creators: await getCreatorsFromURIs(comic.creators.items)
			};
		} else if (entity === 'event') {
			const event = (await getEventById(id)).data.results[0];
			return {
				event,
				comics: await getComicsFromURIs(event.comics.items),
				series: await getSeriesFromURIs(event.series.items),
				characters: await getCharactersFromURIs(event.characters.items),
				stories: await getStoriesFromURIs(event.stories.items),
				creators: await getCreatorsFromURIs(event.creators.items)
			};
		} else if (entity === 'series') {
			const series = (await getSeriesById(id)).data.results[0];
			return {
				series,
				comics: await getComicsFromURIs(series.comics.items),
				characters: await getCharactersFromURIs(series.characters.items),
				events: await getEventsFromURIs(series.events.items),
				stories: await getStoriesFromURIs(series.stories.items),
				creators: await getCreatorsFromURIs(series.creators.items)
			};
		} else if (entity === 'story') {
			const story = (await getStoryById(id)).data.results[0];
			return {
				story,
				comics: await getComicsFromURIs(story.comics.items),
				series: await getSeriesFromURIs(story.series.items),
				events: await getEventsFromURIs(story.events.items),
				characters: await getCharactersFromURIs(story.characters.items),
				creators: await getCreatorsFromURIs(story.creators.items)
			};
		} else if (entity === 'creator') {
			const creator = (await getCreatorById(id)).data.results[0];
			return {
				creator,
				comics: await getComicsFromURIs(creator.comics.items),
				series: await getSeriesFromURIs(creator.series.items),
				events: await getEventsFromURIs(creator.events.items),
				stories: await getStoriesFromURIs(creator.stories.items)
			};
		}

		// This should never happen due to TypeScript's type checking
		throw new Error(`Unknown entity type: ${entity}`);
	} catch (err) {
		console.error(err);
		error(500);
	}
}
