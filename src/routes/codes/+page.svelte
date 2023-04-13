<script lang="ts">

	import { onMount } from 'svelte'
	import { allCodes } from '$lib/utils/supabase'
	import BigCard from '$lib/components/BigCard.svelte'

	let codas:any

	onMount(async() => {
		codas = await allCodes()
	})

</script>


<div class="postsarea">
	{#if codas && codas.length > 0}
		{#each codas as item, i}
			<BigCard linkvar="/codes/{item.counting}">
				<small slot="category">{item.type}</small>
				<h5 slot="title">{item.title}</h5>
				<div slot="tags" class="boxr">
					<p>{item.tags}</p>
					<p>{item.lang}</p>
				</div>
			</BigCard>
		{/each}
	{/if}
</div>

<style lang="sass">

.postsarea
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	margin-top: 32px
	padding-bottom: 32px
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 16px 16px
		height: 100%
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 0px 16px
		padding-bottom: 0px
		height: 348px
		padding-left: 16px
		padding-right: 16px

</style>