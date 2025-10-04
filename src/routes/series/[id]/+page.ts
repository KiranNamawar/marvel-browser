import { loadDataForEntity } from '$lib/util.js';

export function load({ params }) {
    return loadDataForEntity('series', Number(params.id));
}
