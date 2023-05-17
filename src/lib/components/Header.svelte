<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import DarkMode from '$lib/icons/DarkMode.svelte'
	import Reading from '$lib/icons/Reading.svelte'
	import Unfold from '$lib/icons/Unfold.svelte'


	let y:number


</script>

<svelte:window bind:scrollY={y}/>

<header class="header" class:dark={$themeMode} class:light={!$themeMode} class:greener={$breakTwo}>
	<div class="logo">
		<a href="/">
			{#if $breakZero}
				<LogoFMMotif></LogoFMMotif>
				<LogoFM></LogoFM>
			{:else}
			<LogoFMMotif></LogoFMMotif>
			{/if}
		</a>
	</div>
	<nav class="area rta-row ycenter fullH xend">
		<div class="rta-row fullH ycenter colgap200">
			{#if $breakZero || $breakOne}
				<Reading/>
			{/if}
			<DarkMode/>
			<slot name="search"></slot>
			<slot name="dropdown"></slot>
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
		height: 72px
		align-items: start
		align-content: start
		position: sticky
		justify-items: stretch
		justify-content: stretch
		top: 0
		.logo
			grid-area: logo
			height: 72px
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

.light.header.greener
	background: var(--green)

.dark.header.greener
	background: var(--green)

.logo a
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-start
	height: 72px

</style>