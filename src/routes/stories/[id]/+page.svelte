<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import Character from '$lib/components/Character.svelte';
	import Comic from '$lib/components/Comic.svelte';
	import Creator from '$lib/components/Creator.svelte';
	import Event from '$lib/components/Event.svelte';
	import Series from '$lib/components/Series.svelte';

	const { data } = $props();
	const { story, comics, characters, events, series, creators } = data;
</script>


<h1>{story.title}</h1>

{#if characters.length !== 0}
	<div>
		<h2>Characters</h2>
		{#each characters as character (character.id)}
			<Character {character} />
		{/each}
	</div>
{/if}

{#if series.length !== 0}
	<div>
		<h2>Series</h2>
		{#each series as s (s.id)}
			<Series series={s} />
		{/each}
	</div>
{/if}

{#if events.length !== 0}
	<div>
		<h2>Events</h2>
		{#each events as event (event.id)}
			<Event {event} />
		{/each}
	</div>
{/if}

{#if comics.length !== 0}
	<div>
		<h2>Comics</h2>
		{#each comics as comic (comic.id)}
			<Comic {comic} />
		{/each}
	</div>
{/if}

{#if creators.length !== 0}
	<div>
		<h2>Creators</h2>
		{#each creators as creator (creator.id)}
			<Creator {creator} />
		{/each}
	</div>
{/if}