---
title: Simple Input
tags: inputs
featured: false
about: Simple input, clears text and removes focus on outside click
id: 2
---

<script lang="ts">

	import ComponentUnit from '$lib/deslib/ComponentUnit.svelte'
	import InputText from '$lib/deslib/InputText.svelte'
	let citation = 'Simple Input'
	let showCode = false
	
	function toggleCode(){
		showCode = !showCode
	}

</script>

<ComponentUnit>
	<InputText/>
</ComponentUnit>

Clears text and removes focus on outside click.

<button class="secondbutton m-bot-16" on:click={toggleCode}>
	{#if showCode}
	Hide Code
	{:else}
	Show Code
	{/if}
</button>

{#if showCode}


```typescript
<script lang="ts">

	export let userInput = ''
	let isFocused:boolean = false

	function handleFocus(){
		isFocused = !isFocused
	}

	function handleBlur(){
		userInput = ''
		isFocused = false
	}

	function handleFormSubmit(){
		if ( browser ) {
			localStorage.setItem('key', userInput)
		}
	}

</script>
```

```html
<form
	on:submit|preventDefault={handleFormSubmit}
	>
	<input 
		bind:value={userInput}
		on:blur={handleBlur}
		on:focus={handleFocus}
		type="text"
		placeholder="Enter a value..." 
		/>
  <button type="submit">Submit</button>
</form>
```

{/if}
