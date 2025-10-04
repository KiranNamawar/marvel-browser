<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import type { Series } from '$lib/types';

	const { series }: { series: Series } = $props();
</script>

<img
	src={getImageUrl(series.thumbnail, 'portrait_medium')}
	alt={series.title}
/>
