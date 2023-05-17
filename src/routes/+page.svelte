<script lang="ts">
	import { onMount } from 'svelte';
	import Animations from 'textify.js'
	import { scale } from 'svelte/transition'
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { themeMode, breakOne, breakTwo, breakZero, breakZeroOne } from '$lib/stores/globalstores';
	import { featuredAll } from '$lib/utils/localpulls';
	import { recentGallery } from '$lib/utils/supabase';
	import Logo from '$lib/assets/FMLogo.svelte';
	import Parallax from '$lib/deslib/Parallax.svelte'
	import '$lib/styles/prism.css';
	import '$lib/styles/prismtoolbar.css';
	import '$lib/styles/themes.sass';
	import '$lib/styles/tokens.sass';
	let pageTitle = 'Fractal Maṇḍala';
	let featured: any;
	let recentImages: any;
	let fake = false;
	let iW: number;

	onMount(() => {
		const { Textify } = Animations;
		new Textify({
			selector: ".thish5",
			duration: 1600,
			stagger: 100,
			fade: false,
			top: false,
			reveal: true,
			threshold: 0.8,
			once: false,
			scale: 2.5
		});
		(async () => {
			featured = await featuredAll();
			recentImages = await recentGallery();
		})();
	});
</script>

<svelte:window bind:innerWidth={iW} />

<svelte:head>
	<PageTitle {pageTitle} />
</svelte:head>

<div class="rta-column" id="panelone" class:dark={$themeMode} class:light={!$themeMode}>
	<Parallax --parallax="url('https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/10mandala/realitywall.webp')">
		<div class="rta-column back screen"></div>
	</Parallax>
</div>
<div class="rta-column minH yeslink">
	<div class="rta-accordion minH"
		class:levelzero={$breakZero}
		class:levelone={$breakOne}
		class:leveltwo={$breakTwo}
		>
		<div class="rta-column back" id="panel-1">
			<a href="/writings" class="darken">
				<h4 class="thish5">Writings</h4>
			</a>
		</div>
		<div class="rta-column back" id="panel-2">
			<a href="/webdev" class="darken">
				<h4 class="thish5">Web Dev</h4>
			</a>
		</div>
		<div class="rta-column back" id="panel-3">
			<a href="/music" class="darken">
				<h4 class="thish5">Music</h4>
			</a>
		</div>
		<div class="rta-column back" id="panel-4">
			<a href="/videos" class="darken">
				<h4 class="thish5">Videos</h4>
			</a>
		</div>
		<div class="rta-column back" id="panel-5">
			<a href="/gallery" class="darken">
				<h4 class="thish5">Imagery</h4>
			</a>
		</div>
		<div class="rta-column back" id="panel-6">
			<a href="/gpt" class="darken">
				<h4 class="thish5">GPT</h4>
			</a>
		</div>
	</div>
</div>

<style lang="sass">


#panelone
	height: 100vh
	overflow-y: hidden
	align-items: center

.screen
	background-image: url('/images/screen.png')
	background-size: cover
	background-position: center center
	height: 100%
	width: 100%

.darken
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	text-align: center
	height: 100%
	width: 100%
	padding-top: 32px
	background: rgba(0,0,0,0.3)
	h4
		margin: 0

.rta-accordion
	display: flex

.rta-accordion.levelzero
	flex-direction: row
	column-gap: 8px
	.rta-column
		width: calc(16.66% - 7px)
		transition: all 0.8s ease

.rta-accordion.levelone
	flex-direction: row
	column-gap: 8px
	.rta-column
		width: calc(16.66% - 7px)
		transition: all 0.8s ease

.rta-accordion.leveltwo
	flex-direction: row
	column-gap: 8px
	row-gap: 8px
	flex-wrap: wrap
	.rta-column
		width: calc(33.33% - 6px)
		transition: all 0.8s ease
		height: 50vh


#panel-1
	background-image: url('/images/k-writings.webp')

#panel-2
	background-image: url('/images/k-webdev.webp')

#panel-3
	background-image: url('/images/k-music.webp')

#panel-4
	background-image: url('/images/k-videos.webp')

#panel-5
	background-image: url('/images/k-images.webp')

#panel-6
	background-image: url('/images/k-gpt.webp')

</style>
