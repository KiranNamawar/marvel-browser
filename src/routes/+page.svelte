<script lang="ts">
	let query = $state('');
</script>

<h1>Marvel Browser</h1>

<main>
	<input placeholder="Search for Characters, Comics, Creators..." bind:value={query} />

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
    input {
        width: 40%;
        font-size: large;
        border: none;
        background: light-dark(rgb(220, 219, 219), rgb(66, 65, 65));
        padding: 1rem;
        border-radius: 10px;
        &:focus-visible {
            outline: none;
        }
    }
</style>
