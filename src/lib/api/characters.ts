import type { CharacterDataWrapper } from '$lib/types/marvel';
import { getMarvelData } from './data';

export function getCharacters(
	offset: number = 0,
	limit: number = 20
): Promise<CharacterDataWrapper> {
	return getMarvelData('characters', { offset, limit });
}
