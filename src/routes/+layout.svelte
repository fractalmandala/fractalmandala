<script lang="ts">

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { mouseStore } from 'svelte-legos';
	import DarkMode from '$lib/icons/DarkMode.svelte'
	import { elementSizeStore } from "svelte-legos";
	import { themeMode, breakZero, breakOne, breakTwo, windowWidth, readingMode } from '$lib/stores/globalstores'
	import sidebarMode from '$lib/stores/searchbar';
	import TransitionPage from '$lib/components/TransitionPage.svelte';
	import ArrowUp from '$lib/icons/ArrowUp.svelte'
	import { dev } from '$app/environment';
	import Motif from '$lib/components/LogoFMMotif.svelte'
	import { inject } from '@vercel/analytics';
	import { slide, fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing'
	import Footer from '$lib/components/Footer.svelte';
	import Lenis from '@studio-freight/lenis';
	import '$lib/styles/themes.sass';
	import '$lib/styles/prism.css';

	let y: number;
	let appearance: number = 50;
	let ref: HTMLElement | null = null;
	let scrollY:number
	let perCent:any = '0%'
	let fake = false;
	let sideComes = false
	let mobileMenu = false

	$: size = elementSizeStore(ref);
	$: perCent = scrollY / $size.height

	function toggleMobileMenu(){
		mobileMenu = !mobileMenu
	}

	function toggleSidebar() {
		if (browser) {
			sidebarMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('sidebarMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}


	inject({ mode: dev ? 'development' : 'production' });

	function fauxfake() {
		fake = !fake;
	}


	$: if (y <= 20) {
		appearance = 50;
	} else {
		appearance = y;
	}

	onMount(async () => {
		const lenis = new Lenis({
			duration: 2.2,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			wheelMultiplier: 0.8,
			smoothWheel: true,
			touchMultiplier: 1,
			infinite: false
		});
		function raf(time: any) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	});

	export let data;

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={$windowWidth}/>

<svelte:head>
	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-1JFGGCTBC9"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-1JFGGCTBC9');
	</script>
</svelte:head>

<div
	class="myappbox"
	class:light={!$themeMode}
	class:dark={$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<header class="rta-row between ycenter headerbox">
		<a href="/">
			<Motif/>
		</a>
		<div class="rta-row colgap200 xend">
			{#if !$breakTwo || mobileMenu}
			<nav class="rta-row ycenter colgap200 null">
				<p><a href="/gpt">GPT</a></p>
				<p><a href="/writings">writings</a></p>	
				<p><a href="/webdev">webdev</a></p>
				<p><a href="/gallery">gallery</a></p>
				<p><a href="/music">music</a></p>
				<p><a href="/videos">videos</a></p>
			</nav>
			{/if}
			<DarkMode/>
			{#if $breakTwo}
			<button class="blank-button" on:click={toggleMobileMenu}>
			<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6 36V33H42V36H6ZM6 25.5V22.5H42V25.5H6ZM6 15V12H42V15H6Z" fill="white"/>
			</svg>
			</button>
			{/if}
		</div>
	</header>

	<div class="progressline" style="width: {perCent * 100}%" class:sticky={!$readingMode} class:moreSticky={$readingMode}></div>

	<main class="pagebox minH" bind:this={ref}>
		<section class="midone" class:levelzero={$breakZero} class:levelone={$breakOne} class:leveltwo={$breakTwo}>
			{#key data.pathname}
				<TransitionPage>
					<slot />
				</TransitionPage>
			{/key}
		</section>
	</main>
	<div class="rta-column footerbox">
		<Footer />
	</div>
	<ArrowUp/>
</div>


<style lang="sass">

.leveltwo
	nav
		display: flex
		flex-direction: column
		width: 100vw
		height: 100vh
		position: fixed
		background: rgba(0,0,0,0.8)
		top: 0
		padding-top: 80px
		right: 0
		z-index: 1000
		p
			font-size: 32px
			color: white

.light
	.blank-button
		svg path
			fill: var(--gret)

nav
	p
		font-size: 16px
		text-transform: uppercase
		color: var(--opposite)
		&:hover
			color: var(--gret)


.progressline
	height: 0
	background: var(--green)
	z-index: 1000
	position: sticky
	top: 80px

.progressline.sticky
	top: 64px

.progressline.moreSticky
	top: 48px

.blank-button
	cursor: pointer
	&:hover
		svg
			path
				fill: var(--gret)

.myappbox
	display: flex
	flex-direction: column
	box-sizing: border-box
	margin: 0
	gap: 0
	width: 100vw
	box-sizing: border-box


.headerbox
	height: 64px
	margin-bottom: -64px
	position: sticky
	top: 0
	z-index: 999
	svg
		cursor: pointer
		&:hover
			path
				fill: var(--gret)

.footerbox
	height: 64px
	z-index: 1

.headerbox
	width: 100%

.levelzero
	.headerbox
		padding: 0 32px

.levelone
	.headerbox
		padding: 0 24px

.leveltwo
	.headerbox
		padding: 0 16px

.pagebox
	display: grid
	grid-auto-flow: row
	min-height: calc(100vh - 128px)

</style>
