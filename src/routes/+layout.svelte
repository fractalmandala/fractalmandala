<script lang="ts">

	import { onMount } from 'svelte'
	import visibilityMode from '$lib/stores/visibility'
	import TransitionPage from '$lib/components/TransitionPage.svelte'
	import MobileIcon from '$lib/components/MobileIcon.svelte'
	import Searcher from '$lib/components/SearchComponent.svelte'
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Lenis from '@studio-freight/lenis'
	import '$lib/styles/themes.sass'
	import '$lib/styles/prism.css'

	let y:number
	let isKnowing = false
	let screenWidth:number
	let breakPoint:boolean
	let appearance:number = 50
	let dropMenu = Array(10).fill(false)
	let fake = false
	let expandMobilemenu = false

	function toggleKnowing(){
		isKnowing = !isKnowing
	}

	function toggleMobilemenu(){
		if ( breakPoint === true ) {
			expandMobilemenu = !expandMobilemenu
		} else {
			fake = !fake
		}
	}

	inject({ mode: dev ? 'development' : 'production' });

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

	$: if ( screenWidth <= 768 ) {
		breakPoint = true
	} else {
		breakPoint = false
	}

	$: if ( y <= 20 ) {
		appearance = 50
	} else {
		appearance = y
	}

	onMount(async() => {
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
	})

	export let data

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
	<div class="mobileicon" slot="mobileicon" on:click={toggleMobilemenu} on:keydown={fauxfake}>
		<MobileIcon></MobileIcon>
	</div>
</Header>

