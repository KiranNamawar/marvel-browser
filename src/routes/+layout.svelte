<script lang="ts">
	import { dev } from '$app/environment';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	let { children } = $props();

	onMount(() => {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/sw.js', {
					type: dev ? 'module' : 'classic'
				})
				.then(() => console.log('[SW] registered successfully'))
				.catch((err) => console.error('[SW] registration failed:', err));
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
