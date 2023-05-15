<script lang="ts">

	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Reading from '$lib/icons/Reading.svelte'
	import Dark from '$lib/icons/DarkMode.svelte'
	import SidebarSubsection from '$lib/deslib/SidebarSubsection.svelte'
	import SidebarSubsection2 from '$lib/deslib/SidebarSubsection.svelte'
	import SidebarSubsection3 from '$lib/deslib/SidebarSubsection.svelte'
	import SidebarSubsection4 from '$lib/deslib/SidebarSubsection.svelte'
	import SidebarSubsection5 from '$lib/deslib/SidebarSubsection.svelte'
	import SidebarSubsection6 from '$lib/deslib/SidebarSubsection.svelte'
	import { themeMode, breakZero, breakOne, breakTwo, windowWidth, readingMode } from '$lib/stores/globalstores'
	import sidebarMode from '$lib/stores/searchbar';
	import TransitionPage from '$lib/components/TransitionPage.svelte';
	import TransitionPage2 from '$lib/components/TransitionPage.svelte';
	import ArrowUp from '$lib/icons/ArrowUp.svelte'
	import Searcher from '$lib/components/SearchComponent.svelte';
	import MobileIcon from '$lib/icons/Menu.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { slide } from 'svelte/transition';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Lenis from '@studio-freight/lenis';
	import Search from '$lib/icons/Search.svelte';
	import '$lib/styles/themes.sass';
	import '$lib/styles/prism.css';

	let y: number;
	let appearance: number = 50;
	let dropMenu = Array(10).fill(false);
	let minDrop = Array(10).fill(false);
	let fake = false;
	let expandMobilemenu = false;
	let sveltes: any; //to store sveltekit posts
	let supas: any; //to store supabase posts
	let javas: any; //to store javascript posts
	let webgens: any; //to store general webui posts
	let myY = 0
	let myX = -900

	function toggleSidebar() {
		if (browser) {
			sidebarMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('sidebarMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}

	function toggleMobilemenu() {
		if ($breakTwo) {
			expandMobilemenu = !expandMobilemenu;
		} else {
			fake = !fake;
		}
	}

	inject({ mode: dev ? 'development' : 'production' });

	function fauxfake() {
		fake = !fake;
	}

	function toggleMenuDrop(index: number) {
		dropMenu[index] = !dropMenu[index];
		for (let i = 0; i < dropMenu.length; i++) {
			if (i !== index && dropMenu[i] === true) {
				dropMenu[i] = false;
			}
		}
		if (anySubItem === true) {
			minDrop.fill(false);
		}
	}

	$: if (y <= 20) {
		appearance = 50;
	} else {
		appearance = y;
	}

	$: anySubItem = minDrop.some((item) => item);

	onMount(async () => {
		const lenis = new Lenis({
			duration: 1.2,
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
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400&family=Martian+Mono:wght@300;400;500;600;700;800&family=space+Sans+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
</svelte:head>

<div
	class="myappbox"
	class:light={!$themeMode}
	class:dark={$themeMode}
>
	{#if $readingMode}
		<div class="rta-row fixed-row ycenter" transition:slide>
			<Reading/>
			<Dark/>
		</div>
	{:else}
	<div id="heady" class="rta-column headerbox" transition:slide>
		<Header>
			<div class="mobileicon" slot="mobileicon" on:click={toggleMobilemenu} on:keydown={fauxfake}>
				<MobileIcon />
			</div>
			<div class="searchslot" slot="search" on:click={toggleSidebar} on:keydown={fauxfake}>
				<Search />
			</div>
		</Header>
	</div>
	{/if}
	<main class="pagebox grid3" class:reader={$readingMode}>
		<section class="leftone" class:leftsidebar={expandMobilemenu} class:levelzero={$breakZero} class:levelone={$breakOne} class:leveltwo={$breakTwo} transition:slide data-lenis-prevent>
			<div class="leftsticky">
					<div class="space tt-u"><a href="/gpt">GPT</a></div>
					<div class="space tt-u"><a href="/writings">Writings</a></div>
					<div class="space tt-u"><a href="/webdev">Web Dev</a></div>
					<div class="space tt-u"><a href="/gallery">Gallery</a></div>
					<div class="space tt-u"><a href="/videos">Videos</a></div>
					<div class="tt-u space"><a href="/music">Music</a></div>
					<div class="tt-u space"><a href="/build">Build Area</a></div>
			</div>
		</section>
		<section class="midone" class:levelzero={$breakZero} class:levelone={$breakOne} class:leveltwo={$breakTwo}>
			{#if $sidebarMode}
			<div class="rta-column of-search" transition:slide={{ axis: 'x'}}>
				<Searcher/>
			</div>
			{:else}
				{#key data.pathname}
					<TransitionPage>
						<slot />
				</TransitionPage>
				{/key}
			{/if}
		</section>
		<section class="rightstrip"></section>
	</main>
	<div class="rta-column footerbox">
		<Footer />
	</div>
	<ArrowUp/>
</div>

<style lang="sass">

.of-search
	background: var(--background)

.myappbox
	display: flex
	flex-direction: column
	box-sizing: border-box
	padding: 0
	margin: 0
	gap: 0
	width: 100vw
	background: var(--background)

.headerbox, .footerbox, .leftone
	background: var(--background)

.of-search
	width: 100%
	min-height: calc(100vh - 128px)

.levelzero
	.of-search
		padding: 4vw

.levelone
	.of-search
		padding: 4vw

.leveltwo
	.of-search
		padding: 32px

.headerbox
	height: 64px
	position: sticky
	top: 0
	z-index: 999

.fixed-row
	height: 48px
	position: sticky
	top: 0
	z-index: 999
	justify-content: center
	background: var(--background)

.dark
	.fixed-row
		border-bottom: 1px solid rgba(255,255,255,0.1)

.light
	.fixed-row
		border-bottom: 1px solid rgba(0,0,0,0.065)

.headerbox
	background: var(--background)

.footerbox
	height: 64px
	z-index: 1

.leftsticky
	color: var(--midline)

.pagebox
	display: grid
	grid-auto-flow: row
	@media screen and (min-width: 769px)
		grid-template-columns: 240px 1fr 24px
		grid-template-areas: "leftone midone rightstrip"
		min-height: calc(100vh - 128px)
		.leftone
			grid-area: leftone
			width: 240px
			padding-left: 32px
			padding-right: 24px
			padding-top: 48px
			height: 100%
			z-index: 100
			.leftsticky
				height: max-content
				position: sticky
				top: 112px
				display: flex
				flex-direction: column
				row-gap: 8px
				font-weight: 400
				font-size: 1.28rem
			.space
				width: max-content
		.midone
			grid-area: midone
			z-index: 0
		.rightstrip
			grid-area: rightstrip
			width: 24px
	@media screen and (max-width: 768px)
		grid-template-columns: 1fr
		grid-template-areas: midone
		.leftone
			display: none
			transition: 0.2s ease
			z-index: 990
		.midone
			grid-one: midone
			z-index: 800
		.leftone.leftsidebar
			display: flex
			flex-direction: column
			position: fixed
			top: 0
			left: 0
			width: 100vw
			height: 100vh
			padding-top: 160px
			padding-left: 24px
			padding-right: 24px
			overflow-y: scroll
			z-index: 990
			transition: 0.2s ease

.leftone, .leftone.leftsidebar
	transition: 0.4s ease

.dark
	.leftone
		@media screen and (min-width: 769px)
			border-right: 1px solid rgba(255,255,255,0.1)
	.leftone.leftsidebar
		@media screen and (min-width: 769px)
			border-right: 1px solid rgba(255,255,255,0.1)
		@media screen and (max-width: 768px)
			background: rgba(0,0,0,0.8)
			backdrop-filter: blur(20px)

.light
	.leftone
		@media screen and (min-width: 769px)
			border-right: 1px solid rgba(0,0,0,0.065)

.light
	.pagebox.reader
		.leftone
			@media screen and (min-width: 769px)
				border-right: 1px solid rgba(0,0,0,0)

.dark
	.pagebox.reader
		.leftone
			@media screen and (min-width: 769px)
				border-right: 1px solid rgba(0,0,0,0)


.space
	cursor: pointer
	position: relative
	&:hover
		&::after
			width: 100%
			margin-left: 0
	&::after
		position: absolute
		bottom: 0
		left: 0
		width: 0%
		height: 1px 
		background: var(--green)
		transition: 0.15s
		content: ''
		margin-left: 50%

.mobileicon
	@media screen and (min-width: 769px)
		display: none
	@media screen and (max-width: 768px)
		margin-left: 8px

</style>
