<script lang="ts">

	import { onMount } from 'svelte'
	import { allMandalas } from '$lib/utils/localpulls'

	let posts:any

	onMount(async() => {
		posts = await allMandalas()
	})

</script>


<div class="newgrid wider buffer bufferYt bufferYb height themeblue">
	{#if posts && posts.length > 0}
		{#each posts as item, i}
			<div class="tube blue">
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
