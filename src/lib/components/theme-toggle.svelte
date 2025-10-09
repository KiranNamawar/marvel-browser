<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { onMount } from 'svelte';

	type Theme = 'dark' | 'light';

	let theme = $state<Theme>('dark');
	let nextTheme = $derived<Theme>(theme === 'dark' ? 'light' : 'dark');

	onMount(() => {
		// Read the theme that was already set in the HTML head script
		const currentTheme = document.documentElement.dataset.theme as Theme;
		if (currentTheme) {
			theme = currentTheme;
		}
	});

	function onclick() {
		theme = nextTheme;
		document.documentElement.dataset.theme = theme;
		localStorage.setItem('theme', theme);
	}
</script>

<button {onclick} title="switch to {nextTheme} mode">
	{#if theme === 'dark'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>
