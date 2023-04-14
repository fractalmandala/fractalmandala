<script lang="ts">

	import { onMount } from 'svelte'
	import { allCodes } from '$lib/utils/supabase'

	let codas:any

	onMount(async() => {
		codas = await allCodes()
	})

</script>


<div class="newgrid wider buffer bufferYt bufferYb">
	{#if codas && codas.length > 0}
		{#each codas as item, i}
			<div class="postal">
				<small>{item.lang}</small>
				<h5>
					<a href="/mandala/codes/{item.counting}">
					{item.title}
					</a>
				</h5>
				<p>{item.tags}</p>
			</div>
		{/each}
	{/if}
</div>

<style lang="sass">

.newgrid
	background-color: hsla(0,0%,4%,1)
	background-image: radial-gradient(at 40% 20%, hsla(283,62%,9%,0.71) 0px, transparent 50%), radial-gradient(at 76% 83%, hsla(256,77%,16%,0.64) 0px, transparent 50%)

</style>