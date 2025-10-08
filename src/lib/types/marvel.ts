// Common types
export interface Image {
	path: string;
	extension: string;
}

export type ImageVariant = 
	| 'detail'					// 500px wide
	| 'standard_small'			// 65 x 45px
	| 'standard_medium'			// 100 x 100px
	| 'standard_large'			// 140 x 140px
	| 'standard_xlarge'			// 200 x 200px
	| 'standard_fantastic'		// 250 x 250px
	| 'standard_amazing'		// 180 x 180px
	| 'portrait_small'			// 50 x 75px
	| 'portrait_medium'			// 100 x 150px
	| 'portrait_xlarge'			// 150 x 225px
	| 'portrait_fantastic'		// 168 x 252px
	| 'portrait_uncanny'		// 300 x 450px
	| 'portrait_incredible'		// 216 x 324px
	| 'landscape_small'			// 120 x 90px
	| 'landscape_medium'		// 175 x 130px
	| 'landscape_large'			// 190 x 140px
	| 'landscape_xlarge'		// 270 x 200px
	| 'landscape_amazing'		// 250 x 156px
	| 'landscape_incredible';	// 464 x 261px

export interface Url {
	type: 'detail' | 'wiki' | 'comiclink' | string;
	url: string;
}

export interface ResourceList<T> {
	available: number;
	returned: number;
	collectionURI: string;
	items: T[];
}

export interface CharacterSummary {
	resourceURI: string;
	name: string;
}

export interface CreatorSummary {
	resourceURI: string;
	name: string;
	role: string;
}

export interface ComicSummary {
	resourceURI: string;
	name: string;
}

export interface StorySummary {
	resourceURI: string;
	name: string;
	type: string;
}

export interface EventSummary {
	resourceURI: string;
	name: string;
}

export interface SeriesSummary {
	resourceURI: string;
	name: string;
}

// Character types
export interface Character {
	id: number;
	name: string;
	description?: string | null;
	modified?: string | null;
	resourceURI: string;
	urls: Url[];
	thumbnail: Image;
	comics: ResourceList<ComicSummary>;
	stories: ResourceList<StorySummary>;
	events: ResourceList<EventSummary>;
	series: ResourceList<SeriesSummary>;
}

// Comic types
export interface ComicDate {
	type: string;
	date: string;
}

export interface ComicPrice {
	type: string;
	price: number;
}

export interface TextObject {
	type: string;
	language: string;
	text: string;
}

export interface Comic {
	id: number;
	digitalId: number;
	title: string;
	issueNumber: number;
	variantDescription: string;
	description?: string | null;
	modified?: string | null;
	isbn: string;
	upc: string;
	diamondCode: string;
	ean: string;
	issn: string;
	format: string;
	pageCount: number;
	textObjects: TextObject[];
	resourceURI: string;
	urls: Url[];
	series: SeriesSummary;
	variants: ComicSummary[];
	collections: ComicSummary[];
	collectedIssues: ComicSummary[];
	dates: ComicDate[];
	prices: ComicPrice[];
	thumbnail: Image;
	images: Image[];
	creators: ResourceList<CreatorSummary>;
	characters: ResourceList<CharacterSummary>;
	stories: ResourceList<StorySummary>;
	events: ResourceList<EventSummary>;
}

// Series types
export interface Series {
	id: number;
	title: string;
	description?: string | null;
	resourceURI: string;
	urls: Url[];
	startYear: number;
	endYear: number;
	rating: string;
	modified?: string | null;
	thumbnail: Image;
	comics: ResourceList<ComicSummary>;
	stories: ResourceList<StorySummary>;
	events: ResourceList<EventSummary>;
	characters: ResourceList<CharacterSummary>;
	creators: ResourceList<CreatorSummary>;
	next: SeriesSummary | null;
	previous: SeriesSummary | null;
}

// Event types
export interface Event {
	id: number;
	title: string;
	description?: string | null;
	resourceURI: string;
	urls: Url[];
	modified?: string | null;
	start: string | null;
	end: string | null;
	thumbnail: Image;
	comics: ResourceList<ComicSummary>;
	stories: ResourceList<StorySummary>;
	series: ResourceList<SeriesSummary>;
	characters: ResourceList<CharacterSummary>;
	creators: ResourceList<CreatorSummary>;
	next: EventSummary | null;
	previous: EventSummary | null;
}

// Story types
export interface Story {
	id: number;
	title: string;
	description?: string | null;
	resourceURI: string;
	type: string;
	modified?: string | null;
	thumbnail: Image | null;
	comics: ResourceList<ComicSummary>;
	series: ResourceList<SeriesSummary>;
	events: ResourceList<EventSummary>;
	characters: ResourceList<CharacterSummary>;
	creators: ResourceList<CreatorSummary>;
	originalIssue: ComicSummary | null;
}

// Creator types
export interface Creator {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	suffix: string;
	fullName: string;
	modified?: string | null;
	resourceURI: string;
	urls: Url[];
	thumbnail: Image;
	series: ResourceList<SeriesSummary>;
	stories: ResourceList<StorySummary>;
	comics: ResourceList<ComicSummary>;
	events: ResourceList<EventSummary>;
}

// API Response wrapper types
export interface MarvelDataContainer<T> {
	offset: number;
	limit: number;
	total: number;
	count: number;
	results: T[];
}

export interface MarvelDataWrapper<T> {
	code: number;
	status: string;
	copyright: string;
	attributionText: string;
	attributionHTML: string;
	data: MarvelDataContainer<T>;
	etag: string;
}

// Specific response types
export type CharacterDataWrapper = MarvelDataWrapper<Character>;
export type ComicDataWrapper = MarvelDataWrapper<Comic>;
export type SeriesDataWrapper = MarvelDataWrapper<Series>;
export type EventDataWrapper = MarvelDataWrapper<Event>;
export type StoryDataWrapper = MarvelDataWrapper<Story>;
export type CreatorDataWrapper = MarvelDataWrapper<Creator>;
