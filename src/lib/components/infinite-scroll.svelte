<script lang="ts" generics="Entity">
	import type { MarvelDataWrapper } from '$lib/types/marvel';
	import { Loader } from '@lucide/svelte';
	import { onMount, type Component } from 'svelte';

	interface Props {
		getData: (
			offset?: number,
			limit?: number
		) => Promise<MarvelDataWrapper<Entity>>;
		Item: Component<{ item: Entity }>;
		filterFn?: (e: Entity) => boolean;
	}

	let { getData, Item, filterFn }: Props = $props();

	let offset = $state(0);
	let list = $state<Entity[] | null>(null);
	let loading = $state(false);
	let hasMore = $state(true);

	async function loadData() {
		if (loading || !hasMore) return;
		loading = true;
		try {
			const res = await getData(offset);
			let items = res.data.results;
			if (filterFn) {
				items = items.filter(filterFn);
			}

			if (list) {
				list.push(...items);
			} else {
				list = items;
			}
			hasMore = offset + res.data.count < res.data.total;
			offset += 20;
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}

	function createObserver(node: HTMLElement) {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) loadData();
			},
			{
				threshold: 0.1,
				rootMargin: '200px'
			}
		);

		observer.observe(node);

		return () => {
			observer.disconnect;
		};
	}

	onMount(loadData);
</script>

{#if list}
	<p class="info">{list.length}</p>
	<section>
		{#each list as item (item)}
			<Item {item} />
		{/each}
	</section>
	<div class="observer" {@attach createObserver}>
		{#if loading}
			<Loader class="spin" />
		{:else if !hasMore}
			The End
		{:else if !loading && hasMore}
			<button onclick={loadData}>Load More</button>
		{/if}
	</div>
{/if}

<style>
	.info {
		position: sticky;
		top: 0;
		background-color: hsl(from var(--background-color) h s l / 0.7);
		text-align: center;
	}
	section {
		display: flex;
		justify-content: center;
		flex-flow: row wrap;
	}
	.observer {
		display: flex;
		justify-content: center;
		font-size: larger;
	}
</style>
