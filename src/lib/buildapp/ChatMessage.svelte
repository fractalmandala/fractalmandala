<script lang="ts">
	import { ChatCompletion } from '$lib/gptapp/GPT';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { scrollToBottomAction, alertAction, windowSizeStore, messagesStore } from 'svelte-legos';
	import type { Bot, ChatConversation, ChatMessage, OpenAIControls } from '$lib/gptapp/types';
	import { conversationsStore, localStorageMiddleware } from '$lib/gptapp/conversationsStore';
	import ConversationView from '$lib/gptapp/ConversationView.svelte';
	import { filtersStore } from '$lib/gptapp/filterStore';
	import MessageView from '$lib/gptapp/MessageView.svelte';
	import MessageInputBar from '$lib/gptapp/MessageInputBar.svelte';
	import { writable } from 'svelte/store';
	import SettingsModal from '$lib/gptapp/SettingsModal.svelte';
	import BotsListView from '$lib/gptapp/BotsListView.svelte';
	import ConversationSettingsModal from '$lib/gptapp/ConversationSettingsModal.svelte';
	import { areEqualShallow } from '$lib/gptapp/utils';
	import { openAIGlobalControls } from '$lib/gptapp/openAIControlsStore';
	import { GetBotById, GetBotNameByBotId } from '$lib/gptapp/Bots';
	import { onMount } from 'svelte';
	import GptLoadingMessages from '$lib/gptapp/GPTLoadingMessages.svelte';
	import Archive from '$lib/icons/Archive.svelte';
	import Delete from '$lib/icons/Delete.svelte';
	import List from '$lib/icons/List.svelte';
	import Settings from '$lib/icons/Settings.svelte';
	import Star from '$lib/icons/Star.svelte';
	import Tag from '$lib/icons/Tag.svelte';
	import Send from '$lib/icons/Send.svelte'
	import Add from '$lib/icons/Add.svelte'
	import Renew from '$lib/icons/Renew.svelte'

	export let apiKey: string;
	const conversations = localStorageMiddleware(conversationsStore(), 'conversations');

	let currentSelectedConversationId: string | null = null;

	let isLoading: boolean = false;
	const currentMessagePrompt = writable('');
	const inputRef = writable<HTMLInputElement | null>(null);

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

	function handleArchiveClick() {
		if (currentSelectedConversationId !== null) {
			conversations.toggleConversationArchive(currentSelectedConversationId);
		}

		currentSelectedConversationId = null;

		if (isMobile) {
			isSidebarVisible = true;
		}
	}

	function handleFavoriteClick() {
		if (currentSelectedConversationId !== null) {
			conversations.toggleConversationFavorite(currentSelectedConversationId);
		}
	}

	function handlePinClick() {
		if (currentSelectedConversationId !== null) {
			conversations.toggleConversationPinned(currentSelectedConversationId);
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

<div
	class="rta-column rowgap200 chatcont fullH"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:dark={$themeMode}
	class:light={!$themeMode}
>
	{#if currentSelectedConversation}

		<div class="rta-column rowgap300 ybetween fullH" use:scrollToBottomAction>
			<div>
				{#if currentSelectedConversation.messages.length === 0 && !isLoading}
					<p>Enter a message ↓ and start chatting ⚡️!</p>
				{:else}
					<div class="rta-column rowgap200">
						{#each currentSelectedConversation.messages as message}
							<MessageView {message} />
						{/each}
						{#if isLoading}
							<GptLoadingMessages />
						{/if}
					</div>
				{/if}
			</div>
			<div>
				<MessageInputBar
					disabled={isLoading}
					onSend={handleSend}
					value={currentMessagePrompt}
					ref={inputRef}
				/>
			</div>
		</div>
	{:else}
		<div class="h-full flex items-center justify-center flex-col">
			<p class="text-gray-400 mt-4">Pick a bot ← and start chatting ⚡️!</p>
		</div>
	{/if}
</div>

<style lang="sass">

.levelzero



</style>
