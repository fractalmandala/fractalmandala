<script lang="ts">

	import { onMount } from 'svelte'
	import { get, writable } from 'svelte/store'
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

	let showThemeItems = false
	let keyBlank = false
	let showPages = false
	let y:number
	let url:any
	let breakPoint = true
	let screenWidth:number
	let expandedMenu = false

	function toggleMenu(){
		expandedMenu = !expandedMenu
	}

	function togglePagesOn(){
		if ( screenWidth > 1023 ) {
			if ( showThemeItems === true ) {
				showThemeItems = false
			}
			if ( showPages === false ) {
				showPages = true
			}
		}
	}

	function togglePagesOff(){
		if ( screenWidth > 1023 ) {
			if ( showPages === true ) {
				showPages = false
			}
		}
	}

	function toggleThemeItemsOn(){
		if ( screenWidth > 1023 ) {
			if ( showPages === true ) {
				showPages = false
			}
			if ( showThemeItems === false ) {
				showThemeItems = true
			}
		}
	}

	function toggleThemeItemsOff(){
		if ( screenWidth > 1023 ) {
			if ( showThemeItems === true ) {
				showThemeItems = false
			}
		}
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
			.textSearch('fts', searchTerm)
			.order('id')
			if (error) throw new Error(error.message)
			results = results.concat(data)

		const { data: dataone, error: errorone } = await supabase
			.from('amrit-chatswithgpt')
			.select()
			.textSearch('fts', searchTerm)
			.order('id')
			if (errorone) throw new Error(errorone.message)
			results = results.concat(dataone)
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

<div class="headerouter" class:fullscreen={expandedMenu}>
	<div class="topcol">
		<div class="trans">
			<a href="/">
				<LogoFMMotif></LogoFMMotif>
				<LogoFM></LogoFM>
			</a>
			<div class="mobileicon" on:click={toggleMenu} on:keydown={blankKey} on:click={closeSearch}>
				<svg width="25" height="28" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14 1H6V4H14V1Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M14.75 1C14.75 0.585786 14.4142 0.25 14 0.25H6C5.58579 0.25 5.25 0.585786 5.25 1V4C5.25 4.41421 5.58579 4.75 6 4.75H14C14.4142 4.75 14.75 4.41421 14.75 4V1ZM13.25 1.75V3.25H6.75V1.75H13.25Z" fill="white"/>
					<path d="M14 8.5H4V11.5H14V8.5Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M14.75 8.5C14.75 8.08579 14.4142 7.75 14 7.75H4C3.58579 7.75 3.25 8.08579 3.25 8.5V11.5C3.25 11.9142 3.58579 12.25 4 12.25H14C14.4142 12.25 14.75 11.9142 14.75 11.5V8.5ZM13.25 9.25V10.75H4.75V9.25H13.25Z" fill="white"/>
					<path d="M14 16H1V19H14V16Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M14.75 16C14.75 15.5858 14.4142 15.25 14 15.25H1C0.585787 15.25 0.25 15.5858 0.25 16V19C0.25 19.4142 0.585787 19.75 1 19.75H14C14.4142 19.75 14.75 19.4142 14.75 19V16ZM13.25 16.75V18.25H1.75V16.75H13.25Z" fill="white"/>
					<path d="M19 3.5C18.4477 3.5 18 3.05228 18 2.5C18 1.94772 18.4477 1.5 19 1.5C19.5523 1.5 20 1.94772 20 2.5C20 3.05228 19.5523 3.5 19 3.5Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M19 2.25C19.1381 2.25 19.25 2.36193 19.25 2.5C19.25 2.63807 19.1381 2.75 19 2.75C18.8619 2.75 18.75 2.63807 18.75 2.5C18.75 2.36193 18.8619 2.25 19 2.25ZM20.75 2.5C20.75 1.5335 19.9665 0.75 19 0.75C18.0335 0.75 17.25 1.5335 17.25 2.5C17.25 3.4665 18.0335 4.25 19 4.25C19.9665 4.25 20.75 3.4665 20.75 2.5Z" fill="white"/>
					<path d="M19 11C18.4477 11 18 10.5523 18 10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10C20 10.5523 19.5523 11 19 11Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M19 9.75C19.1381 9.75 19.25 9.86193 19.25 10C19.25 10.1381 19.1381 10.25 19 10.25C18.8619 10.25 18.75 10.1381 18.75 10C18.75 9.86193 18.8619 9.75 19 9.75ZM20.75 10C20.75 9.0335 19.9665 8.25 19 8.25C18.0335 8.25 17.25 9.0335 17.25 10C17.25 10.9665 18.0335 11.75 19 11.75C19.9665 11.75 20.75 10.9665 20.75 10Z" fill="white"/>
					<path d="M19 18.5C18.4477 18.5 18 18.0523 18 17.5C18 16.9477 18.4477 16.5 19 16.5C19.5523 16.5 20 16.9477 20 17.5C20 18.0523 19.5523 18.5 19 18.5Z" fill="white"/>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M19 17.25C19.1381 17.25 19.25 17.3619 19.25 17.5C19.25 17.6381 19.1381 17.75 19 17.75C18.8619 17.75 18.75 17.6381 18.75 17.5C18.75 17.3619 18.8619 17.25 19 17.25ZM20.75 17.5C20.75 16.5335 19.9665 15.75 19 15.75C18.0335 15.75 17.25 16.5335 17.25 17.5C17.25 18.4665 18.0335 19.25 19 19.25C19.9665 19.25 20.75 18.4665 20.75 17.5Z" fill="white"/>
				</svg>	
			</div>
		</div>
		<div class="openarea" on:mouseleave={toggleThemeItemsOff} on:mouseleave={togglePagesOff}>
			<div class="singletheme"><a href="/mandala">Posts</a></div>
			<div class="singletheme"><a href="/docs">Docs</a></div>
			<div class="singletheme"><a href="/codes">Codes</a></div>
			<div class="singletheme"><a href="/play">GPT Chats</a></div>
			<div class="singletheme"><a href="/images">Images</a></div>
			<div class="singletheme"><a href="/pad">Pad</a></div>
			<div class="singletheme"><a href="/play">Play</a></div>
			<div class="singletheme"><a href="/form">Form</a></div>
		</div>
		<div class="searcherinput">
			<input type="text"
				bind:this={searchinput}
				on:input={(e) => searchStore.set(e.target.value)} 
			/>
			<button class="roundicon" on:click={searchWord}>
				<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="inputwhite" d="M11 21C16.5229 21 21 16.5229 21 11C21 5.47715 16.5229 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5229 5.47715 21 11 21Z" fill="#171717"/>
				<path class="inputwhite" fill-rule="evenodd" clip-rule="evenodd" d="M0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C16.9371 0.25 21.75 5.06294 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C5.06294 21.75 0.25 16.9371 0.25 11ZM11 1.75C5.89136 1.75 1.75 5.89136 1.75 11C1.75 16.1086 5.89136 20.25 11 20.25C16.1086 20.25 20.25 16.1086 20.25 11C20.25 5.89136 16.1086 1.75 11 1.75Z" fill="#171717"/>
				<path class="inputpurple" fill-rule="evenodd" clip-rule="evenodd" d="M6.96967 6.96967C7.26256 6.67678 7.73744 6.67678 8.03033 6.96967L11.5303 10.4697C11.8232 10.7626 11.8232 11.2374 11.5303 11.5303L8.03033 15.0303C7.73744 15.3232 7.26256 15.3232 6.96967 15.0303C6.67678 14.7374 6.67678 14.2626 6.96967 13.9697L9.93934 11L6.96967 8.03033C6.67678 7.73744 6.67678 7.26256 6.96967 6.96967Z" fill="#61339C"/>
				<path class="inputpurple" fill-rule="evenodd" clip-rule="evenodd" d="M11.4697 6.96967C11.7626 6.67678 12.2374 6.67678 12.5303 6.96967L16.0303 10.4697C16.3232 10.7626 16.3232 11.2374 16.0303 11.5303L12.5303 15.0303C12.2374 15.3232 11.7626 15.3232 11.4697 15.0303C11.1768 14.7374 11.1768 14.2626 11.4697 13.9697L14.4393 11L11.4697 8.03033C11.1768 7.73744 11.1768 7.26256 11.4697 6.96967Z" fill="#61339C"/>
				</svg>
			</button>
		</div>
	</div>
{#if loadingStore}
	<div class="sidestream">
		<p>Loading...</p>
	</div>
{/if}
{#if showResults}
	<div class="sidestream" on:click={closeSearch} on:keydown={blankKey}>
		{#if $resultsStore.length>0}
				{#each $resultsStore as item, i}
					{#if item.title && item.title.length > 0}
						<p in:fly={{ duration: 200, delay: i*20, x: 128}}><a href="/notes/{item.counting}">{item.title}</a></p>
					{:else if item.prompt && item.prompt.length > 0}
						<p in:fly={{ duration: 200, delay: i*20, x: 128}}><a href="/play/{item.id}">{item.prompt.slice(0,35)}</a></p>
					{/if}
				{/each}
		{/if}
	</div>
{/if}
</div>
	


<style lang="sass">

.openarea
	display: flex
	flex-direction: row
	align-items: center
	gap: 24px

.singletheme
	border: 1px solid #272727
	border-radius: 4px
	cursor: pointer
	transform-origin: center center
	color: #FFFFFF
	transition: all 0.15s ease
	box-shadow: none
	font-size: 14px
	padding: 4px 8px
	position: relative
	z-index: 1
	&::before
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		content: ''
		z-index: -1
		background-color: hsla(100,90%,5%,1)
		transition: all 0.05s ease
		filter: blur(30px)
		background-image: radial-gradient(at 17% 36%, hsla(148,97%,99%,1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,1) 0px, transparent 50%)
	&:hover
		box-shadow: 4px 6px 12px #010101
		overflow: hidden
		background: #111111
		&::before
			background-color: hsla(100,90%,25%,1)
			filter: blur(15px)

.roundicon
	background: none
	border: none
	outline: none
	cursor: pointer
	display: flex
	flex-direction: row
	align-items: center
	svg
		border: 1px solid #61339C
		border-radius: 50%
		width: 30px
		height: 30px
	&:hover
		.inputpurple
			fill: #10C56D
		svg
			border: 1px solid #10C56D
			border-radius: 50%
	@media screen and (max-width: 1023px)
		svg
			width: 32px
			height: 32px
			.inputwhite
				fill: white

.trans
	display: flex
	flex-direction: row
	align-items: center
	column-gap: 24px
	@media screen and (max-width: 1023px)
		flex-direction: row
		width: 100%
		flex-wrap: wrap
		>a
			width: 80%
		.mobileicon
			width: 15%
			display: flex
			flex-direction: row
			justify-content: flex-end

.trans a
	display: flex
	flex-direction: row
	align-items: center
	@media screen and (max-width: 1023px)
		width: 80%
		padding-left: 16px
		padding-right: 16px
		height: 64px


.sidestream
	display: flex
	flex-direction: column
	backdrop-filter: blur(20px)
	z-index: 900
	height: 100vh
	position: absolute
	top: 56px
	right: 0
	width: 400px
	padding: 48px
	p
		margin: 0 0 5px 0
		padding: 6px
		color: white
		text-transform: capitalize
		text-align: right
		font-size: 14px
		text-shadow: 4px 3px 6px #060606
		color: white
		cursor: pointer
	@media screen and (max-width: 1023px)
		top: 80px
		left: 0
		margin-left: 0
		background: #171717
		width: 100vw

@keyframes backincrease
	0%
		width: 0
	100%
		width: 100%

.searcherinput
	display: flex
	flex-direction: row
	align-items: center
	gap: 8px
	min-width: 280px
	input[type=text]
		border-radius: 4px
		border: 1px solid #474747
		color: white
		height: 32px
		outline: none
		width: 240px
		background: none

.headerouter
	height: 80px
	border-bottom: 1px solid #272727
	width: 100%
	display: flex
	flex-direction: column
	gap: 0
	position: fixed
	top: 0
	backdrop-filter: blur(20px)
	padding-left: 40px
	padding-right: 40px
	transition: 0.34s ease
	z-index: 999
	background-color: hsla(0,2%,5%,0.1)
	background-image: radial-gradient(at 17% 36%, hsla(108,67%,12%,0.3) 0px, transparent 50%), radial-gradient(at 85% 7%, hsla(325,87%,60%,0.2) 0px, transparent 20%)
	@media screen and (max-width: 1023px)
		padding-left: 0px
		padding-right: 0px
		height: 72px

.headerouter.fullscreen
	@media screen and (max-width: 1023px)
		height: 100vh
		.topcol
			height: 100%
			flex-direction: column
			justify-content: space-between
			padding-bottom: 32px
			.searcherinput
				width: 100%
				padding-left: 32px
				input
					width: 80%
					border: 1px solid white
					background: white
					color: black

.topcol
	display: grid
	grid-auto-flow: row
	height: 88px
	position: relative
	transition: 0.24s ease
	&::after
		position: absolute
		bottom: 0
		left: 0
		height: 1px
		width: 0%
		content: ''
		background: #10D56C
		animation: greenstreak 30s ease infinite alternate-reverse
	@media screen and (min-width: 1024px)
		grid-template-rows: auto
		grid-template-columns: 300px 1fr 280px
		grid-template-areas: "trans openarea searcherinput"
		.trans
			grid-area: trans
		.openarea
			grid-area: openarea
		.searcherinput
			grid-area: searcherinput
	@media screen and (max-width: 1023px)
		flex-direction: row
		justify-content: space-between
		align-items: center
		height: 72px


.mobileicon
	cursor: pointer
	svg
		&:hover
			path
				fill: var(--purp)
	@media screen and (min-width: 1024px)
		display: none
	@media screen and (max-width: 1023px)
		padding-right: 16px
		display: flex
		flex-direction: row

</style>