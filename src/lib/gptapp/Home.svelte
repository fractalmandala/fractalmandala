<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { onMount } from 'svelte';
	import ApiKeyForm from './APIKeyForm.svelte';

	export let onDone: () => void;

	let isLoading = true;

	onMount(() => {
		setTimeout(() => {
			isLoading = false;
			onDone();
		}, 1500);
	});
</script>

<div class="rta-column" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<h5>ChatGPT UI with<br/><span>Superpowers</span></h5>
	<p>
		ChatGPT interface with ultra-level enhanced features. Use it like your daily messenger with thousands of prompts to chat.
	</p>
	<div class="rta-column">
		{#if !isLoading}
			<ApiKeyForm />
		{:else}
			<p>Checking your key...</p>
		{/if}
	</div>
</div>
