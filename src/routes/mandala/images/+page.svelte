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

<div class="standardbloghorizontal buffer">
	{#if images && images.length > 0}
		<div class="carousel">
			{#each images as item, i}
					<a href="/mandala/images/{item.id}" class="link"> 
						<img use:lazyLoadImageAction src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1/{item.link.slice(90,100)}" data-src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1/{item.link.slice(90,100)}" alt={item.id}>
					</a>
			{/each}
			</div>
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
	align-content: center
	align-items: center
	.carousel
		display: flex
		flex-direction: row
		width: 100%
		height: 60%
		white-space: nowrap
		overflow-x: scroll
		overflow-y: hidden
		gap: 0
		a
			width: 25%
			height: 100%
			display: inline-block
			transition: 0.4s ease
			img
				object-fit: cover
				object-position: center center
				height: 100%

.carousel::-webkit-scrollbar
	width: 0
	height: 0

.carousel
	&:hover
		a
			&:hover
				width: 50%

</style>