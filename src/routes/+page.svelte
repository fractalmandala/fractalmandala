<script lang="ts">

	import { onMount, afterUpdate } from 'svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import { themeMode, breakOne, breakTwo } from '$lib/stores/globalstores'
	import Logo from '$lib/assets/FMLogo.svelte'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	import '$lib/styles/prismtoolbar.css'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import '$lib/styles/themes.sass'
	import '$lib/styles/tokens.sass'
	let pageTitle = 'Fractal Maṇḍala'
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
	})
</script>

<svelte:window bind:innerWidth={iW}/>

<svelte:head>
<PageTitle pageTitle={pageTitle}/>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>

<div class="rta-column stickyboy solo cut" id="panelone" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="rta-row colgap200 ycenter p-bot-32 headersection bord-bot">
		<img class="mandalaimage" src="/images/mands.webp" alt="mandala"/>
		<Logo width={width}></Logo>
	</div>
</div>
<div class="rta-column snipstyle solo p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<p>{$themeMode}</p>
	<p>{$breakOne}</p>
	<p>{$breakTwo}</p>
</div>

<style lang="sass">

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
	padding: 32px


@keyframes mandaling
	0%
		transform: rotate(360deg)
	50%
		transform: rotate(0deg)
	100%
		transform: rotate(-360deg)

</style>