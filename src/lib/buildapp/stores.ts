import { writable } from 'svelte/store'
export const apiKey = writable<string | null>(null);

apiKey.subscribe(value => {
		if ( value ) {
			localStorage.setItem('apiKey', value)
		} else {
			localStorage.removeItem('apiKey')
		}
	})