<script lang="ts">

	import { onMount } from 'svelte'
	import { MidjourneyImages } from '$lib/utils/supabase'

	let images:any

	onMount(async() => {
		images = await MidjourneyImages()
	})

</script>

<div class="standardbloghorizontal">
	{#if images && images.length > 0}
		{#each images as item, i}
			<div class="bigimagebox">
				<a href="/images/{item.id}">
				<img src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1/{item.link.slice(90,100)}" alt={item.id}>
				</a>
			</div>
		{/each}
	{/if}
</div>

<style lang="sass">

.standardbloghorizontal
	display: grid
	width: 100vw
	height: 100vh
	grid-template-columns: 1fr 1fr 1fr
	grid-template-rows: 1fr 1fr
	grid-template-areas: ". . ." ". . ."
	gap: 4px 4px
	grid-auto-flow: column
	overflow-x: scroll
	overflow-y: hidden
	.bigimagebox
		flex-shrink: 0
		width: 50vw
		height: 50vh
	.bigimagebox a
		img
			object-fit: cover
			height: 100%
			width: 100%

</style>