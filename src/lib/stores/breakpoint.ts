import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment' 

const initialWidth = browser ? window.innerWidth : 1024;
export const windowWidth = writable(initialWidth);

export const breakOne = derived(
  windowWidth,
  $windowWidth => $windowWidth <= 1023
);

export const breakTwo = derived(
  windowWidth,
  $windowWidth => $windowWidth <= 768
);
