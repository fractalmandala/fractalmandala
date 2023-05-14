<script lang="ts">

	import { onMount } from 'svelte'
	import { browser } from '$app/environment';
	import sidebarMode from '$lib/stores/searchbar'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
  import type { SearchItem } from '$lib/types/SearchItem'
	import { combinedProject } from '$lib/utils/localpulls'
	let fake = false
	let entirety:any
	let inputElement: HTMLInputElement
	let inputValue = ''
  let searchResults: SearchItem[] = []
	let searchitems:any = [];
  let isFocused = false
	let resultsWindow = false

	async function loadItems(){
		searchitems = await combinedProject()
	}

	loadItems();

 async function handleInput() {
    if (inputValue.length > 2) {
      searchResults = searchitems.filter((item:any) =>
        item.heading.toLowerCase().includes(inputValue.toLowerCase())
      );
    } else {
      searchResults = [];
    }
  }

  function handleFocus() {
    isFocused = true;
  }

	function handleBlur(){
		inputValue = ''
		isFocused = false
	}

	function fauxfake(){
		fake = !fake
	}

	function closeWindow(){
		resultsWindow = false
	}

	function toggleSidebar() {
		if (browser) {
			sidebarMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('sidebarMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}

	$: if ( searchResults.length > 0 ) {
		resultsWindow = true
	} else { 
		resultsWindow = false
	}

	onMount(async() => {
		entirety = await combinedProject()
	})


</script>


<form class="rta-column comp-search" class:light={!$themeMode} class:dark={$themeMode}>
	<input type="text" placeholder="Search..."
		bind:value={inputValue}
		bind:this={inputElement}
		on:blur={handleBlur}
    on:input={handleInput}
    on:focus={handleFocus}
	/>
</form>
{#if searchResults.length && resultsWindow}
  <div class="search-results rta-column rowgap100 p-top-32 bord-top" data-lenis-prevent class:light={!$themeMode} class:dark={$themeMode} on:click={toggleSidebar} on:keydown={fauxfake} class:levelzero={$breakZero} class:levelone={$breakOne} class:leveltwo={$breakTwo}>
		<button class="secondbutton m-bot-32" on:click={closeWindow}>Close</button>
		<div class="rta-column">
    	{#each searchResults as result}
      	<a class="rta-row search-out" href={result.url}>
					<small>{result.type}</small>
					<h5 class="tt-u">
					{result.heading}
					</h5>
					<cite>{result.cat}</cite>
				</a>
    	{/each}
		</div>
  </div>
{/if}

<style lang="sass">

.search-results h5
	font-family: 'Spline Sans', sans-serif
	margin-top: 0
	margin-bottom: 4px
	&:hover
		color: var(--green)
	@media screen and (max-width: 768px)
		font-size: 16px


.comp-search
	overflow-y: scroll
	width: 100%
	input
		font-family: 'Spline Sans', sans-serif

input
	background: none
	border: 1px solid var(--borderline)
	padding: 6px 4px 6px 4px
	border-radius: 6px
	color: var(--opposite)
	outline: none
	&::placeholder
		text-transform: lowercase
		color: var(--textone)
	&:focus
		border: 1px solid var(--borderline)
		border-radius: 6px
	@media screen and (max-width: 768px)
		border-radius: 8px
		color: var(--opposite)
		&::placeholder
			color: var(--opposite)


</style>