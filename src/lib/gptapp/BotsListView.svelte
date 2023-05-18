<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import { BotsList } from '$lib/gptapp/Bots';
	import { slide } from 'svelte/transition'
	import type { Bot } from './types';
	import { onMountFocusRef } from '$lib/gptapp/utils';
	let myButton = Array(8).fill(false)

	function toggleButton(index:number) {
		myButton[index] = !myButton[index]
		for ( let i = 0; i < myButton.length; i ++ ) {
			if ( i !== index && myButton[i] === true ) {
				myButton[i] = false
			}
		}
	}

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

<div transition:slide class="rta-column colgap200" class:dark={$themeMode} class:light={!$themeMode}>
	{#each filteredBotsList as bot}
		<button on:click={() => onBotClick(bot)} class="blank-button">
			{bot.name}
		</button>
	{/each}
</div>

<style lang="sass">

.blank-button
	color: var(--textone)
	text-transform: uppercase
	cursor: pointer
	&:hover
		color: var(--green)

</style>

