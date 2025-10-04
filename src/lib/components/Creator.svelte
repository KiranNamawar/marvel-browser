<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Creator } from '$lib/types';

	const { creator }: { creator: Creator } = $props();
</script>

<img src={getImageUrl(creator.thumbnail)} alt={creator.fullName} />
