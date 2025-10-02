# Marvel API Client

A comprehensive TypeScript client for the Marvel Comics API with automatic 24-hour caching.

## Features

- ✅ **Full TypeScript support** - Complete type definitions for all Marvel API endpoints
- ⚡ **24-hour caching** - Automatic localStorage caching with expiration
- 🎯 **All endpoints covered** - Characters, Comics, Series, Events, Stories, and Creators
- 🔍 **Advanced filtering** - Support for all Marvel API query parameters
- 🛡️ **Error handling** - Proper error handling and validation
- 📦 **Tree-shakeable** - Import only what you need

## Usage

### Basic Examples

```typescript
import { getCharacters, getComics, getSeries, getEvents } from '$lib/api';

// Get all characters (cached for 24 hours)
const characters = await getCharacters();

// Get character by ID
const spiderman = await getCharacterById(1009610);

// Get characters with filters
const avengers = await getCharacters({
	limit: 20,
	offset: 0,
	orderBy: 'name'
});

// Search characters by name
const ironMan = await getCharactersByName('Iron Man');

// Get comics from this week
const thisWeekComics = await getComicsByDateRange('thisWeek');

// Get all events
const events = await getEvents();
```

### Advanced Usage

#### Filtering and Pagination

```typescript
// Get comics with pagination
const comics = await getComics({
	limit: 50, // Results per page
	offset: 100, // Skip first 100 results
	orderBy: '-onsaleDate' // Order by on-sale date (descending)
});

// Search series by title
const xmenSeries = await getSeriesByTitle('X-Men', {
	limit: 10
});

// Get comics by format
const graphicNovels = await getComicsByFormat('graphic novel');
```

#### Relational Queries

```typescript
// Get all comics featuring Spider-Man
const spidermanComics = await getComicsByCharacter(1009610);

// Get all characters in a specific event
const civilWarCharacters = await getCharactersByEvent(238);

// Get all series by a specific creator
const stanLeeSeries = await getSeriesByCreator(30);

// Get characters in a specific comic
const comic1Characters = await getComicCharacters(1);
```

### Available Functions

#### Characters

- `getCharacters(options?)` - Get all characters
- `getCharacterById(id)` - Get character by ID
- `getCharactersByName(name, options?)` - Search by name
- `getCharactersByComic(comicId, options?)` - Characters in comic
- `getCharactersBySeries(seriesId, options?)` - Characters in series
- `getCharactersByEvent(eventId, options?)` - Characters in event
- `getCharactersByStory(storyId, options?)` - Characters in story
- `getCharacterComics(characterId, options?)` - Get character's comics
- `getCharacterEvents(characterId, options?)` - Get character's events
- `getCharacterSeries(characterId, options?)` - Get character's series
- `getCharacterStories(characterId, options?)` - Get character's stories

#### Comics

- `getComics(options?)` - Get all comics
- `getComicById(id)` - Get comic by ID
- `getComicsByTitle(title, options?)` - Search by title
- `getComicsByFormat(format, options?)` - Filter by format
- `getComicsByDateRange(descriptor, options?)` - Filter by date ('lastWeek', 'thisWeek', 'nextWeek', 'thisMonth')
- `getComicsByCharacter(characterId, options?)` - Comics by character
- `getComicsBySeries(seriesId, options?)` - Comics in series
- `getComicsByEvent(eventId, options?)` - Comics in event
- `getComicsByStory(storyId, options?)` - Comics in story
- `getComicsByCreator(creatorId, options?)` - Comics by creator
- `getComicCharacters(comicId, options?)` - Get comic's characters
- `getComicCreators(comicId, options?)` - Get comic's creators
- `getComicEvents(comicId, options?)` - Get comic's events
- `getComicStories(comicId, options?)` - Get comic's stories

#### Series

- `getSeries(options?)` - Get all series
- `getSeriesById(id)` - Get series by ID
- `getSeriesByTitle(title, options?)` - Search by title
- `getSeriesByYear(year, options?)` - Filter by start year
- `getSeriesByType(type, options?)` - Filter by type
- `getSeriesByCharacter(characterId, options?)` - Series by character
- `getSeriesByEvent(eventId, options?)` - Series in event
- `getSeriesByStory(storyId, options?)` - Series in story
- `getSeriesByCreator(creatorId, options?)` - Series by creator
- `getSeriesCharacters(seriesId, options?)` - Get series' characters
- `getSeriesComics(seriesId, options?)` - Get series' comics
- `getSeriesCreators(seriesId, options?)` - Get series' creators
- `getSeriesEvents(seriesId, options?)` - Get series' events
- `getSeriesStories(seriesId, options?)` - Get series' stories

