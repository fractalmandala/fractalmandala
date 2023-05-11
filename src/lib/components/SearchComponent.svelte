<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
  import type { SearchItem } from '$lib/types/SearchItem'
	import { searchitems } from '$lib/utils/searchindex'
	let fake = false
	let inputElement: HTMLInputElement
	let inputValue = ''
  let searchResults: SearchItem[] = []
  let isFocused = false

 async function handleInput() {
    if (inputValue.length > 2) {
      searchResults = searchitems.filter((item) =>
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
{#if searchResults.length}
  <div class="search-results rta-column all-p-16 rowgap100">
		<h6>Results:</h6>
    {#each searchResults as result}
			<a href={result.url}>
      <p class="tt-c ta-r">
				{result.heading}
			</p>
			</a>	
    {/each}
  </div>
{/if}

<style lang="sass">

.dark.comp-search
	input
		background: none
		border-bottom: none
		border-top: none
		border-left: 2px solid var(--green)
		border-right: none
		padding: 6px 0 6px 4px
		box-shadow: 8px 7px 12px #010101
		color: var(--opposite)
		&::placeholder
			text-transform: uppercase
			color: var(--textone)

</style>