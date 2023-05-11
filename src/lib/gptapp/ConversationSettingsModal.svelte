<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { hotKeyAction } from 'svelte-legos';
	import { fade } from 'svelte/transition';
	import OpenAiControlsForm from './OpenAIControlsForm.svelte';
	import type { OpenAIControls } from './types';
	import { openAIGlobalControls } from '$lib/gptapp/openAIControlsStore';

	export let onUpdate: (controls: OpenAIControls) => void;
	export let onClose: () => void;
	export let controls: OpenAIControls = $openAIGlobalControls;

	const params = controls;
</script>

<div
	class="rta-column"
	transition:fade={{ duration: 150 }}
	use:hotKeyAction={{ code: 'Escape', cb: onClose }}
	class:light={!$visibilityMode} class:dark={$visibilityMode}
	>
	<div class="rta-column" on:click={onClose} aria-hidden/>
	<div class="absolute inset-0 bg-white rounded-md md:inset-x-80 md:inset-y-20">
		<button on:click={onClose} class="secondbutton">
			Close
		</button>
		<OpenAiControlsForm {onUpdate} controls={params}/>
	</div>
</div>
