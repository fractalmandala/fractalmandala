<script lang="ts">

	import { onMount } from 'svelte'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'
	import { rangeGallery, singleImage } from '$lib/utils/supabase'
	import { themeMode, breakOne, breakZero, breakTwo, readingMode } from '$lib/stores/globalstores'
	import Parallax from '$lib/deslib/Parallax.svelte'
	import NavNext from '$lib/icons/NavNext.svelte'
	import NavPrev from '$lib/icons/NavPrev.svelte'
	let skew = true
	let skipCrumb = true
	let isNulled = true
	let lower:number
	let topper:number
	let ranges:any
	let prevID:number
	let nextID:number
	let prevR:any
	let nextR:any
	let dimension = '40px'

	onMount(async() => {
		prevID = data.id - 1
		nextID = data.id + 1
		lower = data.id - 5
		topper = data.id + 5
		ranges = await rangeGallery(lower,topper)
		prevR = await singleImage(prevID)
		nextR = await singleImage(nextID)
	})	

	export let data



</script>

<BoxStandard
	skipCrumb={skipCrumb}
	skew={skew}
	isNulled={isNulled}
>
	<div slot="mid"
		class:dark={$themeMode}
		class:light={!$themeMode}
		class:levelzero={$breakZero}
		class:levelone={$breakOne}
		class:leveltwo={$breakTwo}
		>
		<div class="rta-column">
		<Parallax --parallax="url('{data.link}')"/>
		</div>
	</div>
	<div slot="right">
		<p class="space tt-u"><a href="/gallery">Gallery Home</a></p>
		<p class="space tt-u"><a href="https://www.midjourney.com/app/" target="_blank" rel="noreferrer">Midjourney</a></p>
		{#if prevR && prevR.length > 0 && nextR && nextR.length > 0}
			{#each nextR as item}
			<button class="blank-button seca">
				<a href="/gallery/{item.slug}">
					<NavNext dimension={dimension}/>
				</a>
			</button>
			{/each}
			{#each prevR as item}
				<button class="blank-button secb">
					<a href="/gallery/{item.slug}">
						<NavPrev dimension={dimension}/>
					</a>
				</button>
			{/each}
		{/if}
	</div>
</BoxStandard>

<style lang="sass">

.secb, .seca
	transform: rotate(180deg)

.rta-column
	height: 100vh
	width: 100%

</style>