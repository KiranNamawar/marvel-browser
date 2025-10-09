<script lang="ts">
	import ThemeToggle from './theme-toggle.svelte';
</script>

<header>
	<a href="/">
		<h1>Marvel Browser</h1>
	</a>
	<nav>
		<a href="/characters">Characters</a>
		<a href="/comics">Comics</a>
	</nav>
	<ThemeToggle />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--padding-lg);
		nav {
			display: flex;
			justify-content: center;
			gap: 1rem;
			font-size: larger;
			& a:hover {
				text-decoration: underline;
			}
		}
	}
</style>
