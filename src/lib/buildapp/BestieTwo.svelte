<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { getContext, setContext, tick } from 'svelte';
	import InputText from '$lib/deslib/InputText.svelte';
	import { writable } from 'svelte/store';
	import { page as page$ } from '$app/stores';
	import { browser } from '$app/environment';
	import { afterNavigate, goto } from '$app/navigation';
	import ApiModal from '$lib/buildapp/ApiModal.svelte';
	import Send from '$lib/icons/Send.svelte'
	import Add from '$lib/icons/Add.svelte'
	import Renew from '$lib/icons/Renew.svelte'

	let showApi = false;
	import {
		chatCompletion,
		createNewChat,
		createNewChatListItem,
		createSavedPrompt,
		isNotSystemMessage,
		resizeTextarea
	} from '$lib/buildapp/sharedutils';
	import {
		banners$,
		chatList$,
		chats$,
		gptModelVerified$,
		openAiApiKey$,
		savedPrompts$
	} from '$lib/buildapp/stores';
	import {
		BANNER_TYPE,
		ERROR,
		LOCAL_STORAGE_KEY,
		MESSAGE_ROLE,
		type Message
	} from '$lib/buildapp/types';
	import { CHAT_LABELLING_PROMPT, DEFAULT_SYSTEM_MESSAGE } from '$lib/buildapp/sharedconstants';

	import Hero from '$lib/buildapp/HeroChat.svelte';

	import ChatMessage from '$lib/buildapp/ChatMessage.svelte';
	import ChatSettingsPopover from '$lib/buildapp/ChatSettings.svelte';
	import SystemMessageModal from '$lib/buildapp/SystemMessage.svelte';

	export let chatId = '';

	let isLoading = false;
	let textareaRef: HTMLInputElement;
	let inputMessage = '';
	let messages =
		chatId && $chats$?.[chatId]
			? $chats$?.[chatId]?.messages?.filter?.(Boolean)
			: [DEFAULT_SYSTEM_MESSAGE];

	/**
	 * Messages
	 */
	$: systemMessage = messages?.find?.(
		(message: { role: any }) => message?.role === MESSAGE_ROLE.SYSTEM
	);
	$: hasChatMessages = messages?.filter?.(isNotSystemMessage).length > 0;
	$: enableRegenerateMessage = !isLoading && $openAiApiKey$ && messages.length > 2;

	/**
	 * Chat options popover
	 */
	let showChatSettings$ = writable(false);

	const extraOpts = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }]
	};

	// This actually works! References somehow get preserved when passed into modal and it updates cleanly.
	const updateSystemMessage = (systemMessageContent: string) => {
		const systemMessageIndex = messages.findIndex(
			(message: { role: any }) => message?.role === MESSAGE_ROLE.SYSTEM
		);
		const updatedMessages = messages.map((message: any, index: any) => {
			if (index === systemMessageIndex) {
				return {
					role: MESSAGE_ROLE.SYSTEM,
					content: systemMessageContent
				};
			}
			return message;
		});

		messages = updatedMessages;
	};

	const savePrompt = (prompt: string, title: string) => {
		const newPrompt = createSavedPrompt(prompt, title);
		savedPrompts$.update((prompts: any[]) => {
			prompts.push(newPrompt);
			return prompts;
		});

		try {
			localStorage.setItem(LOCAL_STORAGE_KEY.SAVED_PROMPTS, JSON.stringify($savedPrompts$));
		} catch (e: any) {
			banners$.update(
				(banners: { id: any; bannerType: any; title: string; description: any }[]) => {
					banners.push({
						id: ERROR.LOCAL_STORAGE_SET_ITEM,
						bannerType: BANNER_TYPE.ERROR,
						title: 'Access to browser storage failed',
						description: e?.message || e?.name || ''
					});
					return banners;
				}
			);
		}
	};

	/**
	 * Export chat
	 */
	function downloadObjectAsJson(obj: { id: string; messages: any }, fileName: string) {
		// Convert the JS object to a JSON string
		const jsonString = JSON.stringify(obj, null, 2);

		// Create a Blob object with the JSON string and the correct MIME type
		const blob = new Blob([jsonString], { type: 'application/json' });

		// Create a URL from the Blob object
		const url = URL.createObjectURL(blob);

		// Create an anchor element with the `download` attribute
		const downloadLink = document.createElement('a');
		downloadLink.href = url;
		downloadLink.download = fileName;

		// Append the link to the DOM, trigger a click, and remove it afterward
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);

		// Clean up the URL object
		URL.revokeObjectURL(url);
	}

	const handleExportClick = () => {
		const fileName = `export_chat_${chatId}.json`;
		const objToExport = {
			id: chatId,
			messages
		};

		downloadObjectAsJson(objToExport, fileName);
	};

	const applyPrompt = (prompt: string) => {
		inputMessage = prompt;
	};

	setContext('chat', {
		handleExportClick,
		showChatSettings$
	});

	/**
	 * Scroll to the bottom
	 */
	afterNavigate(async () => {
		const isRootPage = $page$.route.id === '/';

		if (browser && !isRootPage) {
			// The tick is needed for some reason, if not here then below
			await tick();
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth'
			});
		}
	});

	/**
	 * Resize textarea
	 */
	const resetTextareaHeight = () => {
		textareaRef.style.height = 'auto';
	};

	/**
	 * Fork chat
	 */
	const handleForkChat = (forkIndex: number) => {
		const newChatId = Math.random().toString();

		chatList$.update((chatList: any[]) => {
			chatList.unshift(createNewChatListItem(newChatId));
			return chatList;
		});
		chats$.update((chats: { [x: string]: any }) => {
			const forkedMessages = messages.slice(0, forkIndex + 1);

			chats[newChatId] = createNewChat(newChatId, forkedMessages);
			return chats;
		});

		try {
			localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
			localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));
		} catch (e: any) {
			banners$.update(
				(banners: { id: any; bannerType: any; title: string; description: any }[]) => {
					banners.push({
						id: ERROR.LOCAL_STORAGE_SET_ITEM,
						bannerType: BANNER_TYPE.ERROR,
						title: 'Access to browser storage failed',
						description: e?.message || e?.name || ''
					});
					return banners;
				}
			);
		}

		goto(`/chat/${newChatId}`);
	};

	/**
	 * Create new chat (and navigate to it)
	 */
	const handleCreateNewChat = () => {
		// https://zelark.github.io/nano-id-cc/
		const newChatId = Math.random().toString();

		chatList$.update((chatList: any[]) => {
			chatList.unshift(createNewChatListItem(newChatId));
			return chatList;
		});
		chats$.update((chats: { [x: string]: any }) => {
			chats[newChatId] = createNewChat(newChatId);
			return chats;
		});

		try {
			localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
			localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));
		} catch (e: any) {
			banners$.update(
				(banners: { id: any; bannerType: any; title: string; description: any }[]) => {
					banners.push({
						id: ERROR.LOCAL_STORAGE_SET_ITEM,
						bannerType: BANNER_TYPE.ERROR,
						title: 'Access to browser storage failed',
						description: e?.message || e?.name || ''
					});
					return banners;
				}
			);
		}

		goto(`/chat/${newChatId}`);
	};

	/**
	 * Insert new chat (For the root route)
	 */
	const insertNewChat = (msgs: Message[]) => {
		// https://zelark.github.io/nano-id-cc/
		const newChatId = Math.random().toString(),
			chatId = newChatId;

		chatList$.update((chatList: any) => {
			chatList.unshift(createNewChatListItem(newChatId));
			return chatList;
		});
		chats$.update((chats: any) => {
			chats[newChatId] = createNewChat(newChatId, msgs);
			return chats;
		});

		try {
			localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
			localStorage.setItem(newChatId, JSON.stringify($chats$[newChatId]));
		} catch (e: any) {
			banners$.update((banners: any) => {
				banners.push({
					id: ERROR.LOCAL_STORAGE_SET_ITEM,
					bannerType: BANNER_TYPE.ERROR,
					title: 'Access to browser storage failed',
					description: e?.message || e?.name || ''
				});
				return banners;
			});
		}
	};

	/**
	 * Update chat
	 */
	const updateChat = (id: any, msgs: any) => {
		chats$.update((chats: any) => {
			chats[id].messages = msgs;
			return chats;
		});
		try {
			localStorage.setItem(id, JSON.stringify($chats$[id]));
		} catch (e: any) {
			banners$.update((banners: any) => {
				banners.push({
					id: ERROR.LOCAL_STORAGE_SET_ITEM,
					bannerType: BANNER_TYPE.ERROR,
					title: 'Access to browser storage failed',
					description: e?.message || e?.name || ''
				});
				return banners;
			});
		}
	};

	const upsertChat = (chatId: string, msgs: Message[]) => {
		if (!chatId) {
			insertNewChat(msgs);
		} else {
			updateChat(chatId, msgs);
		}
	};

	/**
	 * Chat title completion
	 */
	const chatTitleCompletion = async (msgs: any) => {
		const { data, error } = await chatCompletion(
			CHAT_LABELLING_PROMPT,
			msgs,
			$openAiApiKey$,
			$gptModelVerified$
		);

		if (error) {
			banners$.update((banners: any) => {
				banners.push({
					id: ERROR.OPENAI_CHAT_COMPLETION,
					bannerType: BANNER_TYPE.ERROR,
					title: 'Request to OpenAI failed',
					description: error?.message || ''
				});
				return banners;
			});
			return;
		}

		const title = data
			.map((r: any) => r.content)
			.map((r: any) => r.replace('Title:', ''))
			.map((r: any) => r.trim())
			.join('');

		return title;
	};

	/**
	 * Regenerate response
	 */
	const handleRegenerateResponse = async () => {
		isLoading = true;

		messages = messages.filter((_: any, i: number) => i !== messages.length - 1);
		const _inputMessage = messages[messages.length - 1].content;

		upsertChat(chatId, messages);

		if (browser) {
			await tick();
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth'
			});
		}

		const { data, error } = await chatCompletion(
			_inputMessage,
			messages.slice(0, messages.length - 1),
			$openAiApiKey$,
			$gptModelVerified$
		);

		if (error) {
			banners$.update((banners: any) => {
				banners.push({
					id: ERROR.OPENAI_CHAT_COMPLETION,
					bannerType: BANNER_TYPE.ERROR,
					title: 'Request to OpenAI failed',
					description: error?.message || ''
				});
				return banners;
			});
			isLoading = false;
			if (browser) {
				await tick();
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			}
			return;
		}

		messages = messages.concat(data);
		upsertChat(chatId, messages);
		isLoading = false;

		if (browser) {
			await tick();
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth'
			});
		}

		return;
	};

	/**
	 * Chat completion
	 */
	const handleChatCompletion = async () => {
		if (isLoading) {
			return;
		}

		isLoading = true;
		// Means only system message is present
		let requiresChatTitle = !messages?.length || messages?.length === 1;
		const _inputMessage = inputMessage;
		inputMessage = '';
		resetTextareaHeight();

		const userMessage = {
			role: MESSAGE_ROLE.USER,
			content: _inputMessage
		};

		messages = messages.concat([userMessage]);
		upsertChat(chatId, messages);

		if (browser) {
			await tick();
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth'
			});
		}

		const { data, error } = (await chatCompletion(
			_inputMessage,
			messages.slice(0, messages.length - 1),
			$openAiApiKey$,
			$gptModelVerified$
		).catch((err: any) => {
			console.error(err);
			return err;
		})) as any;

		if (error) {
			banners$.update((banners: any) => {
				banners.push({
					id: ERROR.OPENAI_CHAT_COMPLETION,
					bannerType: BANNER_TYPE.ERROR,
					title: 'Request to OpenAI failed',
					description: error?.message || ''
				});
				return banners;
			});
			isLoading = false;
			if (browser) {
				await tick();
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			}
			return;
		}

		messages = messages.concat(data);
		upsertChat(chatId, messages);
		isLoading = false;

		// Create and set title for chat
		if (requiresChatTitle) {
			const title = await chatTitleCompletion(messages.slice(0, 2));

			// Update ChatList with title
			chatList$.update((chatList: any) => {
				chatList = chatList.map((chat: any) => {
					if (chat.chatId === chatId) {
						chat.title = title;
					}
					return chat;
				});
				return chatList;
			});
			try {
				localStorage.setItem(LOCAL_STORAGE_KEY.CHAT_LIST, JSON.stringify($chatList$));
			} catch (e: any) {
				banners$.update((banners: any) => {
					banners.push({
						id: ERROR.LOCAL_STORAGE_SET_ITEM,
						bannerType: BANNER_TYPE.ERROR,
						title: 'Access to browser storage failed',
						description: e?.message || e?.name || ''
					});
					return banners;
				});
			}
		}

		if (browser) {
			await tick();
			window.scrollTo({
				top: document.body.scrollHeight,
				behavior: 'smooth'
			});
		}

		return;
	};

	function toggleApiModal() {
		showApi = !showApi;
	}
