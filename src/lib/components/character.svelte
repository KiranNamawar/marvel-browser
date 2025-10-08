<script lang="ts">
	import type { Character } from '$lib/types/marvel';
	import { getImageUrl } from '$lib/utils/image';

	let { character }: { character: Character } = $props();
</script>

<div class="container">
	<img src={getImageUrl(character.thumbnail, 'landscape_amazing')} alt={character.name} />
	<div>
        <p>{character.name}</p>
    </div>
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: 4fr 1fr;
		/* width: 150px; */
		& img {
			grid-column: 1/-1;
			grid-row: 1/4;
			width: 100%;
			height: auto;
			object-fit: cover;
		}
		& div {
			background-color: hsl(from var(--background-color) h s l / 0.7);
            padding-inline: 0.5rem;
			grid-row: 3/4;
			grid-column: 1/-1;
            overflow: hidden;
		}
	}
</style>
