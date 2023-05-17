<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { fullGallery, rangeGallery, lastGallery } from '$lib/utils/supabase'
	import { scale } from 'svelte/transition'
	import NavPrev from '$lib/icons/NavPrev.svelte'
	import NavNext from '$lib/icons/NavNext.svelte'
	let topper = 7
	let skew = true
	let lower = 0
	let ranges:any
	let images:any
	let last:any
	let fake = false
	let gallery = true
	let pageTitle = 'Gallery'

	function toggleGallery(){
		gallery = !gallery
	}

	function fauxfake(){
		fake = !fake
	}

	function nextEight(){
		lower = lower + 7;
		topper = topper + 7
	}

	function prevEight(){
		lower -= 7;
		topper -= 7;
	}

	$: if (lower || topper) {
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


<div
	class="solopage zepad y minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<h1 class="tt-u">
		Gallery
	</h1>
	<div class="newblog">
		<p>
		Midjourney is awesome! And anyone prancing about with the "AI art is not true art" has just spent way too long being in very high opinion of themselves, combined with an inner Luddite they may or may not recognize.
		One may well have a dislike for it, or simply prefer to not engage at all. But to declare on behalf of the rest of humanity that it isn't true art is frankly, ignorant and silly.
		</p>
	</div>
		<div class="rta-column newblog p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
		{#if ranges && ranges.length > 0}
			<div class="rta-grid grid4 colgap300 rowgap300 m-bot-32">
				{#each ranges as item}
					<a class="rta-image height-30" href="/gallery/{item.slug}" transition:scale>
						<img src={item.link} alt={item.slug}/>
					</a>
				{/each}
			</div>
		{/if}
		<div class="rta-row xcenter-d colgap200 ycenter">
			{#if lower === 0}
				<div class="rta-row xcenter-d colgap200 ycenter">
					<button class="blank-button" on:click={nextEight}>
						<NavNext/>
					</button>
					
				</div>
			{:else}
			<button class="blank-button" on:click={prevEight}>
				<NavPrev/>
			</button>
			<button class="blank-button" on:click={nextEight}>
				<NavNext/>
			</button>
			{/if}
		</div>
		</div>
</div>


