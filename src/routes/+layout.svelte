<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Alan+Sans:wght@300..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<div class="app">
	<main>
		{@render children?.()}
	</main>
	<footer>
		<a href="https://marvel.com" target="_blank" rel="noopener noreferrer">
			Data provided by Marvel. © 2025 MARVEL
		</a>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}

	footer {
		width: 100%;
		padding: 1rem;
		text-align: center;
		margin-top: auto;
	}

	footer a {
		color: var(--text-color);
		text-decoration: none;
		font-size: 0.875rem;
		opacity: 0.8;
		transition: opacity 0.2s ease;
	}

	footer a:hover {
		opacity: 1;
		text-decoration: underline;
	}
</style>
