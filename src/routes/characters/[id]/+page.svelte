<script lang="ts">
	import { getImageUrl } from '$lib/api';
	import Comic from '$lib/components/Comic.svelte';
	import Event from '$lib/components/Event.svelte';
	import Series from '$lib/components/Series.svelte';
	import Story from '$lib/components/Story.svelte';

	const { data } = $props();
	const { character, comics, series, events, stories } = data;

	$inspect(character);
</script>

<h1>{character.name}</h1>
<img
	src={getImageUrl(character.thumbnail.path, character.thumbnail.extension)}
	alt={character.name}
/>
{#if comics.length !== 0}
	<div>
		<h2>Comics</h2>
		{#each comics as comic (comic.id)}
			<Comic {comic} />
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

{#if stories.length !== 0}
	<div>
		<h2>Stories</h2>
		{#each stories as story (story.id)}
			<Story {story} />
		{/each}
	</div>
{/if}
