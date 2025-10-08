import type { CharacterDataWrapper } from '$lib/types/marvel';
import { getMarvelData } from './data';

export async function getCharacters(
	offset: number,
	limit: number = 20
): Promise<CharacterDataWrapper> {
	return await getMarvelData('characters', { offset, limit });
}
