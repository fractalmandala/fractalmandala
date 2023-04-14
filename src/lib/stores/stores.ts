import type { ChatCompletionRequestMessage } from 'openai';
import { writable, type Readable, type Writable, readable, get } from 'svelte/store';
import { messagesStore } from "svelte-legos"
import { v4 as uuidv4 } from 'uuid';
import { EventSource } from '$lib/stores/eventSource';
import { ChatStorekeeper } from '$lib/stores/chatStorekeeper';
import type { Chat, ChatMessage, ClientSettings } from '$lib/stores/shared';
export let vary:any

function ManageStore(){
	messagesStore(vary)
}

export const settingsStore = ManageStore();

export const liveAnswerStore: Writable<ChatCompletionRequestMessage> = writable({
	role: 'assistant',
	content: ''
});

export const isLoadingAnswerStore: Writable<boolean> = writable(false);

export const isTimeagoInitializedStore: Writable<boolean> = writable(false);

export const eventSourceStore: Readable<EventSource> = readable(new EventSource());

/**
 * Custom chat store
 **/

export interface ChatStore extends Writable<{ [key: string]: Chat }> {
	updateChat(slug: string, update: Partial<Chat>): void;
	addMessageToChat(slug: string, message: ChatMessage, parent?: ChatMessage): void;
	addAsSibling(slug: string, originalMessageId: string, newMessage: Partial<ChatMessage>): void;
	deleteMessage(slug: string, id: string): void;
	deleteUpdateToken(slug: string): void;
	deleteChat(slug: string): void;
	isFlat(chat: Chat): boolean;
	findParent(messageId: string, chat: Chat): { parent: ChatMessage; index: number } | null;
	getMessageById(messageId: string, chat: Chat): ChatMessage | null;
	getCurrentMessageBranch(chat: Chat, includeContext?: boolean): ChatMessage[] | null;
	selectSibling(slug: string, id: string): void;
	countAllMessages(chat: Chat): number;
	countMessagesInCurrentBranch(chat: Chat): number;
}

export const _chatStore = ManageStore();



export const getCurrentMessageBranch = (chat: Chat, includeContext = true): ChatMessage[] | null => {
	return ChatStorekeeper.getCurrentMessageBranch(chat, includeContext);
};
