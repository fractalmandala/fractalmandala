<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { onMount } from 'svelte';

	const messages = [
		'Sending the request to GPT',
		'GPT is preparing the reply',
		'Sometimes longer messages take a while on network to arrive',
		'OpenAI must be going through a huge traffic'
	];
	let currentMessageIndex = 0;

	onMount(() => {
		setInterval(() => {
			currentMessageIndex = (currentMessageIndex + 1) % messages.length;
		}, 2500);
	});
</script>

<div class="rta-column" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	{#each messages as message, index}
		{#if currentMessageIndex === index}
			<p>{message}.</p>
		{/if}
	{/each}
</div>
