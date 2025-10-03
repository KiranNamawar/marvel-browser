<script lang="ts">
	import {
		getCharactersByName,
		getComicsByTitle,
		getCreatorsByName,
		getEventsByName,
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
	let debounceTimer: number;

	async function search(query: string, category: Category) {
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
	}

	$effect(() => {
        query;
        category;

		if (query.trim().length >= 3) {
			clearTimeout(debounceTimer);
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
		<input placeholder="Search for {category}" bind:value={query} />
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
	input {
		width: 100%;
		font-size: large;
		border: none;
		background-color: transparent;
		padding: 0.5rem;
		&:focus-visible {
			outline: none;
		}
	}
	button {
		border: none;
		padding: 0.5rem;
		border-radius: 10px;
		cursor: pointer;
	}
</style>
