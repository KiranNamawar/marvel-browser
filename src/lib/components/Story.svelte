<script lang="ts">
	import type { Story } from '$lib/types';

	const { story }: { story: Story } = $props();
</script>

<p>{story.title}</p>