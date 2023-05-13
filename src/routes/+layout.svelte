<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { themeMode, breakOne, breakTwo } from '$lib/stores/globalstores'
	import sidebarMode from '$lib/stores/searchbar';
	import TransitionPage from '$lib/components/TransitionPage.svelte';
	import Searcher from '$lib/components/SearchComponent.svelte';
	import MobileIcon from '$lib/icons/Menu.svelte';
	import {
		themeSveltekit,
		themeSupabase,
		themeJavascript,
		themeGeneral
	} from '$lib/utils/localpulls';
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
	let screenWidth: number;
	let breakPoint: boolean;
	let appearance: number = 50;
	let dropMenu = Array(10).fill(false);
	let minDrop = Array(10).fill(false);
	let fake = false;
	let expandMobilemenu = false;
	let sveltes: any; //to store sveltekit posts
	let supas: any; //to store supabase posts
	let javas: any; //to store javascript posts
	let webgens: any; //to store general webui posts

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
		if (breakPoint === true) {
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

	$: if (screenWidth <= 768) {
		breakPoint = true;
	} else {
		breakPoint = false;
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
		sveltes = await themeSveltekit();
		supas = await themeSupabase();
		javas = await themeJavascript();
		webgens = await themeGeneral();
	});

	export let data;
</script>

<svelte:window bind:scrollY={y} bind:outerWidth={screenWidth}/>

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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Spline+Sans+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Spline+Sans:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div
	class="myappbox"
	class:light={!$themeMode}
	class:dark={$themeMode}
	class:relative={$sidebarMode}
