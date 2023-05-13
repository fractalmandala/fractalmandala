<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
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

<div transition:slide class="rta-row colgap200" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	{#each filteredBotsList as bot}
		<button on:click={() => onBotClick(bot)} class="blank-button blank2">
			{bot.name}
		</button>
	{/each}
</div>

<style lang="sass">

.blank-button.blank2
	color: var(--textone)
	font-family: 'Spline Sans', sans-serif
	text-transform: uppercase
	font-size: 12px
	cursor: pointer
	&:hover
		color: var(--green)

</style>

