<script lang="ts">

	import { onMount } from 'svelte'
	import { allCodes } from '$lib/utils/supabase'
	import BigCard from '$lib/components/BigCard.svelte'
	import Postal from '$lib/components/Postal.svelte'

	let codas:any

	onMount(async() => {
		codas = await allCodes()
	})

</script>


<div class="standardbloggrid buffer bufferYt bufferYb">
	{#if codas && codas.length > 0}
		{#each codas as item, i}
			<Postal i={i} linkvar="/codes/{item.counting}">
				<small slot="postalone">{item.type}</small>
				<h5 slot="postaltwo">{item.title}</h5>
				<p slot="postalthree">{item.tags} | {item.lang}</p>
			</Postal>
		{/each}
	{/if}
</div>

<style lang="sass">

.standardbloggrid
	background-color: hsla(0,0%,4%,1)
	background-image: radial-gradient(at 40% 20%, hsla(283,62%,9%,0.71) 0px, transparent 50%), radial-gradient(at 76% 83%, hsla(256,77%,16%,0.64) 0px, transparent 50%)

</style>