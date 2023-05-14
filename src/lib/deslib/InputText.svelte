<script lang="ts">

	import { browser } from '$app/environment'
 	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
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

<form
	on:submit|preventDefault={handleFormSubmit}
	class:dark={$themeMode}
	class:light={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<input 
		bind:value={userInput}
		on:blur={handleBlur}
		on:focus={handleFocus}
		type="text"
		placeholder="Enter a value..." 
		/>
  <button type="submit" class="secondbutton">Submit</button>
</form>

<style lang="sass">


input
	border: 1px solid var(--borderline)
	border-radius: 3px
	padding: 5px 8px
	color: var(--textone)

</style>