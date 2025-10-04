<script lang="ts">
	import Character from '$lib/components/Character.svelte';
	import Series from '$lib/components/Series.svelte';
	import Event from '$lib/components/Event.svelte';
	import Story from '$lib/components/Story.svelte';
	import { getImageUrl } from '$lib/api/util.js';

	const { data } = $props();
	const { comic, characters, events, series, stories, creators } = data;
</script>

<h1>{comic.title}</h1>
<img src={getImageUrl(comic.thumbnail)} alt={comic.title} />

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

{#if stories.length !== 0}
	<div>
		<h2>Stories</h2>
		{#each stories as story (story.id)}
			<Story {story} />
		{/each}
	</div>
{/if}
