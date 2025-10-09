<script lang="ts">
	import type { Character, Comic } from '$lib/types/marvel';
	import { getImageUrl } from '$lib/utils/image';

	let { item: comic }: { item: Comic } = $props();
</script>

<img src={getImageUrl(comic.thumbnail, 'portrait_xlarge')} alt={comic.title} />
