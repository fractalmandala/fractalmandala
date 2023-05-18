<script lang="ts">

	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition'
	import Chat from './Icons/Chat.svelte';
	import Pencil from '$lib/icons/Edit.svelte';
	import Plus from '$lib/icons/Add.svelte';
	import Trash from '$lib/icons/Delete.svelte';

	import { chatMessages } from '$lib/agents/chat-messages';
	import {
		chatHistory,
		filterHistory,
		chatHistorySubscription,
		loadMessages
	} from '$lib/agents/chat-history';

	let chatHistoryKeys: any = [];
	let iconColor = '#0BC160'
	let dimension = 18

	onMount(() => {
		chatHistorySubscription.set($chatHistory);
		chatHistorySubscription.subscribe((value: any) => {
			chatHistoryKeys = Object.keys(value);
		});
	});
</script>

<div
	class="rta-column rowgap200"
	transition:slide
>
	<button
		on:click={chatMessages.reset}
		class="blank-button"
	>
		<Plus color={iconColor}/>
	</button>

	{#if chatHistoryKeys.length > 0}
		{#each chatHistoryKeys as message (message)}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click={() => loadMessages(message)}
				class="rta-column null chatbox"
				>
				<small class="tt-c">{message.slice(0,50)}</small>

				<div class="rta-row">
					<button on:click={() => loadMessages(message)} class="blank-button">
						<Pencil dimension={dimension}/>
					</button>
					<button
						on:click|preventDefault={() => filterHistory(message)}
						class="blank-button"
						>
						<Trash dimension={dimension} />
					</button>
				</div>
			</div>
		{/each}
	{/if}
</div>


<style lang="sass">

.chatbox
	border: 1px solid var(--background)
	border-radius: 6px
	padding: 4px 16px
	background: var(--background)
	transition: 0.08s
	&:hover
		box-shadow: 5px 8px 8px var(--borderline)

</style>