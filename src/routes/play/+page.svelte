<script lang="ts">

	import { onMount } from 'svelte'
	import visibilityMode from '$lib/stores/visibility'
	import { entireProject } from '$lib/utils/localpulls'
	import { APIKeyStore } from '$lib/gptapp/APIKeyStore';
	import Home from '$lib/gptapp/Home.svelte';
	import Messenger from '$lib/gptapp/Messenger.svelte';
	
	let entirety:any

	$: isValidKey = typeof $APIKeyStore === 'string' && $APIKeyStore.startsWith('sk-');

	let isLoading = true;

	function onDone() {
		isLoading = false;
	}

	onMount(async() => {
		entirety = await entireProject()
	})

</script>

<div class="rta-column" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<h3 class="bord-bot p-bot-16">Just a playground for building stuff...</h3>
	{#if !isLoading && $APIKeyStore !== null && isValidKey}
		<Messenger apiKey={$APIKeyStore} />
	{:else}
		<Home {onDone} />
	{/if}
</div>