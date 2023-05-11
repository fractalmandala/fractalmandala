<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import { onMount } from 'svelte';
	import { hotKeyAction } from 'svelte-legos';
	import { SetKeyIfPossible } from './APIKeyStore';

	const DefaultLabel = 'Get Started';

	export let initialValue: string | null = '';
	export let CTALabel = DefaultLabel;
	export let onDone: () => void = () => {};

	let key = initialValue || '';
	let disabled = false;
	let isError = false;
	let inputRef: HTMLInputElement;

	const errorMessage = 'Invalid API key. Please make sure your API key is still working properly.';

	function onGetStarted() {
		if (key.trim().length > 0) {
			disabled = true;
			SetKeyIfPossible(key)
				.then(() => {
					console.log('Key is valid');
					onDone();
				})
				.catch((e) => {
					isError = true;
				})
				.finally(() => {
					disabled = false;
					setTimeout(() => {
						inputRef?.focus();
					}, 1);
				});
		}
	}

</script>

{#if disabled}
	<div class="rta-column rowgap100" class:light={!$visibilityMode} class:dark={$visibilityMode}>
		<p>Checking your key...</p>
	</div>
{:else}
	<div class="rta-column rowgap100 xright p-bot-32" class:light={!$visibilityMode} class:dark={$visibilityMode}>
		<input
			use:hotKeyAction={{ code: 'Enter', cb: onGetStarted }}
			{disabled}
			bind:value={key}
			bind:this={inputRef}
			type="password"
			placeholder="Enter your OpenAI API key (sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)"
		/>
		{#if isError}
			<p>
				{errorMessage}
			</p>
		{/if}
		<button on:click={onGetStarted} {disabled} class="secondbutton">
			{CTALabel}
		</button>
	</div>
{/if}

<style lang="sass">

input
	background: none
	border: 1px solid var(--borderline)
	color: white
	padding: 6px
	border-radius: 4px
	width: 88%

</style>