<div id="appcontainer" class="rta-grid grid3" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<div class="rta-column leftone" class:opened={expandMobilemenu} transition:slide={{ duration: 300, easing: circOut}} data-lenis-prevent>
		<div class="rta-column leftcontainer">
			<div class="rta-column searcher" data-lenis-prevent>
				<Searcher/>
			</div>
			{#if !dropMenu[7]}
			<div class="rta-column" transition:slide={{ duration: 340, easing: circOut}}>
			<div class="rta-column dropsection m-top-16" on:click={() => toggleMenuDrop(4)} on:keydown={fauxfake}>
				<div class="rta-row ycenter between">
					<p class="tt-u" class:opened={dropMenu[4]}>Featured</p>
					<div class="iconchev" class:rotated={dropMenu[4]}>
						<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
						</svg>
					</div>
				</div>	
				{#if dropMenu[4]}
					<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}} on:click={toggleMobilemenu} on:keydown={fauxfake}>
						<p><a href="/themes/design/components">Components Library</a></p>
						<p>Bṛhat Open Library</p>
						<p>Synaptic Reconnection</p>
						<p><a href="/manuscript">Fractal Maṇḍala Book</a></p>
					</div>
				{/if}
			</div>
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(5)} on:keydown={fauxfake}>
				<div class="rta-row ycenter between">
					<p class="tt-u" class:opened={dropMenu[5]}>My Work(s)</p>
					<div class="iconchev" class:rotated={dropMenu[5]}>
						<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
						</svg>
					</div>
				</div>
				{#if dropMenu[5]}
					<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}} on:click={toggleMobilemenu} on:keydown={fauxfake}>
						<p><a href="/essays">FM Essays</a></p>
						<p><a href="/gallery">Gallery</a></p>
						<p><a href="/videos">Videos</a></p>
					</div>
				{/if}
			</div>
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(1)} on:keydown={fauxfake}>
				<div class="rta-row ycenter between">
					<p class="tt-u" class:opened={dropMenu[1]}>Web Dev</p>
					<div class="iconchev" class:rotated={dropMenu[1]}>
						<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
						</svg>
					</div>
				</div>
				{#if dropMenu[1]}
					<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}} on:click={toggleMobilemenu} on:keydown={fauxfake}>
						<p><a href="/themes/webdev/sveltekit">Sveltekit</a></p>
						<p><a href="/themes/webdev/supabase">Supabase</a></p>
						<p><a href="/themes/webdev/javascript">Javascript/TS</a></p>
						<p><a href="/themes/webdev/general">General</a></p>
						<p><a href="/themes/webdev">About</a></p>
					</div>
				{/if}
			</div>
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(2)} on:keydown={fauxfake}>
				<div class="rta-row ycenter between">
					<p class="tt-u" class:opened={dropMenu[2]}>Design</p>
					<div class="iconchev" class:rotated={dropMenu[2]}>
						<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
						</svg>
					</div>
				</div>		
				{#if dropMenu[2]}
					<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}} on:click={toggleMobilemenu} on:keydown={fauxfake}>
						<p><a href="/themes/design">How it Started</a></p>
						<p><a href="/themes/design/rainmeter">Rainmeter</a></p>
						<p><a href="/themes/design/maps">Maps</a></p>
						<p><a href="/themes/design/components">Components Library</a></p>
					</div>
				{/if}	
			</div>
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(3)} on:keydown={fauxfake}>
			<div class="rta-row ycenter between">
				<p class="tt-u" class:opened={dropMenu[3]}>Site Links</p>
				<div class="iconchev" class:rotated={dropMenu[3]}>
					<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
					</svg>
				</div>
			</div>		
			{#if dropMenu[3]}
			<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}} on:click={toggleMobilemenu} on:keydown={fauxfake}>
				<p><a href="/gptpro">GPT</a></p>
				<p><a href="/play">Play</a></p>
			</div>
			{/if}	
			</div>
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(6)} on:keydown={fauxfake}>
				<div class="rta-row ycenter between">
				<p class="tt-u" class:opened={dropMenu[6]}>Archival</p>
				<div class="iconchev" class:rotated={dropMenu[6]}>
					<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
					</svg>
				</div>
				</div>		
				{#if dropMenu[6]}
				<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}} on:click={toggleMobilemenu} on:keydown={fauxfake}>
				<p><a href="/archival/writings">General Writings</a></p>
				<p><a href="/archival/museo">Musings</a></p>
				<p><a href="/archival/ancient">Ancient Stuff</a></p>
				</div>
				{/if}	
			</div>
			</div>
			{/if}
			<div class="rta-column dropsection" on:click={() => toggleMenuDrop(7)} on:keydown={fauxfake} transition:slide={{ duration: 340, easing: circOut}}>
				<div class="rta-row ycenter between">
					<p class="tt-u" class:opened={dropMenu[7]}>Knowledge</p>
					<div class="iconchev" class:rotated={dropMenu[7]}>
						<svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z" fill="black"/>
						</svg>
					</div>
				</div>
				{#if dropMenu[7]}
				<div class="rta-column insidedrop p-top-16" transition:slide={{ duration: 200, easing: circOut}} on:click={toggleMobilemenu} on:keydown={fauxfake}>
				<p><a href="/archival/writings">General Writings</a></p>
				<p><a href="/archival/museo">Musings</a></p>
				<p><a href="/archival/ancient">Ancient Stuff</a></p>
				</div>
				{/if}							
			</div>
		</div>
	</div>
	{#key data.pathname}
	<TransitionPage>
	<div class="rta-column midone">
		<slot></slot>
	</div>
	</TransitionPage>
	{/key}
</div>

<Footer></Footer>

<style lang="sass">

.searcher
	overflow-y: scroll

.grid3
	@media screen and (min-width: 769px)
		grid-template-areas: "leftone midone"
		grid-template-columns: 280px 1fr
		.leftone
			border-right: 1px solid var(--borderline)
			padding-top: 128px
			padding-left: 24px
			padding-right: 24px
			background: var(--contraster)
			.leftcontainer
				height: max-content
				position: sticky
				top: 128px
		.midone
			padding-left: 4vw
			padding-top: 128px
			padding-right: 24px
			padding-bottom: 64px
	@media screen and (max-width: 768px)
		grid-template-areas: "midone"
		grid-template-columns: 1fr
		position: relative
		.leftone
			display: none
			transition: 0.15s
		.leftone.opened
			transition: 0.15s
			position: absolute
			display: flex
			flex-direction: column
			top: 0
			left: 0
			width: 100%
			height: max-content
			z-index: 900
			background: var(--background)
			border-bottom: 1px solid var(--borderline)
			padding-top: 128px
			padding-bottom: 64px
			padding-left: 24px
			padding-right: 24px
		.midone
			padding-left: 4vw
			padding-top: 80px
			padding-right: 24px
			padding-bottom: 64px

.grid3.dark
	background-color: hsla(0,0%,7%,1)
	background-image: radial-gradient(at 56% 96%, hsla(130,90%,6%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(0,0%,7%,1) 0px, transparent 100%)

.grid3.light
	background-color: hsla(0,0%,100%,1)
	background-image: radial-gradient(at 56% 96%, hsla(130,100%,48%,0.56) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(0,0%,100%,1) 0px, transparent 50%)

#appcontainer
	box-sizing: border-box
	margin: 0
	padding: 0
	min-height: calc(100vh - 64px)

.dropsection
	border-bottom: 1px solid var(--borderline)
	padding-top: 12px
	padding-bottom: 12px
	cursor: pointer
	.tt-u
		margin: 0
		color: var(--textone)
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
	color: var(--texttwo)
	margin-bottom: 8px
	&:hover
		color: var(--green)

.mobileicon
	display: flex
	justify-content: flex-end
	align-items: center
	height: 64px
	cursor: pointer
	@media screen and (min-width: 769px)
		display: none	
	@media screen and (max-width: 768px)
		width: 40px

</style>


