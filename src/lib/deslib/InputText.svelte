<script lang="ts">

	import { onMount } from 'svelte';
	import { browser } from '$app/environment'
	import { hotKeyAction } from 'svelte-legos';
 	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { SetKeyIfPossible } from '$lib/gptapp/APIKeyStore';

	export let initialValue: string | null = '';
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

	onMount(() => {
		inputRef?.focus();
	});

</script>

{#if disabled}
<p>Checking your key...</p>
{/if}

<form
	on:submit|preventDefault={onGetStarted}
	class:dark={$themeMode}
	class:light={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<input 
		use:hotKeyAction={{ code: 'Enter', cb: onGetStarted }}
		{disabled}
		bind:value={key}
		bind:this={inputRef}
		type="text"
		/>
  <button type="submit" class="secondbutton" on:click={onGetStarted} {disabled}>Submit</button>
</form>

<style lang="sass">


input
	border: 1px solid var(--borderline)
	border-radius: 3px
	padding: 6px 8px
	color: var(--textone)
	font-size: 14px
	letter-spacing: -0.4px

</style>