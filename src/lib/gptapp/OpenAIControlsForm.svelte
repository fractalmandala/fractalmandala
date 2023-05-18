<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import type { OpenAIControls } from './types';
	import { slide } from 'svelte/transition'
	import { quadIn } from 'svelte/easing'

	export let onUpdate: (controls: OpenAIControls) => void;
	export let controls: OpenAIControls;

	const params = controls;
</script>




<div class="rta-column rowgap200 p-bot-32 null xleft" class:light={!$themeMode} class:dark={$themeMode} transition:slide={{ easing: quadIn }}>
	<select class="primeselect" bind:value={params.model}>
		<option value="gpt-3.5-turbo">GPT-3.5-TURBO (Default ChatGPT)</option>
		<option value="gpt-3.5-turbo-0301">GPT-3.5-TURBO-0301</option>
		<option value="gpt-4">GPT-4 (Limited Beta)</option>
		<option value="gpt-4-0314">GPT-4-0314 (Limited Beta)</option>
		<option value="gpt-4-32k">GPT-4-32K (Limited Beta)</option>
		<option value="gpt-4-32k-0314">GPT-4-32K-0314 (Limited Beta)</option>
	</select>
	<div class="rta-grid grid2 colgap200">
		<div class="rta-column">
			<p class="bord-top p-top-16">Temperature</p>
			<input type="range" bind:value={params.temperature} max={1} step={0.01} min={0} />
			<small>{params.temperature}</small>
		</div>
		<div class="rta-column">
			<p class="bord-top p-top-16">Maximum Length</p>
			<input type="range" bind:value={params.max_tokens} max={2048} step={10} min={1} />
			<small>{params.max_tokens}</small>
		</div>
		<div class="rta-column">
			<p class="bord-top p-top-16">Top P</p>
			<input type="range" bind:value={params.top_p} max={1} step={0.01} min={0} />
			<small>{params.top_p}</small>
		</div>
		<div class="rta-column">
			<p class="bord-top p-top-16">Frequency Penalty</p>
			<input type="range" bind:value={params.frequency_penalty} max={2} step={0.01} min={0} />
			<small>{params.frequency_penalty}</small>
		</div>
		<div class="rta-column">
			<p class="bord-top p-top-16">Presence Penalty</p>
			<input type="range" bind:value={params.presence_penalty} max={2} step={0.01} min={0} />
			<small>{params.presence_penalty}</small>
		</div>
		<div class="rta-column xright ycenter">
			<button class="secondbutton" on:click={() => onUpdate(params)}>Update</button>
		</div>
	</div>
</div>


<style lang="sass">

.null
	p
		margin: 0
		padding-bottom: 2px
	select
		font-size: 12px

.primeselect
	background: none
	border: 1px solid var(--borderline)
	padding: 4px 8px
	border-radius: 6px
	color: var(--textone)
	cursor: pointer
	transition: 0.15s
	&:hover
		border: 1px solid var(--opposite)
		color: var(--opposite)


</style>
