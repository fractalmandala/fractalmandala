<script lang="ts">

	import { onMount } from 'svelte'
	import { APIKeyStore } from '$lib/gptapp/APIKeyStore';
	import Home from '$lib/gptapp/Home.svelte';
	import Messenger from '$lib/gptapp/Messenger.svelte';
	import visibilityMode from '$lib/stores/visibility'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	let iW:number
	let breakPoint:boolean
	let fake = false
	let expandRightbar = false

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

</script>

<svelte:window bind:outerWidth={iW}/>

<div class="rta-grid grid2 stdfix" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<div class="rta-column mainone">
		<h3 class="bord-bot p-bot-16">GPT Pro</h3>
		<p class="bord-bot p-bot-32">A WIP reverse-engineered build referencing the fantastic <a href="https://gptpro.sh/" target="_blank" rel="noreferrer">GPTPro</a> by <a href="https://twitter.com/ankurpsinghal" target="_blank" rel="noreferrer">Ankur Singhal</a> (who also created <a href="https://sveltelegos.com/" target="_blank" rel="noreferrer">Svelte Legos</a>).</p>
		<div class="rta-column p-top-32">
			{#if !isLoading && $APIKeyStore !== null && isValidKey}
				<Messenger apiKey={$APIKeyStore} />
			{:else}
				<Home {onDone} />
			{/if}
		</div>
		<slot></slot>
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
		<p transition:slide={{ duration: 200, easing: circOut}}><strong><a href="/gptpro">GPT HOME</a></strong></p>
		{/if}
	</div>
</div>

