<script lang="ts">

	import { onMount } from 'svelte'
	import { get, writable } from 'svelte/store'
	import supabase from '$lib/utils/supabase'
	import { allNotes } from '$lib/utils/supabase'
	import AutoComplete from 'simple-svelte-autocomplete'
	const searchStore = writable('')
	const resultsStore = writable([])
	let showResults = false
	let loadingStore = false;
	import { page } from '$app/stores'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import MobileIcon from '$lib/components/MobileIcon.svelte'

	let showThemeItems = false
	let selectedNote:any
	let notes:any
	let keyBlank = false
	let showPages = false
	let y:number
	let url:any
	let breakPoint = true
	let screenWidth:number
	let expandedMenu = false
	let showS = false
	let showR:any

	export async function searchIn(searchtext:string){
		searchtext = selectedNote
		const {data,error} = await supabase
		.from('amrit-notes')
		.select()
		.textSearch('title',searchText)
		if (error) throw new Error(error.message)
		return data
	}

	function toggleMenu(){
		expandedMenu = !expandedMenu
	}

	function blankKey(){
		keyBlank = !keyBlank
	}

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
		showR = await searchIn(searchtext)
	})

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={screenWidth}/>

<div class="header" class:expanded={expandedMenu} class:showsearch={showResults}>
	<div class="logo">
		<a href="/">
			<LogoFMMotif></LogoFMMotif>
			<LogoFM></LogoFM>
		</a>
	</div>
	<div class="mobileicon" on:click={toggleMenu} on:keydown={blankKey}>
		<MobileIcon></MobileIcon>
	</div>
	<div class="openarea">
		<div class="nav">
			<div class="singletheme"><a href="/blog/gptchat">GPT</a></div>
			<div class="singletheme"><a href="/pad">Pad</a></div>
			<div class="singletheme"><a href="/play">Play</a></div>
		</div>
		<div class="searcherinput">
			<AutoComplete
				items={notes}
				bind:selectedItem={selectedNote}
				labelFieldName="title"
				className="headerautocomplete"
				/>
		</div>
	</div>
</div>

<style lang="sass">

.resbo
	display: flex
	position: fixed
	top: 0
	left: 0

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
		height: 72px
		align-items: start
		align-content: start
		position: fixed
		justify-items: stretch
		justify-content: stretch
		padding-left: 16px
		padding-right: 16px
		backdrop-filter: blur(10px)
		top: 0
		.logo
			grid-area: logo
			height: 72px
			width: 360px
		.openarea
			grid-area: area
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
			display: flex
			grid-area: openarea
			height: calc(100vh - 72px)
			display: flex
			flex-direction: column
			width: 100%
			padding-top: 32px

.openarea
	display: flex
	@media screen and (min-screen: 1024px)
		flex-direction: row
		justify-content: flex-end !important
		width: 100%
		gap: 32px !important

.searcherinput
	width: 240px !important
	display: flex
	flex-direction: row
	justify-content: flex-end !important
	align-items: center

.nav
	width: calc(100% - 280px)
	
			
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

.nav
	@media screen and (min-width: 1024px)
		display: flex
		flex-direction: row
		align-items: center
		justify-content: flex-end
		height: 72px
		gap: 16px
	@media screen and (max-width: 1023px)
		padding: 32px
		.singletheme
			font-size: 32px
			margin-bottom: 8px
			text-transform: uppercase

.singletheme
	@media screen and (min-width: 1024px)
		border-radius: 4px
		cursor: pointer
		transform-origin: center center
		color: #575757
		transition: all 0.15s var(--cubed)
		height: 32px
		font-size: 14px
		display: flex
		flex-direction: row
		align-items: center
		justify-content: center
		text-align: center
		width: 64px
		&:hover
			color: #10D56C

</style>