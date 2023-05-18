<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import { onMount, onDestroy } from 'svelte';
	import { hotKeyAction, textareaAutosizeAction } from 'svelte-legos';
	import Send from '$lib/icons/Send.svelte'
	import Add from '$lib/icons/Add.svelte'
	import Renew from '$lib/icons/Renew.svelte'
	import type { Writable } from 'svelte/store';

	export let disabled: boolean;
	export let ref: Writable<HTMLInputElement | null>;
	export let onSend: () => void;
	export let value: Writable<string>;
	let color = '#0BC160'

	let localRef: HTMLInputElement;

	onMount(() => {
		ref.set(localRef);
	});

	onDestroy(() => {
		ref.set(null);
	});
</script>

<div
	class="rta-row ycenter rowgap300 fullW"
	class:light={!$themeMode} class:dark={$themeMode}
>
			<button class="blank-button">
				<Renew/>
			</button>
			<button class="blank-button">
				<Add color={color}/>
			</button>
	<div class="rta-row actual-form ycenter colgap300 fullW between">
	<input
		use:hotKeyAction={{ code: 'Enter', cb: onSend }}
		bind:this={localRef}
		bind:value={$value}
		{disabled}
		placeholder="Input Area"
	/>
	<button
		class="blank-button"
		on:click={onSend}
		{disabled}
	>
		<Send/>
	</button>
	</div>
</div>

<style lang="sass">

.rta-row.ycenter.fullW
	margin-top: 16px

input
	border: none
	outline: none
	padding: 4px

.actual-form
	border: 1px solid var(--gret)
	padding: 6px
	border-radius: 8px


</style>
