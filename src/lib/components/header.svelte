<script lang="ts">
	import ThemeToggle from './theme-toggle.svelte';
</script>

<header>
	<h1>Marvel Browser</h1>
	<ThemeToggle />
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        padding: var(--padding-lg);
    }
</style>