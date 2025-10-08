<script lang="ts">
</script>

<footer>
	<a href="https://www.marvel.com/">Data provided by Marvel. © {new Date().getFullYear()} MARVEL</a>
</footer>

<style>
	footer {
		text-align: center;
		padding: var(--padding-lg);
		font-size: 0.875rem;

		& a {
			color: var(--text-color);
			opacity: 0.6;
			text-decoration: none;

			&:hover {
				opacity: 1;
				text-decoration: underline;
			}
		}
	}
</style>
