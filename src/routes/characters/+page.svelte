<script lang="ts">
	import { Loader } from '@lucide/svelte';
	import { getCharacters } from '$lib/api/characters';
	import type { Character } from '$lib/types/marvel';
	import { getImageUrl, isImageAvailable } from '$lib/utils/image';
	import { onMount } from 'svelte';
	import { createObserver } from '$lib/utils/observer';

	let offset = $state(0);
	let characters = $state<null | Character[]>(null);
	let loading = $state(false);
	let hasMore = $state(true);
	let error = $state<string | null>(null);
	let info = $state<string | null>(null);

	async function loadData() {
		if (loading || !hasMore) return;
		loading = true;
		try {
			const res = await getCharacters(offset);
			const filtered = res.data.results.filter((c) => isImageAvailable(c.thumbnail));
			if (res.data.count < 20) hasMore = false; // No more data if less than limit returned

			if (characters) {
				characters.push(...filtered);
			} else {
				characters = filtered;
			}
			info = `Showing ${offset + res.data.count} of ${res.data.total} characters.`;
			offset += 20;
			error = null;
		} catch (err) {
			console.error('Error loading characters:', err);
			error = 'Failed to load characters. Please try again.';
		} finally {
			loading = false;
		}
	}

	onMount(loadData);
</script>

{#if error}
	<p class="error">{error}</p>
{:else if characters}
	<p class="info">{info}</p>
	<section>
		{#each characters as c}
			<img src={getImageUrl(c.thumbnail, 'standard_xlarge')} alt={c.name} />
		{/each}
	</section>
	<div class="observer" {@attach (node) => createObserver(node, loadData)}>
		{#if loading}
			<Loader class="spin" />
		{:else if !hasMore}
			The End
		{/if}
	</div>
{/if}

<style>
	section {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
	}
	.observer {
        margin-top: 1rem;
		display: flex;
		justify-content: center;
		font-size: large;
	}
	.error {
		color: red;
		text-align: center;
		font-size: large;
	}
	.info {
		position: sticky;
		top: 0;
		background-color: var(--background-color);
		text-align: center;
		font-size: medium;
		margin-bottom: var(--padding-md);
		opacity: 0.8;
	}
</style>
