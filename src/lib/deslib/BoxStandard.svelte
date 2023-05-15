<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo, readingMode } from '$lib/stores/globalstores'
	import { fly } from 'svelte/transition'
	import { elementSizeStore } from "svelte-legos";
	import { slide } from 'svelte/transition'
	import { quadOut, quadIn } from 'svelte/easing'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'
	let ref: HTMLElement | null = null;
	export let isNulled = false
	let scrollY:number
	let fake = false
	let expandRightbar = false
	let perCent:any
	export let skew = false

	$: size = elementSizeStore(ref);
	$: perCent = scrollY / $size.height

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}
	
	function fauxfake(){
		fake = !fake
	}

</script>

<svelte:window bind:scrollY={scrollY}/>

<div class="flyingpage rta-column" 
	in:fly={{ delay: 500, duration: 400, y: 900, easing: quadOut}}
	out:fly={{ delay: 0, duration: 350, opacity: 0, x: 900, easing: quadIn}}
	class:dark={$themeMode}
	class:light={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:reader={$readingMode}
	class:skewed={skew}
	class:nulled={isNulled}
	class:fixed={skew && isNulled}
	>
	<div class="pagemid rta-column" bind:this={ref} class:nulled={isNulled}>
		<div class="progressline" style="width: {perCent * 100}%" class:sticky={!$readingMode} class:moreSticky={$readingMode}></div>
		<slot name="mid"></slot>
	</div>
</div>

<style lang="sass">

.flyingpage
	background: var(--background)


.flyingpage.levelzero
	padding: 0px 4vw 64px 4vw

.progressline
	height: 3px
	background: var(--green)
	z-index: 1000
	position: sticky

.progressline.sticky
	top: 64px

.progressline.moreSticky
	top: 48px

.leveltwo
	.progressline.sticky
		top: 64px

</style>