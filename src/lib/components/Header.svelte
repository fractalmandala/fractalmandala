<script lang="ts">

	import { onMount } from 'svelte'
	import { get, writable } from 'svelte/store'
	import visibilityMode from '$lib/stores/visibility'	
	import supabase from '$lib/utils/supabase'
	import { allNotes } from '$lib/utils/supabase'
	import Toggle from '$lib/system/Toggle.svelte'
	let showResults = false
	import { page } from '$app/stores'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import MobileIcon from '$lib/components/MobileIcon.svelte'

	let showThemeItems = false
	let selectedNote:any
	let notes:any
	let showPages = false
	let y:number
	let url:any
	let breakPoint = true
	let screenWidth:number
	let expandedMenu = false
	let showS = false

	$: if ( screenWidth <= 1023) {
		breakPoint = expandedMenu
		showThemeItems = expandedMenu
		showPages = expandedMenu
	} else {
		breakPoint = true
		showThemeItems = false
		showPages = false
	}

	$: if ( selectedNote) {
		showS = true
	} else {
		showS = false
	}


	onMount(async() => {
		url = $page.url.pathname
		notes = await allNotes()
	})

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={screenWidth}/>

<div class="header" class:expanded={expandedMenu} class:showsearch={showResults} class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<div class="logo">
		<a href="/">
			<LogoFMMotif></LogoFMMotif>
			<LogoFM></LogoFM>
		</a>
	</div>
	<div class="mobileicon">
		<MobileIcon></MobileIcon>
	</div>
	<div class="openarea rta-row ycenter colgap300 xend">
		<div class="toggleinput">
			<Toggle/>
		</div>
	</div>
</div>

<style lang="sass">

.header
	display: grid
	grid-auto-flow: row
	z-index: 999
	transition: 0.3s ease
	@media screen and (min-width: 1024px)
		grid-template-columns: 360px 1fr
		grid-template-rows: 1fr
		grid-template-areas: "logo area"
		width: 100%
		height: 80px
		align-items: start
		align-content: start
		position: fixed
		justify-items: stretch
		justify-content: stretch
		padding-left: 24px
		padding-right: 24px
		backdrop-filter: blur(10px)
		top: 0
		.logo
			grid-area: logo
			height: 80px
			width: 360px
		.openarea
			grid-area: area
			height: 80px
		.mobileicon
			display: none	
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 40px
		grid-template-rows: 72px
		grid-template-areas: "logo icon"
		width: 100%
		height: 72px
		align-content: start
		align-items: start
		padding-left: 16px
		padding-right: 16px
		position: fixed
		background: rgba(0,0,0,0.1)
		backdrop-filter: blur(10px)
		top: 0
		.logo
			grid-area: logo
		.mobileicon
			grid-area: icon
			width: 40px
			height: 72px
		.openarea
			display: none

.header.dark
	box-shadow: 4px 4px 5px #090909
	background: #121212

.header.expanded
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 40px
		grid-template-rows: 72px 1fr
		grid-template-areas: "logo icon" "openarea openarea"
		height: 100vh
		align-content: start
		align-items: start
		.logo
			grid-area: logo
			height: 72px
		.mobileicon
			grid-area: icon
			height: 72px
		.openarea
			grid-area: openarea
			height: calc(100vh - 72px)
			display: flex
			flex-direction: column
			width: 100%
			padding-top: 32px

.toggleinput
	display: flex
	flex-direction: row
	justify-content: flex-end
	align-items: center

			
.mobileicon
	display: flex
	justify-content: flex-end
	align-items: center
	height: 72px
	cursor: pointer

.logo a
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-start
	height: 72px

</style>