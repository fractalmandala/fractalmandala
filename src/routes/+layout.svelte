<script lang="ts">

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { mouseStore } from 'svelte-legos';
	import DarkMode from '$lib/icons/DarkMode.svelte'
	import Search from '$lib/icons/Search.svelte'
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
	let whiteHeader = false
	let mobileMenu = false
	let linkpath:any
	let theColor = "var(--opposite)"

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

	$: if ( linkpath === '/') {
		whiteHeader = true
		theColor = "#FFFFFF"
	} else {
		whiteHeader = false
		theColor = "var(--opposite)"
	}

	onMount(() => {
		linkpath = $page.url.pathname;
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
	<header class="rowgap200 headerbox">
		<a href="/">
			<Motif/>
		</a>
		<div class="xleft ybetween fullH separator">
			{#if !$breakTwo || mobileMenu}
			{#key linkpath}
			<nav class="rta-column null" class:whiten={whiteHeader} class:oppen={!whiteHeader}>
				<p><a href="/gpt">GPT</a></p>
				<p><a href="/writings">writings</a></p>	
				<p><a href="/webdev">webdev</a></p>
				<p><a href="/gallery">gallery</a></p>
				<p><a href="/music">music</a></p>
				<p><a href="/videos">videos</a></p>
			</nav>
			{/key}
			{/if}
			<div class="iconholder rowgap200">
				<DarkMode/>
				<button class="blank-button">
					<Search/>
				</button>
			</div>
			{#if $breakTwo}
			<button class="blank-button" on:click={toggleMobileMenu}>
			<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M6 36V33H42V36H6ZM6 25.5V22.5H42V25.5H6ZM6 15V12H42V15H6Z" fill="white"/>
			</svg>
			</button>
			{/if}
		</div>
	</header>
	<section class="restpage rta-column">
		<main class="rta-column minH" bind:this={ref} class:levelzero={$breakZero} class:levelone={$breakOne} class:leveltwo={$breakTwo}>
			{#key data.pathname}
				<TransitionPage>
					<slot />
				</TransitionPage>
			{/key}
		</main>
		<div class="rta-column footerbox">
			<Footer />
		</div>
		<ArrowUp/>
	</section>
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

nav
	p
		font-size: 18px
		text-transform: uppercase
		color: var(--opposite)
		font-weight: 500
		&:hover
			a
				color: var(--gret)

nav.whiten
	p, p a
		color: white

nav.oppen
	p, p a
		color: var(--opposite)

.blank-button
	cursor: pointer
	&:hover
		svg
			path
				fill: var(--gret)

.myappbox
	display: grid
	grid-auto-flow: row
	margin: 0
	gap: 0
	width: 100vw
	box-sizing: border-box

.myappbox.levelzero
	grid-template-columns: 112px 1fr
	grid-template-areas: "headerbox restpage"
	.headerbox
		grid-area: headerbox
		padding-left: 24px
		height: 100vh
		width: 112px
		flex-direction: column
        .separator
			display: flex
			flex-direction: column
			justify-content: space-between
			align-items: flex-start
			.iconholder
				display: flex
				flex-direction: column
	.restpage
		grid-area: restpage
		margin-left: -112px

.myappbox.levelone
	grid-template-columns: 112px 1fr
	grid-template-areas: "headerbox restpage"
	.headerbox
		grid-area: headerbox
		padding-left: 24px
		height: 100vh
		width: 112px
		flex-direction: column
		.separator
			display: flex
			flex-direction: column
			justify-content: space-between
			align-items: flex-start
			.iconholder
				display: flex
				flex-direction: column
	.restpage
		grid-area: restpage
		margin-left: -112px

.myappbox.leveltwo
	grid-template-columns: 1fr
	grid-template-areas: "headerbox" "restpage"
	.headerbox
		grid-area: headerbox
		height: 64px
		width: 100vw
		flex-direction: row
		margin-bottom: -64px
		align-items: center
		.separator
			display: flex
			flex-direction: row
			justify-content: space-between
			column-gap: 16px
			width: 100%
			.iconholder
				display: flex
				flex-direction: row
				justify-content: flex-end
				column-gap: 16px
				width: 100%


.headerbox
	display: flex
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

.levelzero
	.headerbox
		padding: 32px 0

.levelone
	.headerbox
		padding: 32px 0

.leveltwo
	.headerbox
		padding: 0 16px

</style>
