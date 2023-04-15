<script lang="ts">

	import { onMount } from 'svelte'
	import { allDocs } from '$lib/utils/localpulls'
	import '$lib/styles/themes.sass'

	let docs:any
	let viewport:number

	onMount(async() => {
		docs = await allDocs()
	})

</script>

<svelte:window bind:innerWidth={viewport}/>


<div class="newgrid wider buffer bufferYt bufferYb themegreen">
	{#if docs && docs.length > 0}
		{#each docs as item, i}
			<div class="tube green">
				<small>{item.meta.type}</small>
				<h5>
					<a href={item.path}>
						{item.meta.title}
					</a>
				</h5>
				<p>{item.meta.tags}</p>
			</div>
		{/each}
	{/if}
</div>
