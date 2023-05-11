<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import type { ChatConversation } from '$lib/gptapp/types';
	import { GetBotNameByBotId } from './Bots';

	export let conversation: ChatConversation;
	export let handleConversationClick: (conversation: ChatConversation) => void;
</script>

<div
	on:click={() => handleConversationClick(conversation)}
	class="rta-column"
	aria-hidden
	class:light={!$visibilityMode} class:dark={$visibilityMode}
>
	<div class="mb-4 flex justify-between items-center">
		<div class="rta-column">
			{#if conversation.isPinned}
				<div class="mr-2">📌</div>
			{/if}
			{GetBotNameByBotId(conversation.botId)}
		</div>
		{#if conversation.updatedAt}
			<p>
				{conversation.updatedAt}
			</p>
		{/if}
	</div>
	<div class="rta-column">
		<p>
			{conversation.subTitle.length > 50
				? conversation.subTitle.slice(0, 50) + '...'
				: conversation.subTitle}
		</p>
		{#if conversation.isFavorite}
			<p>FAV</p>
		{/if}
	</div>
</div>
