<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import Star from '$lib/icons/Star.svelte'
	import type { ChatConversation } from '$lib/gptapp/types';
	import { GetBotNameByBotId } from './Bots';
	let fake = false

	function fauxfake(){
		fake = !fake
	}

	export let conversation: ChatConversation;
	export let handleConversationClick: (conversation: ChatConversation) => void;
	export let isSelected: boolean;
</script>

<div on:click={() => handleConversationClick(conversation)} on:keydown={fauxfake}
	class="{isSelected ? 'greened' : 'whitened'}" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="rta-row colgap100 ycenter null">
		<p><b>{conversation.subTitle.length > 50 ? conversation.subTitle.slice(0, 50) + '...' : conversation.subTitle}</b></p>
		<small>{GetBotNameByBotId(conversation.botId)}</small>
	</div>
	{#if conversation.isFavorite}
		<Star/>
	{/if}
</div>

<style lang="sass">

.dark.greened
	color: var(--green)

.dark.whitened
	color: var(--opposite)


</style>
