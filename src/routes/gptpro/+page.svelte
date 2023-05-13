<script lang="ts">

	import { onMount } from 'svelte'
	import { gptTitles } from '$lib/utils/supabase'
	import { APIKeyStore } from '$lib/gptapp/APIKeyStore';
	import Home from '$lib/gptapp/Home.svelte';
	import Messenger from '$lib/gptapp/Messenger.svelte';
	import SidebarSettings from '$lib/gptapp/SidebarSettings.svelte';
	import visibilityMode from '$lib/stores/visibility'
	import BotsListView from '$lib/gptapp/BotsListView.svelte';
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	let y:number
	let isInvisible = false
	let mouseY:number
	let latestScrollY:number
	let iW:number
	let breakPoint:boolean
	let fake = false
	let expandRightbar = false
	let titles:any = []

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}
	
	function fauxfake(){
		fake = !fake
	}

	$: if ( iW <= 1023 ) {
		breakPoint = true
	} else {
		breakPoint = false
	}

	$: isValidKey = typeof $APIKeyStore === 'string' && $APIKeyStore.startsWith('sk-');

	let isLoading = true;

	function onDone() {
		isLoading = false;
	}

	$: {
		if ( y > 100 && y > latestScrollY ) {
			isInvisible = true
		} else {
			isInvisible = false
		}
		latestScrollY = y
	}

	onMount(async() => {
		titles = await gptTitles();
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

<svelte:window bind:outerWidth={iW} />

<div class="rta-grid colgap600 grid2 stdfix" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<div class="rta-column rowgap200 mainone">
		<div class="rta-column">
			{#if !isLoading && $APIKeyStore !== null && isValidKey}
				<Messenger apiKey={$APIKeyStore} />
			{:else}
				<Home {onDone} />
			{/if}
		</div>
	</div>
	<div class="rta-column rightone" class:opened={expandRightbar}>
		{#if breakPoint}
		<div class="rta-row ycenter between rightmenu" on:click={toggleRightbar} on:keydown={fauxfake}>
			<button class="break899">
				{#if expandRightbar}
				Close Subsections
				{:else}
				Expand Subsections
				{/if}
			</button>
			<div class="iconchev" class:rotated={expandRightbar}>
				<svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.41345 0.187622L0.413452 3.18762L8.41345 11.1876L16.4135 3.18762L13.4135 0.187622L8.41345 5.18762L3.41345 0.187622Z" fill="#FFFFFF"/>
				</svg>
			</div>
		</div>
		{/if}
		{#if !breakPoint || expandRightbar}
			<div class="rta-column" transition:slide={{ easing: circOut }}>
				{#if !isLoading && $APIKeyStore !== null && isValidKey}
					<SidebarSettings />
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="sass">

.stdfix
	@media screen and (min-width: 769px)
		padding: 4vw
	@media screen and (max-width: 768px)
		padding: 24px

</style>

