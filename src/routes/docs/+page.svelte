<script lang="ts">

	import { onMount } from 'svelte'
	import { allDocs } from '$lib/utils/localpulls'
	import Postal from '$lib/components/Postal.svelte'

	let docs:any
	let viewport:number

	onMount(async() => {
		docs = await allDocs()
	})

</script>

<svelte:window bind:innerWidth={viewport}/>


<div class="standardbloggrid buffer bufferYt bufferYb">
	{#if docs && docs.length > 0}
		{#each docs as item, i}
			<Postal i={i} linkvar={item.path}>
				<small slot="postalone">{item.meta.type}</small>
				<h5 slot="postaltwo">{item.meta.title}</h5>
				<p slot="postalthree">{item.meta.tags}</p>
			</Postal>
		{/each}
	{/if}
</div>

<style lang="sass">

.standardbloggrid
	background-color: hsla(0,0%,4%,1)
	background-image: radial-gradient(at 23% 26%, hsla(231,93%,12%,0.44) 0px, transparent 50%), radial-gradient(at 76% 66%, hsla(337,77%,16%,0.27) 0px, transparent 50%)

</style>

