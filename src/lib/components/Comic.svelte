<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Comic } from '$lib/types';

	const { comic }: { comic: Comic } = $props();
</script>

<img src={getImageUrl(comic.thumbnail, 'portrait_fantastic')} alt={comic.title} />