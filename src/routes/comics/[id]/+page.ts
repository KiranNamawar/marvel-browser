import { loadDataForEntity } from '$lib/util.js';

export function load({ params }) {
    return loadDataForEntity('comic', Number(params.id));
}
