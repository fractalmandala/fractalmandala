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

<div transition:slide class="rta-row xcenter-d p-bot-32 ycenter null rowgap100 colgap200 p-top-32" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	{#each filteredBotsList as bot, i}
		<p on:click={() => onBotClick(bot)} on:click={() => toggleButton(i)} on:keydown={fauxfake} class="spline tt-u" class:selected={myButton[i]}>
			{bot.name}
		</p>
	{/each}
</div>

<style lang="sass">

.spline
	cursor: pointer
	color: var(--textone)
	border: 1px solid var(--textone)
	font-size: 12px
	padding: 2px 6px
	border-radius: 4px
	transition: 0.12s
	&:hover
		border: 1px solid var(--opposite)
		color: var(--opposite)

.spline.selected
	background: #10D56C
	border: 1px solid #10D56C
	color: #474747
		

</style>
