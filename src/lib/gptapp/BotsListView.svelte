<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { BotsList } from './Bots';
	import { slide } from 'svelte/transition'
	import type { Bot } from './types';
	import { onMountFocusRef } from './utils';

	export let onBackClick: () => void;
	export let onBotClick: (bot: Bot) => void;
	export let displayBackButton: boolean = true;

	let botsListFilterText = '';

	const botsList = BotsList;

	$: filteredBotsList = botsList.filter(
		(bot) => bot.name.toLowerCase().indexOf(botsListFilterText.toLowerCase()) !== -1
	);

	const ref = onMountFocusRef();
</script>

<div transition:slide class="rta-column" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	{#if displayBackButton}
		<button on:click={onBackClick} class="blank-button">
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M8.33799 1.24431C8.33799 0.856687 8.09175 0.511878 7.72511 0.386083C7.35847 0.260281 6.95241 0.381283 6.71443 0.687259L0.363007 8.85341C0.108164 9.18105 0.108164 9.63981 0.363007 9.96745L6.71443 18.1336C6.95241 18.4396 7.35847 18.5606 7.72511 18.4348C8.09175 18.309 8.33799 17.9642 8.33799 17.5765V13.9564C13.2184 14.0581 15.5633 14.9843 16.7412 15.9916C17.8609 16.9491 18.0648 18.0746 18.2786 19.2544C18.2968 19.3551 18.3153 19.4567 18.3342 19.558C18.4184 20.0081 18.8247 20.3249 19.2818 20.2969C19.7387 20.2688 20.1032 19.9047 20.1318 19.4478C20.2873 16.9544 20.0537 13.3413 18.2924 10.3184C16.5831 7.38496 13.5049 5.12953 8.33799 4.89403V1.24431Z" fill="#474747"/>
			</svg>
		</button>
	{/if}
	<!-- bots list -->
	<div class="rta-row colgap200">
		{#each filteredBotsList as bot}
			<button on:click={() => onBotClick(bot)} class="mainbutton">
				{bot.name}
			</button>
		{/each}
	</div>
</div>
