<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
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
	class="{isSelected ? 'greened' : 'whitened'}" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<div>
		{#if conversation.isPinned}
			<div class="mr-2">📌</div>
		{/if}
	</div>
	<div class="rta-row colgap100 ycenter xend">
		<p class="spline">{conversation.subTitle.length > 50 ? conversation.subTitle.slice(0, 50) + '...' : conversation.subTitle}</p>
		<small class="spline">{GetBotNameByBotId(conversation.botId)}</small>
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

.spline
	margin-bottom: 8px

small.spline
	font-family: 'Spline Sans', sans-serif
	font-size: 10px
	text-transform: uppercase

</style>
