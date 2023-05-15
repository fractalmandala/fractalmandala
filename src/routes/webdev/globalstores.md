---
title: Using Global Stores in Sveltekit
tag: utilities
featured: true
type: sveltekit
---

A common use case for a website is the need for global states of theme and breakpoints. Say there are three states we want to track:

1. Theme (dark or light)
2. A breakpoint of 1023px
3. A breakpoint of 768px

Now we don't want to track them separately on each page or route. What we want is a single tracking source, from where we can derive it on any page or in a component. For this we can use Sveltekit's stores.

My project structure has a folder called 'lib' inside 'src' and within 'lib' I have a folder named 'stores.' This allows me to access files inside it with the '$' prefix: '$lib/stores.' Create a new file there called 'globalstores.ts' (I use Typescript) and add:

```javascript
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment' 

const initialWidth = browser ? window.innerWidth : 1024;
export const windowWidth = writable(initialWidth);

const storedThemeMode = browser
  ? JSON.parse(localStorage.getItem('visibilityMode') || 'true')
  : true;

export const themeMode = writable(storedThemeMode);

export const breakOne = derived(
  windowWidth,
  $windowWidth => $windowWidth <= 1023
);

export const breakTwo = derived(
  windowWidth,
  $windowWidth => $windowWidth <= 768
);
```

In the above, we create stores to hold the values of visibilityMode, breakOne and breakTwo. Now these values can be used on any page like so:

```javascript
import { themeMode, breakOne, breakTwo } from '$lib/stores/globalstores'
```
