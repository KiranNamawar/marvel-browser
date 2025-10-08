<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Pompiere&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="app-container">
	<Header />
	<main>
		{@render children?.()}
	</main>
	<Footer />
</div>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: var(--background-color);
		color: var(--text-color);
	}
	main {
		flex: 1;
		padding: var(--padding-lg);
	}
</style>
