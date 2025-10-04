<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Event } from '$lib/types';

	const { event }: { event: Event } = $props();
</script>

<img
	src={getImageUrl(event.thumbnail.path, event.thumbnail.extension, 'portrait_medium')}
	alt={event.title}
/>
