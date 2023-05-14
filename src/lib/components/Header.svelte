<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne } from '$lib/stores/globalstores'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import DarkMode from '$lib/icons/DarkMode.svelte'
	import Twitter from '$lib/icons/Twitter.svelte'
	import Github from '$lib/icons/Github.svelte'
	import Reading from '$lib/icons/Reading.svelte'

	let screenWidth:number
	let breakPoint:boolean
	let y:number
	let isInvisible = false
	let mouseY:number
	let latestScrollY:number


	$: if ( screenWidth <= 768 ) {
		breakPoint = true
	} else {
		breakPoint = false
	}

	$: {
		if ( y > 100 && y > latestScrollY ) {
			isInvisible = true
		} else {
			isInvisible = false
		}
		latestScrollY = y
	}

	onMount(() => {
		const handleMouse = (event: {clientY: number;}) => {
			mouseY = event.clientY
			if ( mouseY <= 128 ) {
				isInvisible = false
			} 
		}
		window.addEventListener('mousemove', handleMouse)
		return() => {
			window.removeEventListener('mousemove',handleMouse)
		}
	})

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={screenWidth}/>

<header class="header" class:dark={$themeMode} class:light={!$themeMode} class:hiddenHeader={isInvisible}>
	<div class="logo">
		<a href="/">
			<LogoFMMotif></LogoFMMotif>
			{#if !breakPoint}
				<LogoFM></LogoFM>
			{/if}
		</a>
	</div>
	<nav class="area rta-row ycenter fullH xend">
		<div class="rta-row ycenter colgap200">
			{#if $breakZero || $breakOne}
				<Reading/>
			{/if}
			<Github/>
			<Twitter/>
			<DarkMode/>
			<slot name="search"></slot>
		</div>
		<slot name="mobileicon">
		</slot>
	</nav>
</header>

<style lang="sass">

.header
	display: grid
	grid-auto-flow: row
	z-index: 999
	transition: 0.5s cubic-bezier(0.635, 0.405, 0.535, 0.035)
	@media screen and (min-width: 769px)
		grid-template-columns: 360px 1fr
		grid-template-rows: 1fr
		grid-template-areas: "logo area"
		width: 100%
		height: 64px
		align-items: start
		align-content: start
		position: sticky
		justify-items: stretch
		justify-content: stretch
		padding-left: 24px
		padding-right: 24px
		top: 0
		.logo
			grid-area: logo
			height: 64px
			width: 360px
	@media screen and (max-width: 768px)
		grid-template-columns: 40px 1fr
		grid-template-rows: 64px
		grid-template-areas: "logo area"
		width: 100%
		height: 64px
		align-content: start
		align-items: start
		padding-left: 24px
		padding-right: 24px
		position: fixed
		top: 0
		.logo
			grid-area: logo

.dark.header
	backdrop-filter: blur(20px)

.light.header
	backdrop-filter: blur(0px)
	border-bottom: 1px solid rgba(0,0,0,0.065)

.dark.header
	border-bottom: 1px solid rgba(255,255,255,0.1)


.logo a
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-start
	height: 64px

</style>