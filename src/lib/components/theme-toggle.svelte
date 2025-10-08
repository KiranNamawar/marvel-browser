<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import type { Theme } from '$lib/types/store';
	import { store } from '$lib/store.svelte';

	let nextTheme = $derived<Theme>(store.theme === 'dark' ? 'light' : 'dark');

	onMount(() => {
		const stored = localStorage.getItem('theme');
		if (stored && (stored === 'dark' || stored === 'light')) {
			store.theme = stored;
		} else {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			store.theme = mediaQuery.matches ? 'dark' : 'light';
		}
		document.documentElement.dataset.theme = store.theme;
	});

	function onclick() {
		store.theme = nextTheme;
		document.documentElement.dataset.theme = store.theme;
	}
</script>

<button {onclick} title="switch to {nextTheme} mode">
	{#if store.theme === 'dark'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>
