<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { ChatCompletion } from '$lib/gptapp/GPT';
	import { scrollToBottomAction, alertAction, windowSizeStore, messagesStore } from 'svelte-legos';
	import type { Bot, ChatConversation, ChatMessage, OpenAIControls } from '$lib/gptapp/types';
	import { conversationsStore, localStorageMiddleware } from '$lib/gptapp/conversationsStore';
	import ConversationView from '$lib/gptapp/ConversationView.svelte';
	import { filtersStore } from '$lib/gptapp/filterStore';
	import Loader from '$lib/assets/Loader.svelte'
	import MessageView from '$lib/gptapp/MessageView.svelte';
	import MessageInputBar from '$lib/gptapp/MessageInputBar.svelte';
	import { writable } from 'svelte/store';
	import SettingsModal from './SettingsModal.svelte';
	import BotsListView from './BotsListView.svelte';
	import ConversationSettingsModal from './ConversationSettingsModal.svelte';
	import { areEqualShallow } from './utils';
	import { openAIGlobalControls } from './openAIControlsStore';
	import { GetBotById, GetBotNameByBotId } from './Bots';
	import { onMount } from 'svelte';
	import GptLoadingMessages from './GPTLoadingMessages.svelte';

	export let apiKey: string;
	const conversations = localStorageMiddleware(conversationsStore(), 'conversations');

	let currentSelectedConversationId: string | null = null;

	let isLoading: boolean = false;
	const currentMessagePrompt = writable('');
	const inputRef = writable<HTMLTextAreaElement | null>(null);

	let isSettingsOpen = false;

	$: currentMessage = $currentMessagePrompt.trim();
	$: currentSelectedConversation = $conversations.find(
		(conversation) => conversation.id === currentSelectedConversationId
	);

	const windowSize = windowSizeStore();
	$: isMobile = $windowSize.width < 768;

	const { isArchived: isArchivedFilter, isFavorite: isFavoriteFilter } = filtersStore();

	function handleSend() {
		if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
			console.warn('OpenAI API key not defined');
			return;
		}

		if (currentMessage.length > 0 && currentSelectedConversation !== undefined) {
			const userMessage = {
				id: Math.random().toString(),
				content: currentMessage,
				from: 'user'
			} as ChatMessage;

			isLoading = true;

			ChatCompletion(
				apiKey,
				currentSelectedConversation.botId,
				currentSelectedConversation.messages.concat([userMessage]),
				currentSelectedConversation.controls || $openAIGlobalControls
				// controller.signal
			)
				.then((res: any) => {
					// setData(res);
					const {
						choices: [
							{
								message: { content }
							}
						]
					} = res;

					conversations.update((conversations) => {
						return conversations.map((conversation) => {
							if (conversation.id === currentSelectedConversationId) {
								if (conversation.messages.length === 0) {
									return {
										...conversation,
										updatedAt: Date.now(),
										subTitle: userMessage.content,
										messages: [
											...conversation.messages,
											userMessage,
											{
												id: Math.random().toString(),
												content,
												from: 'assistant'
											}
										]
									};
								} else {
									return {
										...conversation,
										updatedAt: Date.now(),
										messages: [
											...conversation.messages,
											userMessage,
											{
												id: Math.random().toString(),
												content,
												from: 'assistant'
											}
										]
									};
								}
							}

							return conversation;
						});
					});

					currentMessagePrompt.set('');
				})
				.catch((e) => {
					if (e.message === 'Invalid API key provided!') {
						messagesStore('Invalid API key provided!');
						isSettingsOpen = true;
					} else if (e.message === 'The user aborted a request.') {
					} else {
						messagesStore(e.message);
					}
				})
				.finally(() => {
					// clearTimeout(timer);
					isLoading = false;
					setTimeout(() => {
						$inputRef?.focus();
					}, 1);
				});

			// let timer: any;
			// let controller: any;

			// function start() {
			// 	if (!currentSelectedConversation) return;

			// 	controller = new AbortController();

			// 	clearTimeout(timer);
			// 	timer = setTimeout(() => {
			// 		controller.abort();
			// 		controller = undefined;
			// 		isLoading = false;
			// 		start();
			// 	}, 1000);
			// }

			// start();
		}
	}

	function handleConversationClick(conversation: ChatConversation) {
		currentSelectedConversationId = conversation.id;
		if (isMobile) isSidebarVisible = false;
	}

	function handleDeleteClick() {
		if (currentSelectedConversationId !== null) {
			conversations.deleteConversation(currentSelectedConversationId);
		}

		currentSelectedConversationId = null;

		if (isMobile) {
			isSidebarVisible = true;
		}
	}

	let filterRef: HTMLElement;
	let isFilterOpen = false;

	function clickOutsideAction<T extends Element>(
		node: T,
		{ cb, trigger }: { cb: Function; trigger?: HTMLElement }
	) {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target !== null && !node.contains(target as Node)) {
				if (trigger) {
					if (!trigger.contains(target as Node)) {
						cb();
					}
				} else {
					cb();
				}
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	function handleFilterClick() {
		isFilterOpen = !isFilterOpen;
	}

	function handleFilterClickOutside() {
		isFilterOpen = false;
	}

	$: filteredConversations = $conversations.filter((conversation) => {
		const isArchived = $isArchivedFilter;
		const isFavorite = $isFavoriteFilter;

		let check = conversation.isArchived === isArchived;

		if (isFavorite === true) {
			check = check && conversation.isFavorite;
		}

		return check && !conversation.isPinned;
	});

	let isBotsListVisible = false;

	function handleBotClick(bot: Bot) {
		const id = conversations.createNewConversation(bot.id);
		isBotsListVisible = false;
		currentSelectedConversationId = id;
		if (isMobile) isSidebarVisible = false;
	}

	let isSidebarVisible = true;

	$: pinnedConversations = $conversations.filter((conversation) => conversation.isPinned);

	let isConversationSettingsOpen = false;

	function handleOpenAIControlsUpdateForConversation(controls: OpenAIControls) {
		if (
			currentSelectedConversationId !== null &&
			!areEqualShallow(controls, $openAIGlobalControls)
		) {
			conversations.updateConversationControls(currentSelectedConversationId, controls);
		}

		isConversationSettingsOpen = false;
	}

	$: currentConversationSelectedModel =
		currentSelectedConversation?.controls?.model || $openAIGlobalControls.model;

	function handleModelChange(e: Event) {
		const controls = currentSelectedConversation?.controls || $openAIGlobalControls;
		const model = (e.target as HTMLSelectElement).value;
		if (model && model.trim().length > 0) {
			handleOpenAIControlsUpdateForConversation({ ...controls, model });
		}
	}

	onMount(() => {
		if (pinnedConversations.length > 0) {
			currentSelectedConversationId = pinnedConversations[0].id;
		} else if (filteredConversations.length > 0) {
			currentSelectedConversationId = filteredConversations[0].id;
		}
	});
</script>

<div class="rta-column rowgap200" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<BotsListView onBotClick={handleBotClick} />
	<div class="rta-column rowgap400">
		{#if currentSelectedConversation}	
			<div class="rta-column rowgap200 actualchat-container">
				<div class="rta-column" use:scrollToBottomAction>
					{#if currentSelectedConversation.messages.length === 0 && !isLoading}
						<h6 class="is-green tt-u" style="margin-bottom: 0">Agent: <span>{GetBotNameByBotId(currentSelectedConversation.botId)}</span></h6>
					{:else}
					{#each currentSelectedConversation.messages as message}
						<MessageView {message} />
					{/each}
					{#if isLoading}
						<GptLoadingMessages />
					{/if}
					{/if}
				</div>
				<MessageInputBar
					disabled={isLoading}
					onSend={handleSend}
					value={currentMessagePrompt}
					ref={inputRef}
				/>
			</div>

		{/if}
	</div>

</div>

{#if isSettingsOpen}
	<SettingsModal onClose={() => (isSettingsOpen = false)} />
{/if}

{#if isConversationSettingsOpen}
	<ConversationSettingsModal
		onUpdate={handleOpenAIControlsUpdateForConversation}
		controls={currentSelectedConversation?.controls}
	/>
{/if}

<style lang="sass">


.dark
	.actualchat-container
		background: rgba(8, 8, 8, 0.64)
		border-radius: 16px
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1)
		backdrop-filter: blur(6.9px)
		-webkit-backdrop-filter: blur(6.9px)
		border: 1px solid rgba(255, 255, 255, 0.14)
		@media screen and (min-width: 1024px)
			padding: 24px


</style>
