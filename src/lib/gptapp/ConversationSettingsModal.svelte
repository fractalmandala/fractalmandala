<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { hotKeyAction } from 'svelte-legos';
	import { fade } from 'svelte/transition';
	import OpenAiControlsForm from './OpenAIControlsForm.svelte';
	import type { OpenAIControls } from './types';
	import { openAIGlobalControls } from '$lib/gptapp/openAIControlsStore';

	export let onUpdate: (controls: OpenAIControls) => void;
	export let controls: OpenAIControls = $openAIGlobalControls;

	const params = controls;
</script>

<div
	class="rta-column"
	transition:fade={{ duration: 150 }}
	class:light={!$visibilityMode} class:dark={$visibilityMode}
	>
	<div class="absolute inset-0 bg-white rounded-md md:inset-x-80 md:inset-y-20">
		<OpenAiControlsForm {onUpdate} controls={params}/>
	</div>
</div>
