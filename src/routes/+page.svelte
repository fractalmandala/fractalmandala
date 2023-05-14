<script lang="ts">

	import { onMount, afterUpdate } from 'svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { themeMode, breakOne, breakTwo, breakZero, breakZeroOne } from '$lib/stores/globalstores'
	import { featuredAll } from '$lib/utils/localpulls'
	import { recentGallery } from '$lib/utils/supabase'
	import Logo from '$lib/assets/FMLogo.svelte'
	import Motif from '$lib/components/LogoFMMotif.svelte'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	import '$lib/styles/prismtoolbar.css'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import '$lib/styles/themes.sass'
	import '$lib/styles/tokens.sass'
	let pageTitle = 'Fractal Maṇḍala'
	let featured:any
	let recentImages:any
	let fake = false
	let iW:number
	let width = "50%"
	let expand:boolean[] = Array(20).fill(false)
	expand[8] = true 

	$: if ( iW <= 768 ) {
		width = "100%"
	} else {
		width = "50%"
	}

	onMount(() => {
		Prism.highlightAll();

		(async() => {
			featured = await featuredAll();
			recentImages = await recentGallery();
		})();
	})
</script>

<svelte:window bind:innerWidth={iW}/>

<svelte:head>
<PageTitle pageTitle={pageTitle}/>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>

<div class="rta-column solo cut" id="panelone" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="rta-row colgap200 ycenter between p-bot-32 headersection bord-bot">
		<img class="mandalaimage" src="/images/mands.webp" alt="mandala"/>
		<Logo width={width}></Logo>
	</div>
</div>
<div class="rta-grid grid2 stdfix topsy" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="rta-column mainone">
		<div class="rta-column rowgap200 p-bot-64 p-top-32" class:dark={$themeMode} class:light={!$themeMode}>
			{#if featured && featured.length > 0}
			<div class="rta-row ycenter null">
				<Motif/>
				<h1 class="is-fade tt-u">Features</h1>
			</div>
				<div class="rta-grid grid2 rowgap200 colgap400">
				{#each featured as item}
					<a href="{item.url}" class="rta-column rowgap100 featurebox bord-bot">
						<h5>
							<a href="{item.url}">
								{item.heading}
							</a>
						</h5>	
						<div class="rta-row colgap200 ycenter null">
							<div class="catlabel">{item.cat}</div>
							<small>{item.tag}</small>
						</div>
					</a>
				{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="rta-column rightone2 xright">
		<div class="rta-column rightstick ta-r" data-lenis-prevent>
			{#if recentImages && recentImages.length > 0}
			<h3 class="is-fade tt-u">Recent Images</h3>
				<div class="rta-grid grid2 become4 rowgap200 colgap200">
					{#each recentImages as item}
						<div class="rta-image">
							<img src={item.link} alt={item.id}/>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="sass">


.mainone
	h1
		font-family: 'Spline Sans', sans-serif
		border-bottom: none

#panelone
	background: var(--background)

.is-fade
	color: var(--midline)

.catlabel
	background: var(--lingrad)
	font-family: 'Spline Sans', sans-serif
	text-transform: uppercase
	font-size: 12px
	padding: 2px 4px


.leveltwo
	.featurebox
		h5
			font-size: 1.28rem

.zerolevel
	.rightone2
		.rightstick
			width: 80%
			position: sticky
			top: 256px
			height: 480px
			overflow-y: scroll
			padding-right: 4px

.rightstick::-webkit-scrollbar
	width: 2px
.rightstick::-webkit-scrollbar-thumb
	background: #10D56C
	border-top: 200px solid var(--background)

.featurebox
	h5
		font-family: 'Spline Sans', sans-serif
		color: var(--opposite)
		margin: 0
		font-size: 1.2rem
		font-weight: 500
	small
		text-transform: uppercase
	&:hover
		h5
			color: var(--green)

.mandalaimage
	object-fit: cover
	height: 120px
	width: 120px
	transform-origin: center center
	animation: mandaling 24s infinite alternate-reverse
	@media screen and (max-width: 768px)
		height: 80px
		width: 80px

.headersection
	padding: 32px 0


@keyframes mandaling
	0%
		transform: rotate(360deg)
	50%
		transform: rotate(0deg)
	100%
		transform: rotate(-360deg)

</style>