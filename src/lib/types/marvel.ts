// Common types
export interface Image {
	path: string;
	extension: string;
}

export interface Url {
	type: string;
	url: string;
}

export interface CharacterList {
	available: number;
	returned: number;
	collectionURI: string;
	items: CharacterSummary[];
}

export interface CharacterSummary {
	resourceURI: string;
	name: string;
}

export interface CreatorList {
	available: number;
	returned: number;
	collectionURI: string;
	items: CreatorSummary[];
}

export interface CreatorSummary {
	resourceURI: string;
	name: string;
	role: string;
}

export interface ComicList {
	available: number;
	returned: number;
	collectionURI: string;
	items: ComicSummary[];
}

export interface ComicSummary {
	resourceURI: string;
	name: string;
}

export interface StoryList {
	available: number;
	returned: number;
	collectionURI: string;
	items: StorySummary[];
}

export interface StorySummary {
	resourceURI: string;
	name: string;
	type: string;
}

export interface EventList {
	available: number;
	returned: number;
	collectionURI: string;
	items: EventSummary[];
}

export interface EventSummary {
	resourceURI: string;
	name: string;
}

export interface SeriesList {
	available: number;
	returned: number;
	collectionURI: string;
	items: SeriesSummary[];
}

export interface SeriesSummary {
	resourceURI: string;
	name: string;
}

// Character types
export interface Character {
	id: number;
	name: string;
	description: string;
	modified: string;
	resourceURI: string;
	urls: Url[];
	thumbnail: Image;
	comics: ComicList;
	stories: StoryList;
	events: EventList;
	series: SeriesList;
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
	description: string | null;
	modified: string;
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
	creators: CreatorList;
	characters: CharacterList;
	stories: StoryList;
	events: EventList;
}

// Series types
export interface Series {
	id: number;
	title: string;
	description: string | null;
	resourceURI: string;
	urls: Url[];
	startYear: number;
	endYear: number;
	rating: string;
	modified: string;
	thumbnail: Image;
	comics: ComicList;
	stories: StoryList;
	events: EventList;
	characters: CharacterList;
	creators: CreatorList;
	next: SeriesSummary | null;
	previous: SeriesSummary | null;
}

// Event types
export interface Event {
	id: number;
	title: string;
	description: string | null;
	resourceURI: string;
	urls: Url[];
	modified: string;
	start: string | null;
	end: string | null;
	thumbnail: Image;
	comics: ComicList;
	stories: StoryList;
	series: SeriesList;
	characters: CharacterList;
	creators: CreatorList;
	next: EventSummary | null;
	previous: EventSummary | null;
}

// Story types
export interface Story {
	id: number;
	title: string;
	description: string;
	resourceURI: string;
	type: string;
	modified: string;
	thumbnail: Image | null;
	comics: ComicList;
	series: SeriesList;
	events: EventList;
	characters: CharacterList;
	creators: CreatorList;
	originalIssue: ComicSummary;
}

// Creator types
export interface Creator {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	suffix: string;
	fullName: string;
	modified: string;
	resourceURI: string;
	urls: Url[];
	thumbnail: Image;
	series: SeriesList;
	stories: StoryList;
	comics: ComicList;
	events: EventList;
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
