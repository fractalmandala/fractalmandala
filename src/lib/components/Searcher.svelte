<script lang="ts">

	import { onMount } from 'svelte'
	import supabase from '$lib/utils/supabase'
	let inputer:any
	let searchresults:any

	async function searcher(inputer:any){
		const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.textSearch('fts',inputer)
		if (error) throw new Error(error.message)
		searchresults = data
	}	

	onMount(async() => {
		searchresults = await searcher(inputer)
	})

</script>

<div class="searcherinput">
	<input type="text" bind:value={inputer}/>
	<button class="glowing" on:click={() => searcher(inputer)}>FIND</button>
</div>

<style lang="sass">

.searcherinput
	display: flex
	flex-direction: row
	gap: 16px

</style>