</script>

{#if !hasChatMessages}
	<InputText />
{/if}

<div class="rta-column main-col"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:dark={$themeMode}
	class:light={!$themeMode}	
	>
	<!-- Messages -->
	<div class="rta-column rowgap300 allmessages">

			{#if messages.length > 0}
				{#each messages?.filter?.(isNotSystemMessage) as { role, content }, index}	
					<ChatMessage {role} {content}/>
				{/each}
			{/if}

	</div>

	<!-- Chat input -->

	<form class="rta-column rowgap300">
		{#if isLoading}
			<p>processing...</p>
		{/if}
		<div class="rta-row fullW">
			<button class="blank-button" on:click={handleRegenerateResponse}>
				<Renew/>
			</button>
			<button class="blank-button" on:click={handleCreateNewChat}>
				<Add/>
			</button>
			<div class="rta-row actual-form ycenter colgap300">
				<input
					bind:this={textareaRef}
					bind:value={inputMessage}
					on:input={resizeTextarea}
					disabled={!$openAiApiKey$}
					placeholder={$openAiApiKey$ ? '' : 'Please enter your OpenAI API key first'}
					on:keydown={(e) => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							handleChatCompletion();
						}
					}}
				/>
				<!-- Send button -->
				{#if $openAiApiKey$}
					<button on:click={handleChatCompletion} type="submit" class="blank-button"><Send/></button>
				{/if}
			</div>
		</div>
	</form>
</div>

<style lang="sass">

.rta-row
	input
		width: 100%

.rta-column.levelzero
	padding-right: 80px
	min-height: calc(100vh - 320px)
	justify-content: space-between

.actual-form
	border-radius: 8px
	border: 1px solid var(--borderline)
	width: 100%
	input
		border: none
		outline: none
		&:focus
			outline: none

.levelzero
	.actual-form
		padding: 4px 8px


</style>
