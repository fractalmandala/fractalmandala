import { readable, writable, type Readable } from 'svelte/store';

export function localStorageMiddleware<P, T extends Readable<P>>(source: T, key: string): T {
	const { subscribe: sourceSubscribe, ...rest } = source;
	const decoratedSubscribe = readable<P>(undefined, (set) => {
		const unsub = sourceSubscribe((value) => {
			try {
				if (typeof value === 'string' || typeof value === 'number') {
					localStorage.setItem(key, value.toString());
				} else if (typeof value === 'object') {
					localStorage.setItem(key, JSON.stringify(value));
				} else {
					throw new Error('Unknown type!');
				}
			} catch (e) {
				console.warn(e);
			}
			set(value);
		});

		return unsub;
	});

	return { subscribe: decoratedSubscribe.subscribe, ...rest } as T;
}