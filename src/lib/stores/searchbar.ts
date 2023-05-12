import { writable } from 'svelte/store'
import { browser } from '$app/environment' 

const storedSidebarMode = browser
  ? JSON.parse(localStorage.getItem('sidebarMode') || 'false')
  : false;

// Create a writable store with the storedVisibilityMode or default to false
const sidebarMode = writable(storedSidebarMode);

export default sidebarMode;