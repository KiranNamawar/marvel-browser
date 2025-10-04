import {
	getCharacterById,
	getComicsFromURIs,
	getEventsFromURIs,
	getSeriesFromURIs,
	getStoriesFromURIs
} from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const id = Number(params.id);
	if (Number.isNaN(id)) {
		error(404, { message: 'Invalid Id' });
	}

	try {
		const character = (await getCharacterById(id)).data.results[0];
		const comics = await getComicsFromURIs(character.comics.items);
		const series = await getSeriesFromURIs(character.series.items);
		const events = await getEventsFromURIs(character.events.items);
		const stories = await getStoriesFromURIs(character.stories.items);
		return { character, comics, series, events, stories };
	} catch (err) {
		console.error(err);
		error(500);
	}
}
