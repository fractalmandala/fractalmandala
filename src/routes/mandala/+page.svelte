<script lang="ts">

	import { onMount } from 'svelte'
	import { allMandalas } from '$lib/utils/localpulls'

	let posts:any

	onMount(async() => {
		posts = await allMandalas()
	})

</script>


<div class="newgrid wider buffer bufferYt bufferYb height">
	{#if posts && posts.length > 0}
		{#each posts as item, i}
			<div class="postal">
				<small>{item.meta.type}</small>
				<h5>
					<a href="{item.path}">
						{item.meta.title}
					</a>
				</h5>
				<p>{item.meta.tags}</p>
			</div>
		{/each}
	{/if}
</div>

<style lang="sass">

.newgrid
	background-color: hsla(0,0%,4%,1)
	background-image: radial-gradient(at 23% 26%, hsla(53,95%,22%,0.09) 0px, transparent 50%), radial-gradient(at 89% 55%, hsla(97,86%,9%,0.27) 0px, transparent 50%)

</style>