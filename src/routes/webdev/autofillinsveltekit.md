---
title: Autofill in Sveltekit
tag: utilities
featured: true
type: sveltekit
id: 20
---

Simple method for having auto-fill inputs fields, which is useful for search forms.

1. Create a type for the search item. My item has a title, type and url, so I create file 'SearchItem.ts':
```javascript
export interface SearchItem {
  title: string;
	url: string;
	type: string
}
```

2. Create the index file, in my case 'searchindex.ts':
```javascript
import type { SearchItem } from '$lib/types/SearchItem'
export const searchitems = [
{ "title": "Create", "url": "/about", "type": "svelte" },
{ "title": "Curate", "url": "/about", "type": "svelte"  },
]
```

Note that the search items have to be of same table format as the SearchItem interface created in step 1.

3. Now create a search component- Search.svelte:
```javascript
import type { SearchItem } from '$lib/types/SearchItem'
import { searchitems } from '$lib/filed/searchindex'
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
```

```html
<form>
	<input type="text" placeholder="Search..."
		bind:value={inputValue}
		bind:this={inputElement}
		on:blur={handleBlur}
  	on:input={handleInput}
  	on:focus={handleFocus}
	/>
</form>
  {#if searchResults.length}
    <div>
			<h6>Results:</h6>
      {#each searchResults as result}
				<a href={result.url}>
        <p class="tt-c ta-r">
					{result.title}
				</p>
				</a>	
      {/each}
    </div>
  {/if}
```