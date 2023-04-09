<script lang="ts">

	import { onMount } from 'svelte'
	import { allCodes } from '$lib/utils/supabase'
	import { fly } from 'svelte/transition'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	
	let snips:any

	onMount(async() => {
		snips = await allCodes()
		Prism.highlightAll();
	})

</script>

<div class="pagecontainer">
	{#if snips && snips.length > 0}
		{#each snips as item, i}
			<div class="snip-card" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<a href="/notes/{item.id}" target="_self">
				<p>{item.title}</p>
				<div class="boxr">
					<small class="typetype">{item.type}</small>
					<small style="color: #474747">{item.lang}</small>
					<small style="color: #474747">{item.tags}</small>
				</div>
				</a>
			</div>
		{/each}
	{/if}
</div>

<style lang="sass">

.typetype
	color: #10D56c
	text-transform: uppercase

.snip-card
	.boxr
		gap: 16px

.snip-card
	transition: all 0.23s ease
	display: flex
	flex-direction: column
	&:hover
		box-shadow: 4px 8px 14px #000000
	small
		margin: 0

.pagecontainer
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 32px 32px
		.snip-card
			border: 1px solid #272727
			padding: 16px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "."
		gap: 8px 16px
		.snip-card
			border: 1px solid #272727
			padding: 8px 16px

</style>