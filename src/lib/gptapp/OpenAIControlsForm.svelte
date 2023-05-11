<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import type { OpenAIControls } from './types';
	import { slide } from 'svelte/transition'
	import { quadIn } from 'svelte/easing'

	export let onUpdate: (controls: OpenAIControls) => void;
	export let controls: OpenAIControls;

	const params = controls;
</script>




<div class="rta-column p-bot-32 null xright" class:light={!$visibilityMode} class:dark={$visibilityMode} transition:slide={{ easing: quadIn }}>
	<p class="bord-top p-top-16">GPT Model:</p>
	<select bind:value={params.model}>
		<option value="gpt-3.5-turbo">GPT-3.5-TURBO (Default ChatGPT)</option>
		<option value="gpt-3.5-turbo-0301">GPT-3.5-TURBO-0301</option>
		<option value="gpt-4">GPT-4 (Limited Beta)</option>
		<option value="gpt-4-0314">GPT-4-0314 (Limited Beta)</option>
		<option value="gpt-4-32k">GPT-4-32K (Limited Beta)</option>
		<option value="gpt-4-32k-0314">GPT-4-32K-0314 (Limited Beta)</option>
	</select>
	<p class="bord-top p-top-16">Temperature</p>
	<input type="range" bind:value={params.temperature} max={1} step={0.01} min={0} />
	<small>{params.temperature}</small>
	<p class="bord-top p-top-16">Maximum Length</p>
	<input type="range" bind:value={params.max_tokens} max={2048} step={10} min={1} />
	<small>{params.max_tokens}</small>
	<p class="bord-top p-top-16">Top P</p>
	<input type="range" bind:value={params.top_p} max={1} step={0.01} min={0} />
	<small>{params.top_p}</small>
	<p class="bord-top p-top-16">Frequency Penalty</p>
	<input type="range" bind:value={params.frequency_penalty} max={2} step={0.01} min={0} />
	<small>{params.frequency_penalty}</small>
	<p class="bord-top p-top-16">Presence Penalty</p>
	<input type="range" bind:value={params.presence_penalty} max={2} step={0.01} min={0} />
	<small>{params.presence_penalty}</small>
	<button class="secondbutton" on:click={() => onUpdate(params)}>Update</button>
</div>


<style lang="sass">

.null
	p
		margin: 0
		padding-bottom: 2px
	select
		font-size: 12px


</style>
