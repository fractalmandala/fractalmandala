<script lang="ts">

	import { onMount } from 'svelte'
	import { MidjourneyImages } from '$lib/utils/supabase'

	let images:any

	onMount(async() => {
		images = await MidjourneyImages()
	})

</script>

<div class="postsarea">
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

.bigimagebox a
	img
		object-fit: cover
		height: 100%
		width: 100%

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
		gap: 16px 16px
		padding-bottom: 0px
		height: 100%
		padding-left: 16px
		padding-right: 16px

</style>