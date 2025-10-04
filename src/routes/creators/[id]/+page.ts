import { loadDataForEntity } from '$lib/util.js';

export function load({ params }) {
    return loadDataForEntity('creator', Number(params.id));
}
