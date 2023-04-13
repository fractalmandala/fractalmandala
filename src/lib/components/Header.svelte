<script lang="ts">

	import { onMount } from 'svelte'
	import { get, writable } from 'svelte/store'
	import supabase from '$lib/utils/supabase'
	import StandardSidebar from '$lib/components/StandardSidebar.svelte'
	const searchStore = writable('')
	let searchinput
	const resultsStore = writable([])
	let showResults = false
	let loadingStore = false;
	import { fly } from 'svelte/transition'
	import { elasticOut, backIn, backOut } from 'svelte/easing' 
	import { page } from '$app/stores'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import MandalaIcon from '$lib/components/MandalaIcon.svelte'
	import MandalaIcon2 from '$lib/components/MandalaIcon.svelte'
	let bringFinder:boolean = false

	let y:number
	let isInvisible:boolean = false
	let height:number
	let thewidth:number
	let latestScrollY:number
	let fake:boolean = false
	let url:any
	let shouldbeshown:boolean = true
	let clicksearch:boolean = false
	let searchresults:any
	let makesdisappear:boolean
	let pagescrolled:number

	function toggleSearcher(){
		bringFinder = !bringFinder
	}
	
	function closeSearch(){
		if ( showResults === true ) {
			showResults = false
		}
	}

	function fakefaux(){
		fake = !fake
	}

$: {
  if (url === '/pad' || url === '/notes') {
    shouldbeshown = false;
  } else {
    shouldbeshown = true;
  }
}

	$: {
		if ( y > 100 && y > latestScrollY ) {
			isInvisible = true
		} else {
			isInvisible = false
		}

		latestScrollY = y
	}


	$: if ( thewidth <= 1023 ) {
		makesdisappear = true
	} else {
		makesdisappear = false
	}

	$: pagescrolled = (y/height) * 1.2

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
	// @ts-ignore
	resultsStore.set(data)
	loadingStore = false
	input.value = ''
}
	

	onMount(async() => {
		height = document.body.scrollHeight
		url = $page.url.pathname
	})

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={thewidth}/>

