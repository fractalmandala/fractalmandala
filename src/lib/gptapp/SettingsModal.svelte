<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
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

<div class="rta-column rowgap300 p-top-32"
	transition:slide={{ easing: quadIn }}
	use:hotKeyAction={{ code: 'Escape', cb: onClose }}
	class:light={!$visibilityMode} class:dark={$visibilityMode}>
		<div class="rta-row colgap100 xend">
			<button on:click={() => (currentActiveTab = 0)} class="hollow">Key</button>
			<button on:click={() => (currentActiveTab = 1)} class="hollow">Controls</button>
			<button class="hollow" use:alertAction={{
					title: 'Are you sure?',
					description: 'This will remove all your data, messages and API key!',
					onOk: handleLogout
				}}>Logout
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
