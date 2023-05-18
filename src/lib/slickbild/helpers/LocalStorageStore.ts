import type { Writable, Readable } from 'svelte/store';
import { readable, writable } from 'svelte/store';

interface Serializer<T> {
    parse(text: string): T;
    stringify(object: T): string;
}

type StorageType = 'local' | 'session';
interface Options<T> {
    serializer?: Serializer<T>;
    storage?: StorageType;
}

export declare function localStorageStore<T>(key: string, initialValue: T, options?: Options<T>): Writable<T>;
export {};

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
