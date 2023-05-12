<script lang="ts">

	import { onMount } from 'svelte'
	import { browser } from '$app/environment';
	import sidebarMode from '$lib/stores/searchbar'
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
  <div class="search-results rta-column bord-bot rowgap100" data-lenis-prevent class:light={!$visibilityMode} class:dark={$visibilityMode} on:click={toggleSidebar} on:keydown={fauxfake}>
		<p class="p-top-16 is-green point tt-u" on:click={closeWindow} on:keydown={fauxfake}>Close</p>
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
	text-align: right
	&:hover
		color: var(--green)
	@media screen and (max-width: 768px)
		font-size: 16px

p.spline
	margin-bottom: 0px
	margin-top: 0

.comp-search
	overflow-y: scroll
	width: 100%
	text-align: right
	input
		text-align: right
		font-family: 'Spline Sans', sans-serif

.dark
	input
		background: none
		border: 1px solid var(--borderline)
		padding: 6px 4px 6px 4px
		border-radius: 6px
		box-shadow: 8px 7px 12px #010101
		color: var(--opposite)
		outline: none
		&::placeholder
			text-transform: lowercase
			color: var(--textone)
		&:focus
			border: 1px solid var(--borderline)
			border-radius: 6px
	@media screen and (max-width: 768px)
		border: 1px solid white
		border-radius: 8px
		color: white
		&::placeholder
			color: white
		.is-green
			color: var(--green)

</style>