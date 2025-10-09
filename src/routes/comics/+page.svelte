<script lang="ts">
	import { getComics } from '$lib/api/comics';
	import Comic from '$lib/components/comic.svelte';
	import InfiniteScroll from '$lib/components/infinite-scroll.svelte';
	import { isImageAvailable } from '$lib/utils/image';
</script>

<InfiniteScroll
	getData={getComics}
	Item={Comic}
	filterFn={(i) => isImageAvailable(i.thumbnail)}
/>
