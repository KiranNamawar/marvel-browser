<script lang="ts">
	import { getImageUrl } from "$lib/api";
	import Character from "$lib/components/Character.svelte";
	import Comic from "$lib/components/Comic.svelte";
	import Story from "$lib/components/Story.svelte";
    import Creator  from "$lib/components/Creator.svelte";
    import Event from "$lib/components/Event.svelte";

	const { data } = $props();
	const { series, comics, characters, events, stories, creators } = data;
</script>


<h1>{series.title}</h1>
<img src={getImageUrl(series.thumbnail)} alt={series.title} />

{#if characters.length !== 0}
	<div>
		<h2>Characters</h2>
		{#each characters as character (character.id)}
			<Character {character} />
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

{#if creators.length !== 0}
	<div>
		<h2>Creators</h2>
		{#each creators as creator (creator.id)}
			<Creator {creator} />
		{/each}
	</div>
{/if}