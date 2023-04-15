<script lang="ts">

	import { onMount } from 'svelte'
	import { Swipe, SwipeItem } from 'svelte-swipe'
	import { MidjourneyImages } from '$lib/utils/supabase'
	import { lazyLoadImageAction } from 'svelte-legos'

	let images:any

	const swipeConfig = {
		autoplay: false,
		delay: 2000,
		showIndicators: false,
    transitionDuration: 1000,
		defaultIndex: 0,
	}

	onMount(async() => {
		images = await MidjourneyImages()
	})

</script>

<div class="standardbloghorizontal">
	{#if images && images.length > 0}
		<Swipe {...swipeConfig}>
			{#each images as item, i}
				<SwipeItem>
					<div class="bigimagebox">
						<a href="/mandala/images/{item.id}">
							<img use:lazyLoadImageAction src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1/{item.link.slice(90,100)}" data-src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1/{item.link.slice(90,100)}" alt={item.id}>
						</a>
					</div>
				</SwipeItem>
			{/each}
		</Swipe>
	{/if}
</div>

<style lang="sass">

.standardbloghorizontal
	display: grid
	width: 100vw
	height: calc(100vh - 144px)
	grid-template-columns: 1fr
	grid-template-rows: 1fr
	grid-template-areas: "."
	gap: 4px 4px
	grid-auto-flow: column
	margin-top: 64px
	.bigimagebox
		width: 100%
		height: 100%
	.bigimagebox a
		img
			object-fit: cover
			height: 100%
			width: 100%

</style>