<script lang="ts">
	import visibilityMode from '$lib/stores/visibility';
	import { alertAction, windowSizeStore } from 'svelte-legos';
	import type { Bot, ChatConversation, OpenAIControls } from '$lib/gptapp/types';
	import { conversationsStore, localStorageMiddleware } from '$lib/gptapp/conversationsStore';
	import ConversationView from '$lib/gptapp/ConversationView.svelte';
	import { filtersStore } from '$lib/gptapp/filterStore';
	import SettingsModal from './SettingsModal.svelte';
	import BotsListView from './BotsListView.svelte';
	import ConversationSettingsModal from './ConversationSettingsModal.svelte';
	import { areEqualShallow } from './utils';
	import { openAIGlobalControls } from './openAIControlsStore';
	import { GetBotById, GetBotNameByBotId } from './Bots';
	import { onMount } from 'svelte';
	import Revolver from '$lib/assets/Revolver.svelte'
	import Archive from '$lib/icons/Archive.svelte'
	import Delete from '$lib/icons/Delete.svelte'
	import List from '$lib/icons/List.svelte'
	import Settings from '$lib/icons/Settings.svelte'
	import Star from '$lib/icons/Star.svelte'
	import Tag from '$lib/icons/Tag.svelte'

	const conversations = localStorageMiddleware(conversationsStore(), 'conversations');
	let fake = false;
	let currentSelectedConversationId: string | null = null;

	let isSettingsOpen = false;

	$: currentSelectedConversation = $conversations.find(
		(conversation) => conversation.id === currentSelectedConversationId
	);

	const windowSize = windowSizeStore();
	$: isMobile = $windowSize.width < 768;

	const { isArchived: isArchivedFilter, isFavorite: isFavoriteFilter } = filtersStore();

	function toggleSettingsView() {
		isSettingsOpen = !isSettingsOpen;
	}

	function toggleBotsList() {
		isBotsListVisible = !isBotsListVisible;
	}

	function fauxfake() {
		fake = !fake;
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
		location.reload();
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
	<div class="rta-row ycenter colgap100 xend mainrow">
		<!--
		<div class="rta-row colgap100" aria-hidden on:click={(e) => { e.stopPropagation(); }} use:clickOutsideAction={{ cb: handleFilterClickOutside, trigger: filterRef }}>
			<div class="rta-row" on:click={() => (currentSelectedConversationId = null)} aria-hidden>
				<label for="is-archived">Archived</label>
				<input type="checkbox" id="is-archived" bind:checked={$isArchivedFilter} />
			</div>
			<div class="rta-row" on:click={() => (currentSelectedConversationId = null)} aria-hidden>
				<label for="is-favorite">Favorite</label>
				<input type="checkbox" id="is-favorite" bind:checked={$isFavoriteFilter} />
			</div>
		</div>
		-->
		<button
			use:alertAction={{
				title: 'Are you sure?',
				description: "You won't be able to recover this conversation!",
				onOk: handleDeleteClick
			}}
			class="blank-button"
			>
			<Delete/>
		</button>
		<button on:click={handleArchiveClick} class="blank-button">
			<Archive/>
		</button>
		<button on:click={handleFavoriteClick} class="blank-button">
			<Star/>
		</button>
		<button on:click={handlePinClick} class="blank-button">
			<Tag/>
		</button>
		<button on:click={toggleBotsList} class="blank-button">
			<List/>
		</button>
		<button class="blank-button" on:click={toggleSettingsView}>
			<Settings/>
		</button>
		<a class="blank-button" href="/gptpro">
			<Revolver/>
		</a>
	</div>

	<div class="rta-column rowgap400 p-top-16">
		{#if currentSelectedConversation}
			<div class="rta-column colgap100 xright">
				{#if !isSidebarVisible}
					<button on:click={() => (isSidebarVisible = true)}>
						<span><small>ICON</small></span>
						<span><small>ICON</small></span>
					</button>
				{/if}
				<div class="rta-row xend ycenter colgap200 p-bot-16">
				</div>
			</div>
		{/if}
	</div>

	{#if isSidebarVisible}
		<div class="rta-column ta-r p-top-16 p-bot-16 bord-top bord-bot">
			<p class="tt-u"><strong>Latest:</strong></p>
			{#each pinnedConversations as conversation}
				<ConversationView {conversation} {handleConversationClick} />
			{/each}
			{#each filteredConversations as conversation}
				<ConversationView {conversation} {handleConversationClick} />
			{/each}
		</div>
	{/if}

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

.mainrow
	.blank-button
		height: 20px

</style>
