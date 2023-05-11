<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { onMount, onDestroy } from 'svelte';
	import { hotKeyAction, textareaAutosizeAction } from 'svelte-legos';
	import type { Writable } from 'svelte/store';

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

<div
	class="rta-column rowgap200"
	class:light={!$visibilityMode} class:dark={$visibilityMode}
>
	<textarea
		use:textareaAutosizeAction
		use:hotKeyAction={{ code: 'Enter', cb: onSend }}
		bind:this={localRef}
		bind:value={$value}
		{disabled}
		placeholder="Input Area"
	/>
	<button
		class="mainbutton"
		on:click={onSend}
		{disabled}
	>
		Send
	</button>
</div>

<style lang="sass">

textarea
	min-height: 48px
	padding: 4px
	font-size: 14px
	border-radius: 4px

</style>
