<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'	
	import LogoFM from '$lib/components/LogoFM.svelte'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'

	let y:number
	let breakPoint = true
	let screenWidth:number

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={screenWidth}/>

<div class="header" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<div class="logo">
		<a href="/">
			<LogoFMMotif></LogoFMMotif>
			<LogoFM></LogoFM>
		</a>
	</div>
	<slot name="mobileicon">
	</slot>
</div>

<style lang="sass">

.header
	display: grid
	grid-auto-flow: row
	z-index: 999
	transition: 0.3s ease
	@media screen and (min-width: 769px)
		grid-template-columns: 360px 1fr
		grid-template-rows: 1fr
		grid-template-areas: "logo area"
		width: 100%
		height: 64px
		align-items: start
		align-content: start
		position: fixed
		justify-items: stretch
		justify-content: stretch
		padding-left: 24px
		padding-right: 24px
		backdrop-filter: blur(10px)
		top: 0
		.logo
			grid-area: logo
			height: 64px
			width: 360px
	@media screen and (max-width: 768px)
		grid-template-columns: 1fr 40px
		grid-template-rows: 80px
		grid-template-areas: "logo icon"
		width: 100%
		height: 64px
		align-content: start
		align-items: start
		padding-left: 24px
		padding-right: 24px
		position: fixed
		backdrop-filter: blur(10px)
		top: 0
		.logo
			grid-area: logo

.header.dark
	box-shadow: 4px 4px 5px #090909
	border-bottom: 1px solid rgba(255,255,255,0.2)

.logo a
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-start
	height: 64px

</style>