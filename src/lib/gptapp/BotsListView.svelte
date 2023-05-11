<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { BotsList } from './Bots';
	import { slide } from 'svelte/transition'
	import type { Bot } from './types';
	import { onMountFocusRef } from './utils';

	export let onBotClick: (bot: Bot) => void;

	let botsListFilterText = '';
	let fake = false

	function fauxfake(){
		fake = !fake
	}

	const botsList = BotsList;

	$: filteredBotsList = botsList.filter(
		(bot) => bot.name.toLowerCase().indexOf(botsListFilterText.toLowerCase()) !== -1
	);

	const ref = onMountFocusRef();
</script>

<div transition:slide class="rta-column xright null rowgap100 p-top-32" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<h6>Select Agent:</h6>
	{#each filteredBotsList as bot}
		<p on:click={() => onBotClick(bot)} on:keydown={fauxfake}>
			{bot.name}
		</p>
	{/each}
</div>

<style lang="sass">

h6
	margin-bottom: 4px
	color: var(--opposite)

</style>
