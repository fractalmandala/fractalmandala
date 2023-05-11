<script lang="ts">

	import { onMount } from 'svelte'
	import { gptTitles } from '$lib/utils/supabase'
	import { APIKeyStore } from '$lib/gptapp/APIKeyStore';
	import Home from '$lib/gptapp/Home.svelte';
	import Messenger from '$lib/gptapp/Messenger.svelte';
	import SidebarSettings from '$lib/gptapp/SidebarSettings.svelte';
	import visibilityMode from '$lib/stores/visibility'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
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

	onMount(async() => {
		titles = await gptTitles()
	})

</script>

<svelte:window bind:outerWidth={iW}/>

<div class="rta-grid grid2 stdfix" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<div class="rta-column mainone">
		<slot></slot>
		<div class="rta-column p-top-32">
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
			<div class="rta-column p-top-32 bord-top ta-r holdsarchive" transition:slide={{ easing: circOut }} data-lenis-prevent>
				<h6>Older:</h6>
				{#if titles && titles.length > 0}
					{#each titles as item}
						<p>
							<a href="/gptpro/{item.indexing}">
								{item.title}
							</a>
						</p>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="sass">

.holdsarchive
	@media screen and (min-width: 1024px)
		height: calc(100vh - 320px)
		overflow-y: scroll
		p
			margin-bottom: 12px
			line-height: 1.2

.holdsarchive::-webkit-scrollbar
	width: 1px

.holdsarchive::-webkit-scrollbar-track
	width: 1px

.holdsarchive::-webkit-scrollbar-thumb
	background: #10D56C

h6
	color: var(--opposite)

</style>

