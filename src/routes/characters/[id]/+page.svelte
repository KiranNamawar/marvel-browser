<script lang="ts">
	import { getImageUrl } from '$lib/api';

	const { data } = $props();
	const { character, comics, series, events, stories } = data;
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
			<img
				src={getImageUrl(comic.thumbnail.path, comic.thumbnail.extension, 'portrait_medium')}
				alt={comic.title}
			/>
			<!-- <p>{comic.title}</p> -->
		{/each}
	</div>
{/if}

{#if series.length !== 0}
	<div>
		<h2>Series</h2>
		{#each series as serie (serie.id)}
			<img
				src={getImageUrl(serie.thumbnail.path, serie.thumbnail.extension, 'portrait_medium')}
				alt={serie.title}
			/>
			<!-- <p>{serie.title}</p> -->
		{/each}
	</div>
{/if}

{#if events.length !== 0}
	<div>
		<h2>Events</h2>
		{#each events as event (event.id)}
			<img
				src={getImageUrl(event.thumbnail.path, event.thumbnail.extension, 'portrait_medium')}
				alt={event.title}
			/>
			<!-- <p>{event.title}</p> -->
		{/each}
	</div>
{/if}

<!-- {#if stories.length !== 0}
	<div>
		<h2>Stories</h2>
		{#each stories as story (story.id)}
			{#if story.thumbnail}
				<img
					src={getImageUrl(story.thumbnail.path, story.thumbnail.extension, 'portrait_medium')}
					alt={story.title}
				/>
			{/if}
			<p>{story.title}</p>
		{/each}
	</div>
{/if} -->
