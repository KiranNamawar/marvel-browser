<script lang="ts">
	import { LoaderCircle } from '@lucide/svelte';
	import {
		getCharactersByName,
		getComicsByTitle,
		getCreatorsByName,
		getEventsByName,
		getImageUrl,
		getSeriesByTitle
	} from '$lib/api';
	import type {
		CharacterDataWrapper,
		ComicDataWrapper,
		CreatorDataWrapper,
		EventDataWrapper,
		SeriesDataWrapper
	} from '$lib/types';

	type Category = 'characters' | 'comics' | 'series' | 'events' | 'creators';
	type Result =
		| CharacterDataWrapper
		| ComicDataWrapper
		| SeriesDataWrapper
		| EventDataWrapper
		| CreatorDataWrapper;

	let query = $state('');
	let category = $state<Category>('characters');
	let result = $state<Result | null>(null);
	let loading = $state(false);
	let debounceTimer: number;

	async function search(query: string, category: Category) {
		loading = true;
		try {
			switch (category) {
				case 'characters':
					result = await getCharactersByName(query);
					break;
				case 'comics':
					result = await getComicsByTitle(query);
					break;
				case 'series':
					result = await getSeriesByTitle(query);
					break;
				case 'events':
					result = await getEventsByName(query);
					break;
				case 'creators':
					result = await getCreatorsByName(query);
					break;
			}
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		query;
		category;

		clearTimeout(debounceTimer);
		if (query.trim().length > 3) {
			debounceTimer = setTimeout(async () => {
				await search(query, category);
			}, 300);
		} else {
			result = null;
		}
		return () => clearTimeout(debounceTimer);
	});

	$inspect(result);
</script>

<h1>Marvel Browser</h1>

<main>
	<div class="search">
		<div class="category">
			<button
				class={{ active: category === 'characters' }}
				onclick={() => (category = 'characters')}
			>
				Characters
			</button>
			<button class={{ active: category === 'comics' }} onclick={() => (category = 'comics')}>
				Comics
			</button>
			<button class={{ active: category === 'series' }} onclick={() => (category = 'series')}>
				Series
			</button>
			<button class={{ active: category === 'events' }} onclick={() => (category = 'events')}>
				Events
			</button>
			<button class={{ active: category === 'creators' }} onclick={() => (category = 'creators')}>
				Creators
			</button>
		</div>
		<div class="input">
			<input placeholder="Search for {category}" bind:value={query} />
			<span class={[{ loading }, 'icon']}><LoaderCircle /></span>
		</div>
	</div>
	<div class="result">
		{#if result}
			{#if category === 'characters'}
				{#each (result as CharacterDataWrapper).data.results as character (character.id)}
					<a href="/characters/{character.id}">
						<div class="item">
							<img
								src={getImageUrl(
									character.thumbnail.path,
									character.thumbnail.extension,
									'portrait_small'
								)}
								alt={character.name}
							/>
							<div>
								<h3>{character.name}</h3>
								<p>{character.description}</p>
							</div>
						</div>
					</a>
				{/each}
			{:else if category === 'comics'}
				{#each (result as ComicDataWrapper).data.results as comic (comic.id)}
					<a href="/comics/{comic.id}">
						<div class="item">
							<img
								src={getImageUrl(comic.thumbnail.path, comic.thumbnail.extension, 'portrait_small')}
								alt={comic.title}
							/>
							<h3>{comic.title}</h3>
						</div>
					</a>
				{/each}
			{:else if category === 'series'}
				{#each (result as SeriesDataWrapper).data.results as series (series.id)}
					<a href="/series/{series.id}">
						<div class="item">
							<img
								src={getImageUrl(
									series.thumbnail.path,
									series.thumbnail.extension,
									'portrait_small'
								)}
								alt={series.title}
							/>
							<h3>{series.title}</h3>
						</div>
					</a>
				{/each}
			{:else if category === 'events'}
				{#each (result as EventDataWrapper).data.results as event (event.id)}
					<a href="/events/{event.id}">
						<div class="item">
							<img
								src={getImageUrl(event.thumbnail.path, event.thumbnail.extension, 'portrait_small')}
								alt={event.title}
							/>
							<h3>{event.title}</h3>
						</div>
					</a>
				{/each}
			{:else if category === 'creators'}
				{#each (result as CreatorDataWrapper).data.results as creator (creator.id)}
					<a href="/creators/{creator.id}">
						<div class="item">
							<img
								src={getImageUrl(
									creator.thumbnail.path,
									creator.thumbnail.extension,
									'portrait_small'
								)}
								alt={creator.fullName}
							/>
							<h3>{creator.fullName}</h3>
						</div>
					</a>
				{/each}
			{/if}
		{/if}
	</div>
</main>

<style>
	h1 {
		text-align: center;
	}
	main {
		margin-top: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.active {
		background-color: red;
	}
	.search {
		background: light-dark(rgb(220, 219, 219), rgb(66, 65, 65));
		border-radius: 10px;
		width: 40%;
		padding: 0.5rem;
	}
	.category {
		display: flex;
		flex-flow: row wrap;
		gap: 0.3rem;
	}
	.input {
		display: flex;
		align-items: center;

		& span {
			visibility: hidden;
			&.loading {
				visibility: visible;
				animation: spin 1s infinite ease;
			}
		}
	}
	input {
		width: 100%;
		font-size: larger;
		border: none;
		background-color: transparent;
		padding: 0.5rem;
		&:focus-visible {
			outline: none;
		}
	}
	button {
		border: light-dark(rgb(193, 192, 192), rgb(76, 75, 75));
		padding: 0.5rem;
		border-radius: 10px;
		cursor: pointer;
	}

	.result {
		display: grid;
		gap: 0.5rem;
		width: 50%;
		margin: 0.5rem;
		& .item {
			display: flex;
			gap: 0.5rem;
			border: solid;
			border-radius: 10px;
			overflow: hidden;
		}
	}
</style>