#### Events

- `getEvents(options?)` - Get all events
- `getEventById(id)` - Get event by ID
- `getEventsByName(name, options?)` - Search by name
- `getEventsByCharacter(characterId, options?)` - Events by character
- `getEventsByComic(comicId, options?)` - Events in comic
- `getEventsBySeries(seriesId, options?)` - Events in series
- `getEventsByStory(storyId, options?)` - Events in story
- `getEventsByCreator(creatorId, options?)` - Events by creator
- `getEventCharacters(eventId, options?)` - Get event's characters
- `getEventComics(eventId, options?)` - Get event's comics
- `getEventCreators(eventId, options?)` - Get event's creators
- `getEventSeries(eventId, options?)` - Get event's series
- `getEventStories(eventId, options?)` - Get event's stories

#### Stories

- `getStories(options?)` - Get all stories
- `getStoryById(id)` - Get story by ID
- `getStoriesByCharacter(characterId, options?)` - Stories by character
- `getStoriesByComic(comicId, options?)` - Stories in comic
- `getStoriesBySeries(seriesId, options?)` - Stories in series
- `getStoriesByEvent(eventId, options?)` - Stories in event
- `getStoriesByCreator(creatorId, options?)` - Stories by creator
- `getStoryCharacters(storyId, options?)` - Get story's characters
- `getStoryComics(storyId, options?)` - Get story's comics
- `getStoryCreators(storyId, options?)` - Get story's creators
- `getStoryEvents(storyId, options?)` - Get story's events
- `getStorySeries(storyId, options?)` - Get story's series

#### Creators

- `getCreators(options?)` - Get all creators
- `getCreatorById(id)` - Get creator by ID
- `getCreatorsByName(name, options?)` - Search by full name
- `getCreatorsByFirstName(firstName, options?)` - Search by first name
- `getCreatorsByLastName(lastName, options?)` - Search by last name
- `getCreatorsByComic(comicId, options?)` - Creators of comic
- `getCreatorsBySeries(seriesId, options?)` - Creators of series
- `getCreatorsByEvent(eventId, options?)` - Creators of event
- `getCreatorsByStory(storyId, options?)` - Creators of story
- `getCreatorComics(creatorId, options?)` - Get creator's comics
- `getCreatorEvents(creatorId, options?)` - Get creator's events
- `getCreatorSeries(creatorId, options?)` - Get creator's series
- `getCreatorStories(creatorId, options?)` - Get creator's stories

### Cache Management

```typescript
import { clearCache, clearExpiredCache } from '$lib/api';

// Clear specific cache entry
clearCache('marvel_/characters');

// Clear all Marvel API cache
clearCache();

// Clear only expired cache entries
clearExpiredCache();
```

### Options Interface

```typescript
interface FetchOptions {
	limit?: number; // Number of results (max 100)
	offset?: number; // Skip first N results
	orderBy?: string; // Sort field (prefix with - for descending)
	[key: string]: string | number | undefined; // Additional params
}
```

### Response Structure

All API responses follow the Marvel API wrapper format:

```typescript
interface MarvelDataWrapper<T> {
	code: number;
	status: string;
	copyright: string;
	attributionText: string;
	attributionHTML: string;
	data: {
		offset: number;
		limit: number;
		total: number;
		count: number;
		results: T[];
	};
	etag: string;
}
```

## Caching

- **Duration**: 24 hours
- **Storage**: localStorage
- **Key Format**: `marvel_{endpoint}_{params}`
- **Auto-expiration**: Expired cache is automatically removed on access
- **Manual cleanup**: Use `clearCache()` or `clearExpiredCache()`

## Error Handling

```typescript
try {
	const characters = await getCharacters();
} catch (error) {
	console.error('Failed to fetch characters:', error);
}
```

## TypeScript Support

Full type definitions are provided for all Marvel API entities:

- `Character`
- `Comic`
- `Series`
- `Event`
- `Story`
- `Creator`
- And all related types (Image, Url, ResourceList, etc.)

## Notes

- Requires `PUBLIC_MARVEL_API_KEY` environment variable
- All functions return Promises
- Cache is stored in localStorage (browser only)
- Respects Marvel API rate limits through caching
