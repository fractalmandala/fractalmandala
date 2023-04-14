---
title: get path on layout file for styling
tags: sveltecode
type: documentation
---

To achieve this, you can compare the current page path with the item's path and conditionally apply a CSS class to style the active item differently.

First, add a CSS class for the active item in your style section:

```css
<style>
  .active-item {
    /* Your desired styling for the active item goes here */
    font-weight: bold;
    color: red;
  }
</style>
```

Then, modify your layout.svelte to get the current path, compare it with the item's path, and apply the CSS class if the paths match:

```html
<script>
  import { page } from '@sveltejs/kit/assets/runtime/app/stores.js';

  let chaps = [
    // your chapters data
  ];

  $: currentPath = $page.path;
</script>

{#if chaps && chaps.length > 0}
  {#each chaps as item}
    <p>
      <a
        href="/aryavarta/chapter/01/{item.id}"
        class="{`/aryavarta/chapter/01/${item.id}` === currentPath ? 'active-item' : ''}"
      >
        {item.id}
      </a>
    </p>
  {/each}
{/if}
```

Here's what's happening:

We import the page store from SvelteKit and create a reactive variable currentPath that holds the current page path.
In the `<a>` element, we use a ternary expression to conditionally apply the active-item class if the current path matches the item's path.
Now, when a user is on a page that matches one of the items in the list, the corresponding list item will be styled with the active-item class.