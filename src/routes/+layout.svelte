<script lang="ts">

	import { onMount, afterUpdate } from 'svelte'
	import { invalidate } from '$app/navigation'
	import visibilityMode from '$lib/stores/visibility'	
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	import type { LayoutData } from './$types'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Lenis from '@studio-freight/lenis'
	import { page } from '$app/stores'
	import '$lib/styles/themes.sass'
	import '$lib/styles/prism.css'

	let y:number
	let mobileView:boolean = false
	let mobileViewEnable:boolean = true
	let screenWidth:number
	let startsearch:boolean = false
	let appearance:number = 50
	let linksonmobile:boolean = true
	let pageurl:any	
	let isHover:any
	let pageurlcut:any
	let dropMenu = Array(10).fill(false)

	let showrest:boolean = true
	let fake = false
	let essayCheck:boolean

	function fauxfake(){
		fake = !fake
	}

	function toggleMenuDrop(index:number){
		dropMenu[index] = !dropMenu[index]
		for ( let i = 0; i < dropMenu.length; i ++ ) {
			if ( i !== index && dropMenu[i] === true ) {
				dropMenu[i] = false
			}
		}
	}


	$: if ( screenWidth <= 1023 ) {
		mobileView = true
		mobileViewEnable = false
	} else {
		mobileView = false
		mobileViewEnable = true
	}

	$: if ( y <= 20 ) {
		appearance = 50
	} else {
		appearance = y
	}

	$: if ( screenWidth <= 1023 ) {
		showrest = !startsearch
		linksonmobile = true
	} else {
		showrest = true
		linksonmobile = false
	}

	$: ({ supabase, session } = data)

	onMount(async() => {
		pageurl = $page.url.pathname
		isHover = pageurl
		pageurlcut = pageurl.substr(0,8)
		const lenis = new Lenis({
			duration: 1.2,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			wheelMultiplier: 0.8,
			smoothWheel: true,
			touchMultiplier: 1,
			infinite: false,
		})
		function raf(time: any){
		lenis.raf(time)
		requestAnimationFrame(raf)
		}
		requestAnimationFrame(raf)	
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})
		return () => data.subscription.unsubscribe()
		})


	export let data: LayoutData

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={screenWidth}/>

<svelte:head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1JFGGCTBC9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1JFGGCTBC9');
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Spline+Sans+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>





<Header>
</Header>
<div id="appcontainer" class="rta-grid grid3" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<div class="rta-column leftone">
		<div class="rta-column leftcontainer">
			<div class="rta-column dropsection">
			<p class="tt-u"><b><a href="/essays">All Essays</a></b></p>
			</div>
			<div class="rta-column dropsection">
			<p class="tt-u"><b><a href="/gallery">Gallery</a></b></p>
			</div>
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(1)} on:keydown={fauxfake}>
			<div class="rta-row ycenter between">
				<p class="tt-u" class:opened={dropMenu[1]}><b>Web Dev</b></p>
				<div class="iconchev" class:rotated={dropMenu[1]}>
					<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
					</svg>
				</div>
			</div>
			{#if dropMenu[1]}
			<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}}>
				<p><a href="/themes/webdev/sveltekit">Sveltekit</a></p>
				<p><a href="/themes/webdev/supabase">Supabase</a></p>
				<p><a href="/themes/webdev/javascript">Javascript/TS</a></p>
				<p><a href="/themes/webdev/general">General</a></p>
			</div>
			{/if}
			</div>
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(2)} on:keydown={fauxfake}>
			<div class="rta-row ycenter between">
				<p class="tt-u" class:opened={dropMenu[2]}><b>Design</b></p>
				<div class="iconchev" class:rotated={dropMenu[2]}>
					<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
					</svg>
				</div>
			</div>		
			{#if dropMenu[2]}
			<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}}>
				<p><a href="/themes/design">How it Started</a></p>
				<p>Rainmeter</p>
				<p>Maps</p>
				<p><a href="/themes/design/components">Components Library</a></p>
			</div>
			{/if}	
			</div>
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(3)} on:keydown={fauxfake}>
			<div class="rta-row ycenter between">
				<p class="tt-u" class:opened={dropMenu[3]}><b>Site Links</b></p>
				<div class="iconchev" class:rotated={dropMenu[3]}>
					<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
					</svg>
				</div>
			</div>		
			{#if dropMenu[3]}
			<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}}>
				<p><a href="/gpt">GPT</a></p>
				<p><a href="/play">Play</a></p>
			</div>
			{/if}	
			</div>
		</div>
	</div>
	<div class="rta-column midone">
		<slot></slot>
	</div>
</div>
<Footer></Footer>

<style lang="sass">

.grid3
	@media screen and (min-width: 1024px)
		grid-template-areas: "leftone midone"
		grid-template-columns: 280px 1fr
		.leftone
			border-right: 1px solid var(--borderline)
			padding-top: 128px
			padding-left: 24px
			padding-right: 24px
			.leftcontainer
				height: max-content
				position: sticky
				top: 128px
		.midone
			padding-left: 4vw
			padding-top: 128px
			padding-right: 24px

#appcontainer
	background: var(--background)
	box-sizing: border-box
	margin: 0
	padding: 0
	min-height: calc(100vh - 80px)

.dropsection
	border-bottom: 1px solid var(--borderline)
	padding-top: 12px
	padding-bottom: 12px
	cursor: pointer
	.tt-u
		margin: 0
		&:hover
			color: var(--green)

.iconchev
	transition: 0.15s
	svg path
		fill: var(--textone)

.iconchev.rotated
	transform: rotate(180deg)
	svg path
		fill: var(--opposite)

.dropsection
	&:hover
		.iconchev
			svg path
				fill: var(--green)

.tt-u.opened
	color: var(--opposite)

.insidedrop p
	cursor: pointer
	&:hover
		color: var(--green)


</style>


