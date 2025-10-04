<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Character } from '$lib/types';

	const { character }: { character: Character } = $props();
</script>

<img
	src={getImageUrl(character.thumbnail, 'portrait_fantastic')}
	alt={character.name}
/>
