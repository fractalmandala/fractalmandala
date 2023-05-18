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

	<div
		class:dark={$themeMode}
		class:light={!$themeMode}
		class:levelzero={$breakZero}
		class:levelone={$breakOne}
		class:leveltwo={$breakTwo}
		class="solopage zepad all minH mob"
		>
		<Parallax --parallax="url('{data.link}')"/>
	</div>

<style lang="sass">


.solopage
	height: 100vh
	width: 100%
	position: relative


</style>