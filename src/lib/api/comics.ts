import type { ComicDataWrapper } from '$lib/types/marvel';
import { getMarvelData } from './data';

export function getComics(
	offset: number = 0,
	limit: number = 20
): Promise<ComicDataWrapper> {
	return getMarvelData('comics', { offset, limit });
}
