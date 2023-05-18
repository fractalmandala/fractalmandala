<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import { alertAction, hotKeyAction } from 'svelte-legos';
	import { slide } from 'svelte/transition'
	import { quadIn } from 'svelte/easing'
	import ApiKeyForm from './APIKeyForm.svelte';
	import { APIKeyStore } from './APIKeyStore';
	import OpenAiControlsForm from './OpenAIControlsForm.svelte';
	import { openAIGlobalControls } from './openAIControlsStore';
	import type { OpenAIControls } from './types';

	export let onClose: () => void;

	let currentActiveTab = 0;

	function handleOpenAIControlsUpdate(params: OpenAIControls) {
		openAIGlobalControls.set(params);
		onClose();
	}

	function handleLogout() {
		localStorage.clear();
		window.location.reload();
	}
</script>

<div class="rta-column rowgap100"
	transition:slide={{ easing: quadIn }}
	use:hotKeyAction={{ code: 'Escape', cb: onClose }}
	class:light={!$themeMode} class:dark={$themeMode}>
		<div class="rta-row colgap100 xstart">
			<button on:click={() => (currentActiveTab = 0)} class="blank-button" class:selected={currentActiveTab = 0}>Key</button>
			<button on:click={() => (currentActiveTab = 1)} class="blank-button" class:selected={currentActiveTab = 1}>Controls</button>
			<button class="blank-button" use:alertAction={{
					title: 'Are you sure?',
					description: 'This will remove all your data, messages and API key!',
					onOk: handleLogout
				}} class:selected={currentActiveTab = 2}>Logout
			</button
			>
		</div>
		{#if currentActiveTab === 0}
			<ApiKeyForm initialValue={$APIKeyStore} CTALabel="Save" onDone={onClose} />
		{/if}
		{#if currentActiveTab === 1}
			<OpenAiControlsForm onUpdate={handleOpenAIControlsUpdate} controls={$openAIGlobalControls}/>
		{/if}
</div>

<style lang="sass">


.blank-button.selected
	border: 1px solid var(--gret)
	color: var(--gret)
	border-radius: 4px

</style>
