<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode } from '$lib/stores/globalstores'
	import { fullGallery, rangeGallery, lastGallery } from '$lib/utils/supabase'
	let topper = 1000
	let lower = 550
	let ranges:any
	let images:any
	let last:any
	let fake = false
	let gallery = true

	function toggleGallery(){
		gallery = !gallery
	}

	function fauxfake(){
		fake = !fake
	}

	function newLower(newLow:number){
		lower = newLow - 11
		topper = newLow
	}

	$: if (lower) {
		(async() => {
			ranges = await rangeGallery(lower, topper)
		})();
	}

	onMount(async() => {
		images = await fullGallery()
		ranges = await rangeGallery(lower,topper)
		last = await lastGallery()
	})

</script>

<div class="rta-column stickyboy" class:light={!$themeMode} class:dark={$themeMode}>
	<h3 class="bord-bot p-bot-16">Midjourney Gallery</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:light={!$themeMode} class:dark={$themeMode}>
	<p>
		Midjourney is awesome! And anyone prancing about with the "AI art is not true art" has just spent way too long being in very high opinion of themselves, combined with an inner Luddite they may or may not recognize.
		One may well have a dislike for it, or simply prefer to not engage at all. But to declare on behalf of the rest of humanity that it isn't true art is frankly, ignorant and silly.
	</p>
	{#if gallery}
	{#if last && last.length > 0}
		<div class="rta-row colgap100 p-bot-32">
		{#each last as item}
			<button class="secondbutton point" on:click={() => newLower(item.id)}>{item.id}</button>
		{/each}
		<button class="secondbutton point" on:click={toggleGallery}>
			Large View
		</button>
		</div>
	{/if}
		{#if ranges && ranges.length > 0}
		<div class="rta-grid grid4 colgap300 rowgap300">
		{#each ranges as item}
			<a class="rta-image height-30" href="/gallery/{item.slug}">
				<img src={item.link} alt={item.slug}/>
			</a>
		{/each}
		</div>
		{/if}
	{/if}
	{#if !gallery}
		<button class="secondbutton point" on:click={toggleGallery}>
		Gallery
		</button>
		<div class="rta-image gallery-non p-top-32">
		{#if last && last.length > 0}
		{#each last as item}
		<img src={item.link} alt={item.id}/>
		{/each}
		{/if}
		</div>
	{/if}
</div>

<style lang="sass">

.gallery-non
	height: calc(100vh - 200px)

.rta-image
	img
		object-fit: cover
		height: 100%
		width: 100%

</style>