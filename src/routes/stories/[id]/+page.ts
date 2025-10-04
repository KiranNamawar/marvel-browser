import { loadDataForEntity } from '$lib/util.js';

export function load({ params }) {
    return loadDataForEntity('story', Number(params.id));
}
