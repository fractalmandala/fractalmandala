<script lang="ts">

	import { onMount } from 'svelte'
	import { allDocs } from '$lib/utils/localpulls'
	import { fly } from 'svelte/transition'

	let docs:any

	onMount(async() => {
		docs = await allDocs()
	})

</script>

<div class="pagecontainer">
	{#if docs && docs.length > 0}
		{#each docs as item, i}
			<div class="doc-card" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<a href="{item.path}" target="_self">
				<p>
					<a href="{item.path}" target="_self">
						{item.meta.title}
					</a>
				</p>
				<div class="boxr" style="gap: 16px">
					<small style="text-transform: uppercase; color: #10D56C">{item.meta.type}</small>
					<small style="color: #474747">{item.meta.tags}</small>
				</div>
				</a>
			</div>
		{/each}
	{/if}
</div>

<style lang="sass">

.doc-card
	transition: all 0.23s ease
	&:hover
		box-shadow: 4px 8px 14px #000000

.pagecontainer
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 32px 32px
		.doc-card
			border: 1px solid #272727
			padding: 16px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "."
		gap: 16px 16px
		.doc-card
			border: 1px solid #272727
			padding: 8px 16px
			row-gap: 0

</style>