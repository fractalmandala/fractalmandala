<script lang="ts">

	import { onMount } from 'svelte'
	import visibilityMode from '$lib/stores/visibility'
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

	$: if ( searchResults.length > 0 ) {
		resultsWindow = true
	} else { 
		resultsWindow = false
	}

	onMount(async() => {
		entirety = await combinedProject()
	})


</script>


<form class="rta-column comp-search" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<input type="text" placeholder="Search..."
		bind:value={inputValue}
		bind:this={inputElement}
		on:blur={handleBlur}
    on:input={handleInput}
    on:focus={handleFocus}
	/>
</form>
{#if searchResults.length && resultsWindow}
	<small class="p-top-16 is-green point tt-u" on:click={closeWindow} on:keydown={fauxfake}>Close</small>
  <div class="search-results rta-column bord-bot rowgap100" data-lenis-prevent>
    {#each searchResults as result}
      <p class="tt-c spline">
				<a href={result.url}>
				{result.heading}
				</a>
			</p>
    {/each}
  </div>
{/if}

<style lang="sass">

.search-results p
	font-size: 12px
	margin-top: 0
	margin-bottom: 4px
	&:hover
		color: var(--green)

p.spline
	margin-bottom: 0px
	margin-top: 0

.comp-search
	input
		font-family: 'Spline Sans', sans-serif

.dark.comp-search
	input
		background: none
		border: 1px solid var(--borderline)
		padding: 6px 0 6px 4px
		border-radius: 6px
		box-shadow: 8px 7px 12px #010101
		color: var(--opposite)
		outline: none
		&::placeholder
			text-transform: uppercase
			color: var(--textone)
		&:focus
			border: 1px solid var(--borderline)
			border-radius: 6px

</style>