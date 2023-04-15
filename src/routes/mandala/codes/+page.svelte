<script lang="ts">

	import { onMount } from 'svelte'
	import { allCodes } from '$lib/utils/supabase'
	import '$lib/styles/themes.sass'

	let codas:any

	onMount(async() => {
		codas = await allCodes()
	})

</script>


<div class="newgrid wider buffer bufferYt bufferYb themered">
	{#if codas && codas.length > 0}
		{#each codas as item, i}
			<div class="tube red">
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