<div class="headerouter" class:hiddenheader={isInvisible}>
	<div class="topcol">
		<div class="trans" in:fly={{ duration: 900, delay: 200, x: 0, y: 64, easing: elasticOut}} out:fly={{ duration: 200, x: 0, y: -64, easing: elasticOut}}>
			<a href="/">
				<LogoFM></LogoFM>
			</a>
		</div>
	</div>
	<div class="botcol">
		<div>
		{#if bringFinder}
		<div class="searcherinput" in:fly={{ duration: 900, delay: 200, x: 0, y: 64, easing: elasticOut}} out:fly={{ duration: 200, x: 0, y: -64, easing: elasticOut}}>
			<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={toggleSearcher} on:keydown={fakefaux}>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C16.9371 0.25 21.75 5.06294 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C5.06294 21.75 0.25 16.9371 0.25 11ZM11 1.75C5.89136 1.75 1.75 5.89136 1.75 11C1.75 16.1086 5.89136 20.25 11 20.25C16.1086 20.25 20.25 16.1086 20.25 11C20.25 5.89136 16.1086 1.75 11 1.75Z" fill="#474747"/>
				<path d="M11 21C16.5229 21 21 16.5229 21 11C21 5.47715 16.5229 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5229 5.47715 21 11 21Z" fill="#474747"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 11C0.25 5.06294 5.06294 0.25 11 0.25C16.9371 0.25 21.75 5.06294 21.75 11C21.75 16.9371 16.9371 21.75 11 21.75C5.06294 21.75 0.25 16.9371 0.25 11ZM11 1.75C5.89136 1.75 1.75 5.89136 1.75 11C1.75 16.1086 5.89136 20.25 11 20.25C16.1086 20.25 20.25 16.1086 20.25 11C20.25 5.89136 16.1086 1.75 11 1.75Z" fill="#474747"/>
				<path id="greenpath" fill-rule="evenodd" clip-rule="evenodd" d="M10.4697 7.46967C10.7626 7.17678 11.2374 7.17678 11.5303 7.46967L16.0303 11.9697C16.3232 12.2626 16.3232 12.7374 16.0303 13.0303C15.7374 13.3232 15.2626 13.3232 14.9697 13.0303L11 9.0607L7.03033 13.0303C6.73744 13.3232 6.26256 13.3232 5.96967 13.0303C5.67678 12.7374 5.67678 12.2626 5.96967 11.9697L10.4697 7.46967Z" fill="#FFFBFF"/>
			</svg>
			<input type="text"
				bind:this={searchinput}
				on:input={(e) => searchStore.set(e.target.value)} 
			/>
			<button class="glowing" on:click={searchWord}>FIND</button>
		</div>
		{:else}
		<div class="lefticon" style="transform: rotate({y/4}deg)" on:click={toggleSearcher} on:keydown={fakefaux}>
			<MandalaIcon></MandalaIcon>
		</div>
		{/if}
		</div>
		{#if !bringFinder}
		<div class="midlinks" in:fly={{ duration: 400, delay: 0, y: 0, x: 128, easing: backIn}} out:fly={{ duration: 500, delay: 0, y: 0, x: 128, easing: backOut}}>
			<div class="leftballs">
				<div id="ibl">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateX({-y/12}px) rotate({y/2}deg); overflow: hidden">
							<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M1.19249e-07 10C1.52179e-07 12.7615 1.11935 15.2615 2.9289 17.0711C4.73855 18.8807 7.23855 20 10 20C12.7614 20 15.2614 18.8807 17.0711 17.0711C18.8807 15.2615 20 12.7615 20 10C20 7.2386 18.8807 4.7386 17.0711 2.92894C15.2614 1.11929 12.7614 8.63194e-08 10 1.19249e-07C7.23855 1.52179e-07 4.73855 1.11929 2.9289 2.92894C1.11935 4.7386 8.63194e-08 7.2386 1.19249e-07 10Z" fill="#272727"/>
							<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M5.58057 4.51991C5.87347 4.8128 5.87348 5.28767 5.58059 5.58057C4.44877 6.71243 3.75 8.27391 3.75 10C3.75 11.7261 4.44877 13.2876 5.58059 14.4194C5.87348 14.7123 5.87347 15.1872 5.58057 15.4801C5.28767 15.773 4.8128 15.773 4.51991 15.4801C3.11833 14.0784 2.25 12.1399 2.25 10C2.25 7.86009 3.11832 5.92157 4.51991 4.51993C4.8128 4.22703 5.28767 4.22702 5.58057 4.51991Z" fill="#10D56C"/>
						</svg>
				</div>
				<div id="ibu">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateX({-y/18}px) rotate({-y/2}deg)">
					<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M10 8.74228e-07C7.23855 1.11564e-06 4.73855 1.11935 2.9289 2.9289C1.11935 4.73855 -1.11564e-06 7.23855 -8.74228e-07 10C-6.32819e-07 12.7614 1.11935 15.2614 2.9289 17.0711C4.73855 18.8807 7.23855 20 10 20C12.7614 20 15.2614 18.8807 17.0711 17.0711C18.8807 15.2614 20 12.7614 20 10C20 7.23855 18.8807 4.73855 17.0711 2.9289C15.2614 1.11935 12.7614 6.32819e-07 10 8.74228e-07Z" fill="#272727"/>
					<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M15.4801 5.58057C15.1872 5.87347 14.7123 5.87348 14.4194 5.58059C13.2876 4.44877 11.7261 3.75 10 3.75C8.27391 3.75 6.71243 4.44877 5.58057 5.58059C5.28767 5.87348 4.81279 5.87347 4.51991 5.58057C4.22702 5.28767 4.22703 4.8128 4.51993 4.51991C5.92157 3.11833 7.86009 2.25 10 2.25C12.1399 2.25 14.0784 3.11833 15.4801 4.51991C15.773 4.8128 15.773 5.28767 15.4801 5.58057Z" fill="#10D56C"/>
					</svg>
				</div>
			</div>
			<div class="rightballs">
					<div id="ibr">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateX({y/18}px) rotate({y/2}deg)">
						<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C12.7615 20 15.2615 18.8807 17.0711 17.0711C18.8807 15.2615 20 12.7615 20 10C20 7.2386 18.8807 4.7386 17.0711 2.92894C15.2615 1.11929 12.7615 0 10 0C7.2386 0 4.7386 1.11929 2.92894 2.92894C1.11929 4.7386 0 7.2386 0 10C0 12.7615 1.11929 15.2615 2.92894 17.0711C4.7386 18.8807 7.2386 20 10 20Z" fill="#272727"/>
						<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M4.51991 14.4194C4.8128 14.1265 5.28767 14.1265 5.58057 14.4194C6.71243 15.5512 8.27391 16.25 10 16.25C11.7261 16.25 13.2876 15.5512 14.4194 14.4194C14.7123 14.1265 15.1872 14.1265 15.4801 14.4194C15.773 14.7123 15.773 15.1872 15.4801 15.4801C14.0784 16.8817 12.1399 17.75 10 17.75C7.86009 17.75 5.92157 16.8817 4.51993 15.4801C4.22703 15.1872 4.22702 14.7123 4.51991 14.4194Z" fill="#10D56C"/>
						</svg>
					</div>
				<div id="ibd">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateX({y/12}px) rotate({-y/2}deg)">
					<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 7.23855 18.8806 4.73855 17.0711 2.9289C15.2614 1.11935 12.7614 -5.57821e-07 10 -4.37114e-07C7.2386 -3.16409e-07 4.7386 1.11935 2.92893 2.9289C1.11929 4.73855 -5.57821e-07 7.23855 -4.37114e-07 10C-3.16409e-07 12.7614 1.11929 15.2614 2.92893 17.0711C4.7386 18.8807 7.2386 20 10 20C12.7615 20 15.2615 18.8807 17.0711 17.0711C18.8807 15.2614 20 12.7614 20 10Z" fill="#272727"/>
					<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M14.4194 15.4801C14.1265 15.1872 14.1265 14.7123 14.4194 14.4194C15.5512 13.2876 16.25 11.7261 16.25 10C16.25 8.27391 15.5512 6.71243 14.4194 5.58057C14.1265 5.28767 14.1265 4.8128 14.4194 4.51991C14.7123 4.22702 15.1872 4.22703 15.4801 4.51993C16.8817 5.92157 17.75 7.86009 17.75 10C17.75 12.1399 16.8817 14.0784 15.4801 15.4801C15.1872 15.773 14.7123 15.773 14.4194 15.4801Z" fill="#10D56C"/>
					</svg>
				</div>
			</div>
		</div>
		{/if}
		<div class="righticon">
			<a href="/pad" style="transform: rotate({-y/4}deg)">
				<MandalaIcon2></MandalaIcon2>
			</a>
		</div>
			{#if clicksearch}
			{#if searchresults && searchresults.length > 0}
			<div class="positioning" in:fly={{ duration: 250, y: -200, x: 0}} out:fly={{ duration: 250, y: -200, x: 0}} on:keydown={fakefaux}>
				{#each searchresults as item}
					<p>
						<a href="/notes/{item.id}">
							{item.title}
						</a>
					</p>
				{/each}
			</div>
			{/if}
			{/if}
	</div>
	{#if loadingStore}
		<p>Loading...</p>
			{/if}
			{#if showResults}
				{#if $resultsStore.length>0}
				<div class="resultstray" on:click={closeSearch} on:keydown={fakefaux}>
					{#each $resultsStore as item, i}
						<p in:fly={{ duration: 200, delay: i*100, x: 128}}><a href="/notes/{item.counting}">{item.title}</a></p>
					{/each}
			</div>
		{/if}
	{/if}
</div>


<style lang="sass">


.searcherinput svg
	&:hover
		path
			fill: #FFFFFF
		#greenpath
			fill: #10C56D


.resultstray
	display: flex
	flex-direction: column
	background: #171717
	z-index: 999
	height: 100vh
	position: absolute
	top: 0
	left: 0
	width: 100%
	height: 100vh
	padding: 32px
	p
		margin: 0 0 8px 0
		padding: 0
		color: white
		text-transform: uppercase
		text-align: center
		font-size: 20px
		&:hover
			color: #10C56D	
	@media screen and (min-width: 1024px)
		align-items: center
		row-gap: 4px
		padding-top: 120px

.searcherinput
	display: flex
	flex-direction: row
	gap: 16px

@keyframes eighttogreen
	0%
		color: white
	100%
		color: #10D56C

@keyframes flashes
	0%
		opacity: 0
	100%
		opacity: 1

	

.positioning
	background: #171717
	z-index: 999
	display: flex
	flex-direction: column
	position: absolute
	top: 56px
	right: 0
	min-width: 520px
	border: 1px solid #272727
	padding: 16px
	p
		margin: 0
		font-size: 16px
		color: #575757
		text-align: right
		text-transform: capitalize
		&:hover
			color: #10D56C

#ibl svg, #ibu svg, #ibr svg, #ibd svg
	object-fit: contain
	height: 20px
	width: 20px
	transform-origin: center center
	path
		transition: var(--snap)

.leftballs, .rightballs
	display: flex
	flex-direction: row
	align-items: center
	gap: 16px
	@media screen and (max-width: 1023px)
		gap: 40px


#ibl, #ibu, #ibr, #ibd
	height: 20px
	cursor: pointer

#ibl
	svg
		position: relative
		&::after
			position: absolute
			top: 0
			left: 0
			content: ''
			height: 100%
			width: 100%
			background: red


#ibl, #ibu, #ibr, #ibd
	&:hover
		animation: outermove 0.5s ease forwards
		svg
			animation: justshrinks 0.5s ease forwards
		.gogreen
			animation: goesgreen 0.5s ease forwards
		.gogrey
			animation: goesgrey 0.5s ease forwards

@keyframes goesgreen
	0%
		fill: #272727
	100%
		fill: #ffffff

@keyframes goesgrey
	0%
		fill: #ffffff
	100%
		fill: #272727

@keyframes justshrinks
	0%
		transform: scale(1.0)
	100%
		transform: scale(0.4)

.headerouter
	height: 112px
	border-bottom: 1px solid #272727
	width: 100%
	display: flex
	flex-direction: column
	gap: 0
	position: fixed
	top: 0
	backdrop-filter: blur(10px)
	padding-left: 40px
	padding-right: 40px
	transition: 0.34s ease
	z-index: 999
	overflow-y: hidden
	@media screen and (max-width: 1023px)
		padding-left: 16px
		padding-right: 16px
		height: 56px

.hiddenheader
	transform: translateY(-56px)

.topcol
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	height: 56px
	border-bottom: 1px solid #212121
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
	@media screen and (max-width: 1023px)
		flex-direction: row
		justify-content: space-between
		align-items: center


.botcol
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center
	height: 56px
	@media screen and (max-width: 1023px)
		display: none

.lefticon, .righticon
	display: flex
	flex-direction: row
	align-items: center
	height: 100%
	@media screen and (max-width: 1023px)
		height: 100%

@keyframes greenstreak
	0%
		width: 0
	30%
		width: 6px
		margin-left: 48%
	50%
		width: 3px
		margin-left: 70%
	100%
		width: 5px
		margin-left: calc(100% - 5px)

.midlinks
	display: flex
	overflow: visible
	@media screen and (min-width: 1024px)
		flex-direction: row
		gap: 12px
		align-items: center
		justify-content: center
	@media screen and (max-width: 1023px)
		flex-direction: row
		gap: 40px


.botcol
	position: relative



</style>