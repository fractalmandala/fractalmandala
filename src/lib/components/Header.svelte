<script lang="ts">

	import { onMount } from 'svelte'
	import { get, writable } from 'svelte/store'
	import { clickOutsideAction } from 'svelte-legos'
	import supabase from '$lib/utils/supabase'
	const searchStore = writable('')
	let searchinput
	const resultsStore = writable([])
	let showResults = false
	let loadingStore = false;
	import { fly } from 'svelte/transition'
	import { page } from '$app/stores'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import MobileIcon from '$lib/components/MobileIcon.svelte'

	let showThemeItems = false
	let keyBlank = false
	let showPages = false
	let y:number
	let url:any
	let breakPoint = true
	let screenWidth:number
	let expandedMenu = false
	let hidden = false

	function toggleMenu(){
		expandedMenu = !expandedMenu
	}

	function handleClickOutside() {
  	showResults = !showResults
	}

	function blankKey(){
		keyBlank = !keyBlank
	}


	function closeSearch(){
		if (showResults === true ) {
			showResults = false
		}
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

	const searchWord = async() => {
		loadingStore = true
		showResults = true
		const searchTerm = get(searchStore)
		let results: any[] = []
		const { data, error } = await supabase
			.from('amrit-notes')
			.select()
			.textSearch('concatarea', searchTerm)
			.order('id')
			if (error) throw new Error(error.message)
			results = results.concat(data)

	// @ts-ignore
		resultsStore.set(results)
		loadingStore = false
		input.value = ''
}


	onMount(async() => {
		url = $page.url.pathname
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
		<div class="searcherinput">
			<input type="text"
				bind:this={searchinput}
				on:input={(e) => searchStore.set(e.target.value)} 
			/>
			<button class="roundicon" on:click={searchWord}>
				<svg width="100%" height="100%" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="inputwhite" d="M11 21C16.5229 21 21 16.5229 21 11C21 5.47715 16.5229 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5229 5.47715 21 11 21Z" fill="#171717"/>
				<path class="inputwhite" fill-rule="evenodd" clip-rule="evenodd" d="M0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C16.9371 0.25 21.75 5.06294 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C5.06294 21.75 0.25 16.9371 0.25 11ZM11 1.75C5.89136 1.75 1.75 5.89136 1.75 11C1.75 16.1086 5.89136 20.25 11 20.25C16.1086 20.25 20.25 16.1086 20.25 11C20.25 5.89136 16.1086 1.75 11 1.75Z" fill="#171717"/>
				<path class="inputpurple" fill-rule="evenodd" clip-rule="evenodd" d="M6.96967 6.96967C7.26256 6.67678 7.73744 6.67678 8.03033 6.96967L11.5303 10.4697C11.8232 10.7626 11.8232 11.2374 11.5303 11.5303L8.03033 15.0303C7.73744 15.3232 7.26256 15.3232 6.96967 15.0303C6.67678 14.7374 6.67678 14.2626 6.96967 13.9697L9.93934 11L6.96967 8.03033C6.67678 7.73744 6.67678 7.26256 6.96967 6.96967Z" fill="#61339C"/>
				<path class="inputpurple" fill-rule="evenodd" clip-rule="evenodd" d="M11.4697 6.96967C11.7626 6.67678 12.2374 6.67678 12.5303 6.96967L16.0303 10.4697C16.3232 10.7626 16.3232 11.2374 16.0303 11.5303L12.5303 15.0303C12.2374 15.3232 11.7626 15.3232 11.4697 15.0303C11.1768 14.7374 11.1768 14.2626 11.4697 13.9697L14.4393 11L11.4697 8.03033C11.1768 7.73744 11.1768 7.26256 11.4697 6.96967Z" fill="#61339C"/>
				</svg>
			</button>
		</div>
		<nav>
			<div class="singletheme"><a href="/blog/gptchat">GPT</a></div>
			<div class="singletheme"><a href="/pad">Pad</a></div>
			<div class="singletheme"><a href="/play">Play</a></div>
		</nav>
	</div>
	{#if showResults && $resultsStore.length>0}
		<div class="searchresults modal" on:click={closeSearch} on:keydown={blankKey} use:clickOutsideAction on:clickoutside={handleClickOutside}>
			{#each $resultsStore as item, i}
					{#if item.title && item.type === 'code'}
						<p in:fly={{ duration: 200, delay: i*20, x: 128}}><a href="/blog/code/{item.id}">{item.title}</a><span style="color: #10D56C">{item.tags}</span></p>
					{:else if item.prompt && item.prompt.length > 0}
						<p in:fly={{ duration: 200, delay: i*20, x: 128}}><a href="/blog/gptchat/{item.id}">{item.prompt.slice(0,35)}</a></p>
					{:else}		
						<p in:fly={{ duration: 200, delay: i*20, x: 128}}><a href="/blog/general/{item.id}">{item.title}</a><span style="color: #10D56C">{item.tags}</span></p>
					{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="sass">

.searchresults
	display: flex
	flex-direction: column


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
			display: flex
			flex-direction: row-reverse
			align-items: center
			height: 72px
			column-gap: 32px
			padding: 0
			.searcherinput
				width: 240px
				height: 72px
				input
					height: 32px
					background: none
					border: 1px solid #474747
					border-radius: 16px
					color: white
			nav
				width: calc(100% - 240px)
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
			.searcherinput
				width: 100%
				height: 32px
				margin-bottom: 16px
				input
					height: 32px

.header.showsearch
	@media screen and (min-width: 1024px)
		.searchresults
			top: 72px
			width: 320px
			height: calc(100vh - 72px)
			overflow-y: scroll

.searchresults
	position: sticky
	top: 72px
	display: flex
	flex-direction: column
	align-self: end
	justify-self: end
	width: 320px
	margin-left: calc(100vw - 320px)
	height: calc(100vh - 72px)
	overflow-y: scroll
	p
		margin: 0
		&:hover
			color: #10D56C
			

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

.searcherinput
	display: flex
	flex-direction: row
	align-items: center
	gap: 16px
	input
		width: 100%
		margin-right: -48px
		border-radius: 4px
		outline: none
		border: none
		color: white
		padding-left: 16px
	button
		width: 32px
		height: 32px

.roundicon
	background: none
	border: none
	cursor: pointer
	svg
		object-fit: cover
		height: 100%
		width: 100%
	.inputwhite
		fill: white
	&:hover
		.inputwhite
			fill: var(--purp)
		.inputpurple
			fill: white
	@media screen and (min-width: 1024px)
		.inputwhite
			fill: none
		.inputpurple
			fill: white

nav
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