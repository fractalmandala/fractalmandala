---
title: gpt message input
tags: gpt
type: code
---
```javascript

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { hotKeyAction, textareaAutosizeAction } from 'svelte-legos';
	import type { Writable } from 'svelte/store';
	import SendIcon from './icons/SendIcon.svelte';

	export let disabled: boolean;
	export let ref: Writable<HTMLTextAreaElement | null>;
	export let onSend: () => void;
	export let value: Writable<string>;

	let localRef: HTMLTextAreaElement;

	onMount(() => {
		ref.set(localRef);
	});

	onDestroy(() => {
		ref.set(null);
	});
</script>

<div>
	<textarea
		use:textareaAutosizeAction
		use:hotKeyAction={{ code: 'Enter', cb: onSend }}
		bind:this={localRef}
		bind:value={$value}
		{disabled}
		placeholder="Enter your message"
	/>
	<button
		class="transparent"
		on:click={onSend}
		{disabled}
	>
		submit
	</button>
</div>
```