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

<div class="rta-column" class:light={!$visibilityMode} class:dark={$visibilityMode}>

	<div class="rta-row colgap200">
		<button class="blank-button" on:click={() => (isSettingsOpen = true)}>
			<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M19.5761 12.4257L19.5556 12.4092L18.1835 11.3331C18.0966 11.2644 18.0272 11.176 17.9811 11.0753C17.935 10.9745 17.9135 10.8643 17.9183 10.7536V10.251C17.9139 10.141 17.9357 10.0315 17.9819 9.93159C18.0281 9.83167 18.0973 9.74413 18.1839 9.67617L19.5556 8.59965L19.5761 8.58313C19.7876 8.4069 19.9296 8.16116 19.9766 7.88986C20.0236 7.61856 19.9726 7.33938 19.8326 7.10226L17.9756 3.88922C17.9735 3.88619 17.9716 3.88299 17.97 3.87965C17.8293 3.64581 17.6111 3.46863 17.3534 3.37888C17.0957 3.28913 16.8146 3.29248 16.5591 3.38835L16.5439 3.394L14.9309 4.04313C14.8291 4.08429 14.7189 4.10068 14.6095 4.09092C14.5002 4.08117 14.3947 4.04557 14.3017 3.98704C14.1591 3.89719 14.0142 3.81226 13.8669 3.73226C13.7715 3.68049 13.6895 3.60701 13.6277 3.51774C13.5658 3.42847 13.5258 3.32592 13.5109 3.21835L13.2678 1.49704L13.2626 1.46574C13.2097 1.19913 13.0666 0.958857 12.8574 0.785301C12.6483 0.611745 12.3857 0.515484 12.1139 0.512695H8.39565C8.12002 0.513577 7.85355 0.611702 7.64318 0.789784C7.4328 0.967865 7.29203 1.21448 7.24565 1.48617L7.24173 1.51052L6.99956 3.2353C6.9847 3.34257 6.94501 3.44488 6.88365 3.5341C6.82228 3.62332 6.74093 3.69698 6.64608 3.74922C6.49738 3.82922 6.35217 3.914 6.2113 4.00226C6.11854 4.06043 6.01331 4.09576 5.90425 4.10536C5.79518 4.11496 5.6854 4.09855 5.58391 4.05748L3.96956 3.4053L3.95434 3.39922C3.69846 3.30325 3.41702 3.30002 3.159 3.39011C2.90099 3.48019 2.68272 3.65788 2.54217 3.89226L2.53652 3.90183L0.67695 7.11704C0.53679 7.35441 0.485633 7.63389 0.532629 7.90551C0.579625 8.17713 0.721709 8.42318 0.933472 8.59965L0.953907 8.61617L2.32608 9.69226C2.41298 9.761 2.48233 9.84938 2.52843 9.95013C2.57454 10.0509 2.59608 10.1611 2.5913 10.2718V10.7744C2.59565 10.8844 2.57384 10.9939 2.52766 11.0938C2.48148 11.1937 2.41224 11.2813 2.32565 11.3492L0.953907 12.4257L0.933472 12.4423C0.721918 12.6185 0.57995 12.8642 0.532954 13.1355C0.485959 13.4068 0.537 13.686 0.67695 13.9231L2.53391 17.1362C2.53604 17.1392 2.53793 17.1424 2.53956 17.1457C2.68026 17.3796 2.89842 17.5568 3.15615 17.6465C3.41389 17.7363 3.69491 17.7329 3.95043 17.637L3.96565 17.6314L5.57738 16.9823C5.67919 16.9411 5.78933 16.9247 5.89871 16.9345C6.00809 16.9442 6.11359 16.9798 6.20652 17.0383C6.34912 17.1285 6.49405 17.2134 6.6413 17.2931C6.73677 17.3449 6.81873 17.4184 6.88059 17.5077C6.94244 17.5969 6.98245 17.6995 6.99739 17.807L7.23912 19.5283L7.24434 19.5597C7.29734 19.8267 7.4408 20.0673 7.65052 20.2409C7.86024 20.4145 8.1234 20.5105 8.39565 20.5127H12.1139C12.3895 20.5118 12.656 20.4137 12.8664 20.2356C13.0767 20.0575 13.2175 19.8109 13.2639 19.5392L13.2678 19.5149L13.51 17.7901C13.5251 17.6826 13.5651 17.5802 13.6269 17.4909C13.6886 17.4017 13.7704 17.3282 13.8656 17.2762C14.0143 17.1962 14.1596 17.1114 14.3004 17.0231C14.3932 16.965 14.4984 16.9296 14.6075 16.92C14.7165 16.9104 14.8263 16.9268 14.9278 16.9679L16.5422 17.6179L16.5574 17.624C16.8133 17.7201 17.0947 17.7235 17.3528 17.6334C17.6109 17.5433 17.8291 17.3655 17.9696 17.131C17.9713 17.1277 17.9732 17.1245 17.9752 17.1214L19.8322 13.9088C19.9726 13.6714 20.0239 13.3919 19.977 13.1201C19.9301 12.8484 19.788 12.6022 19.5761 12.4257ZM13.7291 10.6762C13.6975 11.3495 13.4709 11.9991 13.0769 12.546C12.6829 13.0928 12.1384 13.5135 11.5098 13.7567C10.8812 13.9999 10.1954 14.0553 9.53595 13.916C8.87646 13.7767 8.27164 13.4488 7.79505 12.9721C7.31847 12.4955 6.99063 11.8906 6.85143 11.2311C6.71222 10.5716 6.76764 9.88588 7.01094 9.25729C7.25424 8.62869 7.67493 8.08433 8.22188 7.69039C8.76882 7.29646 9.41843 7.06993 10.0917 7.03835C10.5751 7.01707 11.0576 7.0966 11.5086 7.27189C11.9596 7.44719 12.3691 7.7144 12.7112 8.05655C13.0533 8.3987 13.3205 8.80829 13.4957 9.25929C13.671 9.71028 13.7505 10.1928 13.7291 10.6762Z" fill="#474747"/>
			</svg>
		</button>
		<button on:click={handleFilterClick} bind:this={filterRef} class="blank-button">
			<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M15.7766 0.470703H1.27822C0.612028 0.470703 0.275872 1.27902 0.747903 1.75105L6.52734 7.53136V13.9707C6.52734 14.2154 6.64675 14.4448 6.84725 14.5851L9.34725 16.3345C9.84047 16.6798 10.5273 16.3299 10.5273 15.7201V7.53136L16.3069 1.75105C16.778 1.27995 16.4442 0.470703 15.7766 0.470703Z" fill="#474747"/>
			</svg>
			{#if isFilterOpen}
				<div class="rta-row" aria-hidden on:click={(e) => { e.stopPropagation();}} use:clickOutsideAction={{ cb: handleFilterClickOutside, trigger: filterRef }}>
					<div class="rta-column" on:click={() => (currentSelectedConversationId = null)} aria-hidden>
						<label for="is-archived" class="cursor-pointer">Archived</label>
						<input type="checkbox" id="is-archived" bind:checked={$isArchivedFilter} />
					</div>
					<div class="rta-column" on:click={() => (currentSelectedConversationId = null)} aria-hidden>
						<label for="is-favorite" class="cursor-pointer">Favorite</label>
						<input type="checkbox" id="is-favorite" bind:checked={$isFavoriteFilter} />
					</div>
				</div>
			{/if}
		</button>
		<button class="blank-button" on:click={() => (isSettingsOpen = true)}>
			<small>A</small>
		</button>
		{#if currentSelectedConversationId !== null}
			<button on:click={() => (isSidebarVisible = false)}>
				<small>IT</small>
			</button>
		{/if}
		<button on:click={() => (isBotsListVisible = true)} class="blank-button">
			<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.5625 0.285156H5.5625V5.28516H0.5625V0.285156ZM8.0625 1.53516H20.5625V4.03516H8.0625V1.53516ZM0.5625 7.78516H5.5625V12.7852H0.5625V7.78516ZM8.0625 9.03516H20.5625V11.5352H8.0625V9.03516ZM0.5625 15.2852H5.5625V20.2852H0.5625V15.2852ZM8.0625 16.5352H20.5625V19.0352H8.0625V16.5352Z" fill="#474747"/>
			</svg>
		</button>
		{#if isBotsListVisible || pinnedConversations.length + filteredConversations.length === 0}
			<BotsListView displayBackButton={!(pinnedConversations.length + filteredConversations.length === 0)} onBackClick={() => (isBotsListVisible = false)} onBotClick={handleBotClick}/>
		{/if}
	</div>


	{#if isSidebarVisible}
		<div class="rta-row">
				<!-- sidebar -->
			<div class="rta-column">
				{#each pinnedConversations as conversation}
					<ConversationView
						{conversation}
						{handleConversationClick}
					/>
				{/each}
				{#each filteredConversations as conversation}
					<ConversationView
						{conversation}
						{handleConversationClick}
					/>
				{/each}
			</div>
		</div>
	{/if}

	<div class="rta-column rowgap400">
		{#if currentSelectedConversation}

			<div class="rta-row colgap300">
				{#if !isSidebarVisible}
					<button on:click={() => (isSidebarVisible = true)}>
						<span><small>ICON</small></span>
						<span><small>ICON</small></span>
					</button>
				{/if}
				<button on:click={handlePinClick} class="blank-button">
					<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.4483 0.548254C14.9628 0.0602212 14.174 0.0577253 13.6834 0.543262C13.5536 0.673071 13.4638 0.826596 13.4026 0.986361C12.3641 3.15318 11.2208 4.37513 9.77792 5.09657C8.15905 5.8954 6.30053 6.45083 3.30493 6.45083C3.14267 6.45083 2.9804 6.48204 2.82813 6.54569C2.52233 6.67301 2.28018 6.9164 2.15287 7.22095C2.0268 7.5255 2.0268 7.87 2.15287 8.17455C2.21653 8.32808 2.30764 8.46662 2.42372 8.58145L6.47152 12.6293L0.808594 20.1807L8.36 14.5177L12.4066 18.5643C12.5214 18.6816 12.6599 18.7715 12.8135 18.8351C12.9657 18.8988 13.128 18.9325 13.2903 18.9325C13.4525 18.9325 13.6148 18.8988 13.7671 18.8351C14.0729 18.7078 14.3163 18.4669 14.4423 18.1599C14.506 18.0089 14.5384 17.8453 14.5384 17.6843C14.5384 14.6887 15.0926 12.8302 15.8902 11.2363C16.6104 9.79342 17.8323 8.6501 20.0004 7.61163C20.1614 7.55047 20.3137 7.4606 20.4423 7.33079C20.9278 6.84026 20.9253 6.05142 20.4373 5.56588L15.4483 0.548254Z" fill="#474747"/>
					</svg>
					<span class="rta-column">
						{currentSelectedConversation.isPinned ? 'Unpin' : 'Pin'}
					</span>
				</button>
				<select value={currentConversationSelectedModel} on:change={handleModelChange}>
					<option value="gpt-3.5-turbo">GPT-3.5-TURBO (Default ChatGPT)</option>
					<option value="gpt-3.5-turbo-0301">GPT-3.5-TURBO-0301</option>
					<option value="gpt-4">GPT-4 (Limited Beta)</option>
					<option value="gpt-4-0314">GPT-4-0314 (Limited Beta)</option>
					<option value="gpt-4-32k">GPT-4-32K (Limited Beta)</option>
					<option value="gpt-4-32k-0314">GPT-4-32K-0314 (Limited Beta)</option>
				</select>
				<button on:click={() => (isConversationSettingsOpen = true)} class="blank-button">
					<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.5761 12.4257L19.5556 12.4092L18.1835 11.3331C18.0966 11.2644 18.0272 11.176 17.9811 11.0753C17.935 10.9745 17.9135 10.8643 17.9183 10.7536V10.251C17.9139 10.141 17.9357 10.0315 17.9819 9.93159C18.0281 9.83167 18.0973 9.74413 18.1839 9.67617L19.5556 8.59965L19.5761 8.58313C19.7876 8.4069 19.9296 8.16116 19.9766 7.88986C20.0236 7.61856 19.9726 7.33938 19.8326 7.10226L17.9756 3.88922C17.9735 3.88619 17.9716 3.88299 17.97 3.87965C17.8293 3.64581 17.6111 3.46863 17.3534 3.37888C17.0957 3.28913 16.8146 3.29248 16.5591 3.38835L16.5439 3.394L14.9309 4.04313C14.8291 4.08429 14.7189 4.10068 14.6095 4.09092C14.5002 4.08117 14.3947 4.04557 14.3017 3.98704C14.1591 3.89719 14.0142 3.81226 13.8669 3.73226C13.7715 3.68049 13.6895 3.60701 13.6277 3.51774C13.5658 3.42847 13.5258 3.32592 13.5109 3.21835L13.2678 1.49704L13.2626 1.46574C13.2097 1.19913 13.0666 0.958857 12.8574 0.785301C12.6483 0.611745 12.3857 0.515484 12.1139 0.512695H8.39565C8.12002 0.513577 7.85355 0.611702 7.64318 0.789784C7.4328 0.967865 7.29203 1.21448 7.24565 1.48617L7.24173 1.51052L6.99956 3.2353C6.9847 3.34257 6.94501 3.44488 6.88365 3.5341C6.82228 3.62332 6.74093 3.69698 6.64608 3.74922C6.49738 3.82922 6.35217 3.914 6.2113 4.00226C6.11854 4.06043 6.01331 4.09576 5.90425 4.10536C5.79518 4.11496 5.6854 4.09855 5.58391 4.05748L3.96956 3.4053L3.95434 3.39922C3.69846 3.30325 3.41702 3.30002 3.159 3.39011C2.90099 3.48019 2.68272 3.65788 2.54217 3.89226L2.53652 3.90183L0.67695 7.11704C0.53679 7.35441 0.485633 7.63389 0.532629 7.90551C0.579625 8.17713 0.721709 8.42318 0.933472 8.59965L0.953907 8.61617L2.32608 9.69226C2.41298 9.761 2.48233 9.84938 2.52843 9.95013C2.57454 10.0509 2.59608 10.1611 2.5913 10.2718V10.7744C2.59565 10.8844 2.57384 10.9939 2.52766 11.0938C2.48148 11.1937 2.41224 11.2813 2.32565 11.3492L0.953907 12.4257L0.933472 12.4423C0.721918 12.6185 0.57995 12.8642 0.532954 13.1355C0.485959 13.4068 0.537 13.686 0.67695 13.9231L2.53391 17.1362C2.53604 17.1392 2.53793 17.1424 2.53956 17.1457C2.68026 17.3796 2.89842 17.5568 3.15615 17.6465C3.41389 17.7363 3.69491 17.7329 3.95043 17.637L3.96565 17.6314L5.57738 16.9823C5.67919 16.9411 5.78933 16.9247 5.89871 16.9345C6.00809 16.9442 6.11359 16.9798 6.20652 17.0383C6.34912 17.1285 6.49405 17.2134 6.6413 17.2931C6.73677 17.3449 6.81873 17.4184 6.88059 17.5077C6.94244 17.5969 6.98245 17.6995 6.99739 17.807L7.23912 19.5283L7.24434 19.5597C7.29734 19.8267 7.4408 20.0673 7.65052 20.2409C7.86024 20.4145 8.1234 20.5105 8.39565 20.5127H12.1139C12.3895 20.5118 12.656 20.4137 12.8664 20.2356C13.0767 20.0575 13.2175 19.8109 13.2639 19.5392L13.2678 19.5149L13.51 17.7901C13.5251 17.6826 13.5651 17.5802 13.6269 17.4909C13.6886 17.4017 13.7704 17.3282 13.8656 17.2762C14.0143 17.1962 14.1596 17.1114 14.3004 17.0231C14.3932 16.965 14.4984 16.9296 14.6075 16.92C14.7165 16.9104 14.8263 16.9268 14.9278 16.9679L16.5422 17.6179L16.5574 17.624C16.8133 17.7201 17.0947 17.7235 17.3528 17.6334C17.6109 17.5433 17.8291 17.3655 17.9696 17.131C17.9713 17.1277 17.9732 17.1245 17.9752 17.1214L19.8322 13.9088C19.9726 13.6714 20.0239 13.3919 19.977 13.1201C19.9301 12.8484 19.788 12.6022 19.5761 12.4257ZM13.7291 10.6762C13.6975 11.3495 13.4709 11.9991 13.0769 12.546C12.6829 13.0928 12.1384 13.5135 11.5098 13.7567C10.8812 13.9999 10.1954 14.0553 9.53595 13.916C8.87646 13.7767 8.27164 13.4488 7.79505 12.9721C7.31847 12.4955 6.99063 11.8906 6.85143 11.2311C6.71222 10.5716 6.76764 9.88588 7.01094 9.25729C7.25424 8.62869 7.67493 8.08433 8.22188 7.69039C8.76882 7.29646 9.41843 7.06993 10.0917 7.03835C10.5751 7.01707 11.0576 7.0966 11.5086 7.27189C11.9596 7.44719 12.3691 7.7144 12.7112 8.05655C13.0533 8.3987 13.3205 8.80829 13.4957 9.25929C13.671 9.71028 13.7505 10.1928 13.7291 10.6762Z" fill="#474747"/>
					</svg>
				</button>
				<button use:alertAction={{ title: 'Are you sure?', description: "You won't be able to recover this conversation!", onOk: handleDeleteClick}} class="blank-button rta-row ycenter">
					<svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.83377 20.3008H15.1671V4.74523H1.83377V20.3008ZM16.2782 1.41189H12.3893L11.2782 0.300781H5.72266L4.61154 1.41189H0.722656V3.63411H16.2782V1.41189Z" fill="#474747"/>
					</svg>
				</button>
				<button on:click={handleArchiveClick} class="blank-button rta-row ycenter colgap100">
					<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1.11111 7.77778H21.1111V18.8933C21.1111 19.5044 20.6167 20 20.0078 20H2.21444C2.06931 19.9999 1.92563 19.9711 1.79162 19.9154C1.65761 19.8597 1.53588 19.7781 1.43342 19.6753C1.33095 19.5726 1.24974 19.4506 1.19444 19.3164C1.13913 19.1822 1.11082 19.0385 1.11111 18.8933V7.77778ZM7.77778 10V12.2222H14.4444V10H7.77778ZM0 1.11111C0 0.497778 0.505556 0 1.10222 0H21.12C21.7289 0 22.2222 0.493333 22.2222 1.11111V5.55556H0V1.11111Z" fill="#474747"/>
					</svg>
					<small>
						{currentSelectedConversation.isArchived ? 'UnArchive' : 'Archive'}
					</small>
				</button>
				<button on:click={handleFavoriteClick} class="blank-button rta-row ycenter colgap100">
					<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M2.28495 20.3057H3.33758V6.62145H2.28495C1.7266 6.62145 1.19112 6.84326 0.796305 7.23807C0.401491 7.63288 0.179688 8.16837 0.179688 8.72672V18.2004C0.179688 18.7588 0.401491 19.2942 0.796305 19.689C1.19112 20.0839 1.7266 20.3057 2.28495 20.3057ZM19.1271 6.62145H11.7586L12.9397 3.07619C13.0451 2.75978 13.0738 2.42287 13.0234 2.0932C12.9731 1.76352 12.8452 1.45052 12.6502 1.17997C12.4552 0.909428 12.1987 0.689077 11.9019 0.53707C11.605 0.385063 11.2763 0.30575 10.9428 0.305664H10.706L5.44285 6.02988V20.3057H17.0218L21.1397 11.2572L21.2323 10.832V8.72672C21.2323 8.16837 21.0105 7.63288 20.6157 7.23807C20.2209 6.84326 19.6854 6.62145 19.1271 6.62145Z" fill="#474747"/>
					</svg>
					<small>
						{currentSelectedConversation.isFavorite ? 'Unlike' : 'Like'}
					</small>
				</button>
			</div>

			<div class="rta-column rowgap200 actualchat-container">
				<div class="rta-column" use:scrollToBottomAction>
					{#if currentSelectedConversation.messages.length === 0 && !isLoading}
						<h6 class="is-green p-top-32 bord-top tt-u" style="margin-bottom: 0">Agent: <span>{GetBotNameByBotId(currentSelectedConversation.botId)}</span></h6>
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
		onClose={() => (isConversationSettingsOpen = false)}
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