>
	<div class="rta-column headerbox">
		<Header>
			<div class="mobileicon" slot="mobileicon" on:click={toggleMobilemenu} on:keydown={fauxfake}>
				<MobileIcon />
			</div>
			<div class="searchslot" slot="search" on:click={toggleSidebar} on:keydown={fauxfake}>
				<Search />
			</div>
		</Header>
	</div>
	<div class="pagebox">
		<div class="leftone" class:leftsidebar={expandMobilemenu}>
			<div class="leftsticky">
				<div
					class="rta-row ycenter between null p-bot-16 point"
					on:click={() => toggleMenuDrop(1)}
					on:keydown={fauxfake}
				>
					<p class="tt-u" class:opened={dropMenu[1]}>Writings</p>
					<div class="iconchev" class:rotated={dropMenu[1]}>
						<svg
							width="13"
							height="9"
							viewBox="0 0 13 9"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z"
								fill="black"
							/>
						</svg>
					</div>
				</div>
				{#if dropMenu[1]}
					<div
						class="rta-column rowgap100 null bord-bot p-bot-16"
						transition:slide={{ duration: 200, axis: 'y' }}
						 on:click={toggleMobilemenu} on:keydown={fauxfake}
					>
						<p class="spline"><a href="/writings/mandala">Maṇḍala</a></p>
						<p class="spline"><a href="/writings/history">History</a></p>
						<p class="spline"><a href="/writings/archival">Archival</a></p>
					</div>
				{/if}
				<div
					class="rta-row ycenter between null p-bot-16 point p-top-16"
					on:click={() => toggleMenuDrop(2)}
					on:keydown={fauxfake}
				>
					<p class="tt-u" class:opened={dropMenu[2]}>Web Dev</p>
					<div class="iconchev" class:rotated={dropMenu[2]}>
						<svg
							width="13"
							height="9"
							viewBox="0 0 13 9"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z"
								fill="black"
							/>
						</svg>
					</div>
				</div>
				{#if dropMenu[2]}
					<div
						class="rta-column rowgap100 null bord-bot p-bot-16"
						transition:slide={{ duration: 200, axis: 'y' }}
						on:click={toggleMobilemenu} on:keydown={fauxfake}
					>
						<p class="spline"><a href="/sveltekit">Sveltekit</a></p>
						<p class="spline"><a href="/supabase">Supabase</a></p>
						<p class="spline"><a href="/javascript">Javascript/TS</a></p>
						<p class="spline"><a href="/webui">UI</a></p>
					</div>
				{/if}
				<div
					class="rta-row ycenter between null p-bot-16 point p-top-16"
					on:click={() => toggleMenuDrop(3)}
					on:keydown={fauxfake}
				>
					<p class="tt-u" class:opened={dropMenu[3]}>Chat GPT</p>
					<div class="iconchev" class:rotated={dropMenu[3]}>
						<svg
							width="13"
							height="9"
							viewBox="0 0 13 9"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.66345 0.187622L0.413452 2.43762L6.41345 8.43762L12.4135 2.43762L10.1635 0.187622L6.41345 3.93762L2.66345 0.187622Z"
								fill="black"
							/>
						</svg>
					</div>
				</div>
				{#if dropMenu[3]}
					<div
						class="rta-column rowgap100 null bord-bot p-bot-16"
						transition:slide={{ duration: 200, axis: 'y' }}
						on:click={toggleMobilemenu} on:keydown={fauxfake}
					>
						<p class="spline"><a href="/gpt">Agents</a></p>
						<p class="spline"><a href="/gpt/sveltekit">Sveltekit</a></p>
						<p class="spline"><a href="/gpt/supabase">Supabase</a></p>
						<p class="spline"><a href="/gpt/webui">UI</a></p>
						<p class="spline"><a href="/gpt/animation">Animation</a></p>
						<p class="spline"><a href="/gpt/dharmastuff">Dharmastuff</a></p>
						<p class="spline"><a href="/gpt/ai">AI</a></p>
						<p class="spline"><a href="/gpt/other">Other</a></p>
					</div>
				{/if}
				<div class="rta-row ycenter between null p-bot-16 point p-top-16">
					<p class="tt-u"><a href="/gallery">Gallery</a></p>
				</div>
				<div class="rta-row ycenter between null p-bot-16 point p-top-16" on:click={toggleMobilemenu} on:keydown={fauxfake}>
					<p class="tt-u"><a href="/videos">Videos</a></p>
				</div>
				<div class="rta-row ycenter between null p-bot-16 point p-top-16" on:click={toggleMobilemenu} on:keydown={fauxfake}>
					<p class="tt-u"><a href="/music">Music</a></p>
				</div>
			</div>
		</div>
		<div class="midone">
			{#key data.pathname}
				<TransitionPage>
					<slot />
				</TransitionPage>
			{/key}
		</div>
	</div>
	<div class="rta-column footerbox">
		<Footer />
	</div>
	{#if $sidebarMode}
		<div class="rta-column of-search" transition:slide={{ axis: 'x'}} data-lenis-prevent>
			<Searcher/>
		</div>
	{/if}
</div>

<style lang="sass">

.myappbox
	display: flex
	flex-direction: column
	box-sizing: border-box
	padding: 0
	margin: 0
	gap: 0
	min-height: 100vh
	width: 100vw
	background: var(--background)

.myappbox.relative
	position: relative
	.of-search
		position: absolute
		top: 0
		right: 0
		width: 360px
		height: 100vh
		z-index: 990
		background: var(--contraster)
		backdrop-filter: blur(12px)
		overflow-y: scroll
		@media screen and (min-width: 769px)
			padding: 128px 24px 64px 24px
		@media screen and (max-width: 768px)
			width: 100vw
			top: 64px
			height: calc(100vh - 64px)
			padding: 32px 24px 64px 24px

.of-search::-webkit-scrollbar
	width: 2px
.of-search::-webkit-scrollbar-thumb
	background: #10D56C

.headerbox
	height: 64px
	position: sticky
	top: 0
	z-index: 999

.dark
	.headerbox
		background: rgba(7,7,7,0.71)

.footerbox
	height: 64px

.pagebox
	min-height: calc(100vh - 128px)
	display: grid
	grid-auto-flow: row
	@media screen and (min-width: 769px)
		grid-template-columns: 296px 1fr
		grid-template-areas: "leftone midone"
		.leftone
			grid-area: leftone
			width: 296px
			padding-left: 24px
			padding-right: 24px
			padding-top: 48px
			height: 100%
			.leftsticky
				height: max-content
				position: sticky
				top: 112px
			.spline
				width: max-content
		.midone
			grid-area: midone
	@media screen and (max-width: 768px)
		grid-template-columns: 1fr
		grid-template-areas: midone
		.leftone
			display: none
			transition: 0.2s ease
		.midone
			grid-one: midone
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
			background: rgba(0,0,0,0.6)
			border-right: 1px solid rgba(255,255,255,0.1)
	.leftone.leftsidebar
		@media screen and (min-width: 769px)
			border-right: 1px solid rgba(255,255,255,0.1)
		@media screen and (max-width: 768px)
			background: rgba(0,0,0,0.8)
			backdrop-filter: blur(20px)


.iconchev
	transition: 0.15s
	svg path
		fill: var(--textone)

.iconchev.rotated
	transform: rotate(180deg)
	svg path
		fill: var(--opposite)

.tt-u.opened
	color: var(--green)

.tt-u
	color: var(--opposite)

.point
	&:hover
		p
			color: var(--opposite)
		.iconchev
			svg path
				fill: var(--green)

.spline
	cursor: pointer
	position: relative
	color: var(--opposite)
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
