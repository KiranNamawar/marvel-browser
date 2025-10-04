import { loadDataForEntity } from '$lib/util.js';

export function load({ params }) {
	return loadDataForEntity('event', Number(params.id));
}
