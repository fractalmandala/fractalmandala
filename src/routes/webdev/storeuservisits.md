---
title: Storing User First Visit
tags: utilities
featured: false
type: sveltekit
---

Create a file in lib>stores named 'stores.ts'

```js
import { browser } from '$app/env';
export function isFirstVisit() {
	if (browser) {
		const firstVisit = !localStorage.getItem('firstVisit');
		if (firstVisit) {localStorage.setItem('firstVisit', 'false');
		}	
		return firstVisit;
	}
		return false;
}
```

Inside the component:

```js
import { onMount } from 'svelte';
import { isFirstVisit } from '$lib/utils.js';

let showPopup = false;

onMount(() => {
	showPopup = isFirstVisit();
});

function closePopup() {
	showPopup = false;
}
```

inside the markup:

```html
{#if showPopup}
	<div class="popup">
		Welcome to the site! This is your first visit.
	</div>
{/if}
```
