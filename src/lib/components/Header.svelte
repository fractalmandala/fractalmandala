<script lang="ts">

	import { onMount } from 'svelte'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import DarkMode from '$lib/icons/DarkMode.svelte'
	import Twitter from '$lib/icons/Twitter.svelte'
	import Github from '$lib/icons/Github.svelte'
	import Reading from '$lib/icons/Reading.svelte'
	import Unfold from '$lib/icons/Unfold.svelte'

	let y:number


</script>

<svelte:window bind:scrollY={y}/>

<header class="header" class:dark={$themeMode} class:light={!$themeMode} class:greener={$breakTwo}>
	<div class="logo">
		<a href="/">
			{#if $breakZero}
				<LogoFM></LogoFM>
			{:else}
			<LogoFMMotif></LogoFMMotif>
			{/if}
		</a>
	</div>
	<nav class="area rta-row ycenter fullH between">
		<BreadCrumb/>
		<div class="rta-row fullH ycenter colgap200">
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
		{#if $breakTwo}
			<Unfold/>
		{/if}
	</nav>
</header>

<style lang="sass">

.header
	display: grid
	grid-auto-flow: row
	z-index: 999
	transition: 0.5s cubic-bezier(0.635, 0.405, 0.535, 0.035)
	@media screen and (min-width: 769px)
		grid-template-columns: 300px 1fr
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

.light.header
	border-bottom: 1px solid rgba(0,0,0,0.065)

.light.header.greener
	background: var(--green)

.dark.header
	border-bottom: 1px solid rgba(255,255,255,0.1)

.dark.header.greener
	background: var(--green)

.logo a
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-start
	height: 64px

</style>