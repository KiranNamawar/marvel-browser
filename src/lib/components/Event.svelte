<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Event } from '$lib/types';

	const { event }: { event: Event } = $props();
</script>

<img
	src={getImageUrl(event.thumbnail, 'portrait_medium')}
	alt={event.title}
/>
