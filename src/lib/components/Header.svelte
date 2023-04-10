<script lang="ts">

	import { onMount } from 'svelte'
	import { scale, fly } from 'svelte/transition'
	import { quintIn, quintOut } from 'svelte/easing' 
	import { page } from '$app/stores'
	import supabase from '$lib/utils/supabase'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import MandalaIcon from '$lib/components/MandalaIcon.svelte'
	import MandalaIcon2 from '$lib/components/MandalaIcon.svelte'
	let inputter:any

	async function searcher(inputter:any){
		const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.textSearch('fts',inputter)
		if (error) throw new Error(error.message)
		searchresults = data
	}

	let y:number
	let isInvisible:boolean = false
	let height:number
	let thewidth:number
	let latestScrollY:number
	let leftball:boolean = false
	let topball:boolean = false
	let botball:boolean = false
	let rightball:boolean = false
	let expandedMenu:boolean
	let fake:boolean = false
	let url:any
	let shouldbeshown:boolean = true
	let clicksearch:boolean = false
	let searchresults:any
	let makesdisappear:boolean
	let slidingleft:boolean = false
	let slidingright:boolean = false
	

	function toggleSearch(){
		clicksearch = !clicksearch
	}

	function fakefaux(){
		fake = !fake
	}

	function toggleMenu(){
		if ( thewidth <= 1023 ) {
			expandedMenu = !expandedMenu
		} else {
			expandedMenu = true
		}
	}

	function toggleleft(){
		leftball = !leftball
	}
	
	function toggleUp(){
		topball = !topball
	}

	function toggleBot(){
		botball = !botball
	}

	function toggleLast(){
		rightball = !rightball
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


	$: if (clicksearch === true) {
		(async() => {
			searchresults = await searcher(inputter)
		})()
	}

	$: if ( thewidth <= 1023 ) {
		makesdisappear = true
	} else {
		makesdisappear = false
	}

	function toggleLefter(){
		slidingleft = !slidingleft
	}

	function togglerighter(){
		slidingright = !slidingright
	}


	onMount(() => {
		height = document.body.scrollHeight
		url = $page.url.pathname
		if ( thewidth <= 1023 ) {
		expandedMenu = false
		} else {
			expandedMenu = true
		}
	})

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={thewidth}/>

<div class="headerouter" class:hiddenheader={isInvisible}>
	<div class="topcol" on:click={toggleMenu} on:keydown={fakefaux}>
			<LogoFM></LogoFM>
	</div>
	<div class="botcol">
		<div class="lefticon" on:mouseenter={toggleLefter} on:mouseleave={toggleLefter} class:slideright={slidingright}>
			<a href="/" target="_self" style="transform: rotate({y/4}deg)">
				<MandalaIcon></MandalaIcon>
			</a>
			{#if slidingleft}
			<div style="flex-direction: row; display: flex">
				<div class="separated1">f</div>
				<div class="separated2" style="margin-left: 2px">r</div>
				<div class="separated3" style="margin-left: 4px">a</div>
				<div class="separated4" style="margin-left: 6px">c</div>
				<div class="separated5" style="margin-left: 8px">t</div>
				<div class="separated6" style="margin-left: 10px">a</div>
				<div class="separated7" style="margin-left: 12px">l</div>
				<div class="separated8" style="margin-left: 14px">s</div>
			</div>
			{/if}
		</div>
		<div class="midlinks" class:slideleft={slidingleft} class:slideright={slidingright}>
			<div class="leftballs">
			<a href="/pad" on:mouseenter={toggleleft} on:mouseleave={toggleleft}>
				<div id="ibl">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateX({-y/8}px) rotate({y/2}deg)">
							<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M1.19249e-07 10C1.52179e-07 12.7615 1.11935 15.2615 2.9289 17.0711C4.73855 18.8807 7.23855 20 10 20C12.7614 20 15.2614 18.8807 17.0711 17.0711C18.8807 15.2615 20 12.7615 20 10C20 7.2386 18.8807 4.7386 17.0711 2.92894C15.2614 1.11929 12.7614 8.63194e-08 10 1.19249e-07C7.23855 1.52179e-07 4.73855 1.11929 2.9289 2.92894C1.11935 4.7386 8.63194e-08 7.2386 1.19249e-07 10Z" fill="#272727"/>
							<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M5.58057 4.51991C5.87347 4.8128 5.87348 5.28767 5.58059 5.58057C4.44877 6.71243 3.75 8.27391 3.75 10C3.75 11.7261 4.44877 13.2876 5.58059 14.4194C5.87348 14.7123 5.87347 15.1872 5.58057 15.4801C5.28767 15.773 4.8128 15.773 4.51991 15.4801C3.11833 14.0784 2.25 12.1399 2.25 10C2.25 7.86009 3.11832 5.92157 4.51991 4.51993C4.8128 4.22703 5.28767 4.22702 5.58057 4.51991Z" fill="#10D56C"/>
						</svg>
				</div>
			</a>
			<a href="/notes" on:mouseenter={toggleUp} on:mouseleave={toggleUp}> 
				<div id="ibu">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateX({-y/15}px) rotate({-y/2}deg)">
					<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M10 8.74228e-07C7.23855 1.11564e-06 4.73855 1.11935 2.9289 2.9289C1.11935 4.73855 -1.11564e-06 7.23855 -8.74228e-07 10C-6.32819e-07 12.7614 1.11935 15.2614 2.9289 17.0711C4.73855 18.8807 7.23855 20 10 20C12.7614 20 15.2614 18.8807 17.0711 17.0711C18.8807 15.2614 20 12.7614 20 10C20 7.23855 18.8807 4.73855 17.0711 2.9289C15.2614 1.11935 12.7614 6.32819e-07 10 8.74228e-07Z" fill="#272727"/>
					<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M15.4801 5.58057C15.1872 5.87347 14.7123 5.87348 14.4194 5.58059C13.2876 4.44877 11.7261 3.75 10 3.75C8.27391 3.75 6.71243 4.44877 5.58057 5.58059C5.28767 5.87348 4.81279 5.87347 4.51991 5.58057C4.22702 5.28767 4.22703 4.8128 4.51993 4.51991C5.92157 3.11833 7.86009 2.25 10 2.25C12.1399 2.25 14.0784 3.11833 15.4801 4.51991C15.773 4.8128 15.773 5.28767 15.4801 5.58057Z" fill="#10D56C"/>
				</svg>
				</div>
			</a>
			</div>
				{#if expandedMenu}
					<div class="istherealslot" in:fly={{ duration: 800, x: 0, y: -800, easing: quintOut}} out:fly={{ duration: 600, x: 0, y: -800, easing: quintIn}} on:click={toggleMenu} on:keydown={fakefaux}>
					<slot></slot>
				</div>
			{/if}
			<div class="rightballs">
				<a href="/docs" on:mouseenter={toggleBot} on:mouseleave={toggleBot}>
					<div id="ibr">
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateX({y/15}px) rotate({y/2}deg)">
						<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C12.7615 20 15.2615 18.8807 17.0711 17.0711C18.8807 15.2615 20 12.7615 20 10C20 7.2386 18.8807 4.7386 17.0711 2.92894C15.2615 1.11929 12.7615 0 10 0C7.2386 0 4.7386 1.11929 2.92894 2.92894C1.11929 4.7386 0 7.2386 0 10C0 12.7615 1.11929 15.2615 2.92894 17.0711C4.7386 18.8807 7.2386 20 10 20Z" fill="#272727"/>
						<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M4.51991 14.4194C4.8128 14.1265 5.28767 14.1265 5.58057 14.4194C6.71243 15.5512 8.27391 16.25 10 16.25C11.7261 16.25 13.2876 15.5512 14.4194 14.4194C14.7123 14.1265 15.1872 14.1265 15.4801 14.4194C15.773 14.7123 15.773 15.1872 15.4801 15.4801C14.0784 16.8817 12.1399 17.75 10 17.75C7.86009 17.75 5.92157 16.8817 4.51993 15.4801C4.22703 15.1872 4.22702 14.7123 4.51991 14.4194Z" fill="#10D56C"/>
						</svg>
					</div>
				</a>
			<div id="ibd" on:mouseenter={toggleLast} on:mouseleave={toggleLast} on:click={toggleSearch} on:keydown={fakefaux}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: translateX({y/8}px) rotate({-y/2}deg)">
					<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 7.23855 18.8806 4.73855 17.0711 2.9289C15.2614 1.11935 12.7614 -5.57821e-07 10 -4.37114e-07C7.2386 -3.16409e-07 4.7386 1.11935 2.92893 2.9289C1.11929 4.73855 -5.57821e-07 7.23855 -4.37114e-07 10C-3.16409e-07 12.7614 1.11929 15.2614 2.92893 17.0711C4.7386 18.8807 7.2386 20 10 20C12.7615 20 15.2615 18.8807 17.0711 17.0711C18.8807 15.2614 20 12.7614 20 10Z" fill="#272727"/>
					<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M14.4194 15.4801C14.1265 15.1872 14.1265 14.7123 14.4194 14.4194C15.5512 13.2876 16.25 11.7261 16.25 10C16.25 8.27391 15.5512 6.71243 14.4194 5.58057C14.1265 5.28767 14.1265 4.8128 14.4194 4.51991C14.7123 4.22702 15.1872 4.22703 15.4801 4.51993C16.8817 5.92157 17.75 7.86009 17.75 10C17.75 12.1399 16.8817 14.0784 15.4801 15.4801C15.1872 15.773 14.7123 15.773 14.4194 15.4801Z" fill="#10D56C"/>
				</svg>
		</div>
			{#if clicksearch}
				<div class="searchinputarea" in:fly={{ duration: 400, y: -48, x: 0}} out:fly={{ duration: 200}}>
					<input type="text" bind:value={inputter}/>
					<button class="searchbutton" on:click={() => searcher(inputter)}>GO</button>
				</div>
			{/if}
		</div>
		</div>
		<div class="righticon" class:slideleft={slidingleft} on:mouseenter={togglerighter} on:mouseleave={togglerighter}>
			{#if slidingright}
			<div style="flex-direction: row; display: flex" id="righttexters">
				<div class="separated7" style="margin-right: 12px">m</div>
				<div class="separated6" style="margin-right: 10px">a</div>
				<div class="separated5" style="margin-right: 8px">ṇ</div>
				<div class="separated4" style="margin-right: 6px">ḍ</div>
				<div class="separated3" style="margin-right: 4px">a</div>
				<div class="separated2" style="margin-right: 2px">l</div>
				<div class="separated1">a</div>
			</div>
			{/if}
			<a href="/mandala" target="_self" style="transform: rotate({-y/4}deg)">
				<MandalaIcon2></MandalaIcon2>
			</a>
		</div>
			{#if clicksearch}
			{#if searchresults && searchresults.length > 0}
			<div class="positioning" in:fly={{ duration: 250, y: -200, x: 0}} out:fly={{ duration: 250, y: -200, x: 0}} on:click={toggleSearch} on:keydown={fakefaux}>
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
	<div class="optionalslot">
		<slot name="option"></slot>
	</div>
</div>


<style lang="sass">

#righttexters
	color: white

.midlinks.slideleft
	animation: slowingleft 4s ease forwards

.righticon.slideleft
	animation: slowingleft 4s ease forwards

.midlinks.slideright
	animation: slowingright 4s ease forwards

.lefticon.slideright
	animation: slowingright 4s ease forwards

@keyframes slowingleft
	0%
		transform: translateX(0px)
		opacity: 1
	50%
		transform: translateX(-64px)
		opacity: 0
	100%
		transform: translateX(0px)
		opacity: 1

@keyframes slowingright
	0%
		transform: translateX(0px)
		opacity: 1
	50%
		transform: translateX(64px)
		opacity: 0
	100%
		transform: translateX(0px)
		opacity: 1

.righticon
	div
		color: white
	&:hover
		.separated1
			animation: flashes 0.1s ease forwards, eighttogreen 0.2s ease 0.7s forwards
		.separated2
			animation: flashes 0.1s ease 0.1s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated3
			animation: flashes 0.1s ease 0.2s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated4
			animation: flashes 0.1s ease 0.3s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated5
			animation: flashes 0.1s ease 0.4s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated6
			animation: flashes 0.1s ease 0.5s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated7
			animation: flashes 0.1s ease 0.6s forwards,  eighttogreen 0.2s ease 0.7s forwards

.lefticon
	div
		color: white
	&:hover
		.separated1
			animation: flashes 0.1s ease forwards, eighttogreen 0.2s ease 0.7s forwards
		.separated2
			animation: flashes 0.1s ease 0.1s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated3
			animation: flashes 0.1s ease 0.2s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated4
			animation: flashes 0.1s ease 0.3s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated5
			animation: flashes 0.1s ease 0.4s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated6
			animation: flashes 0.1s ease 0.5s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated7
			animation: flashes 0.1s ease 0.6s forwards,  eighttogreen 0.2s ease 0.7s forwards
		.separated8
			animation: flashes 0.1s ease 0.7s forwards,  eighttogreen 0.2s ease 0.7s forwards

.separated1, .separated2, .separated3, .separated4, .separated5, .separated6, .separated7, .separated8
	opacity: 0

.lefticon a
	margin-right: 16px

.righticon a
	margin-left: 16px

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

.searchinputarea
	input
		border: 1px solid #272727
	.searchbutton
		font-weight: bold
		text-transform: uppercase
		font-size: 12px
		color: white
		background: #10D56C
		border: 1px solid #10D56C
	@media screen and (max-width: 1023px)
		position: absolute
		display: flex
		flex-direction: row
		top: 56px
		left: 0
		width: 100%
		height: 56px
		justify-content: center
		column-gap: 16px
		input
			width: 75%
			height: 24px
		.searchbutton
			width: 20%
			height: 24px

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

.leftballs a
	height: 20px

#ibl, #ibu, #ibr, #ibd
	height: 20px
	cursor: pointer


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
	background-color: hsla(0,2%,2%,1)
	background-image: radial-gradient(at 80% 80%, hsla(101,3%,2%,1) 0px, transparent 5%), radial-gradient(at 40% 100%, hsla(126,75%,7%,1) 0px, transparent 50%)
	padding-left: 40px
	padding-right: 40px
	transition: 0.34s ease
	z-index: 999
	@media screen and (max-width: 1023px)
		padding-left: 16px
		padding-right: 16px

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

.botcol
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center
	height: 56px

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


.istherealslot
	display: flex
	transition: 0.3s ease
	@media screen and (min-width: 1024px)
		flex-direction: row
		display: flex
	@media screen and (max-width: 1023px)
		flex-direction: column
		position: absolute
		top: 56px
		left: 0
		width: 100%
		background-color: hsla(0,2%,2%,1)
		background-image: radial-gradient(at 80% 80%, hsla(101,3%,2%,1) 0px, transparent 50%), radial-gradient(at 40% 0%, hsla(126,75%,7%,1) 0px, transparent 50%)
		height: calc(100vh - 56px)
		text-align: center
		padding-top: 32px

.botcol
	position: relative



</style>