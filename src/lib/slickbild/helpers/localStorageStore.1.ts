import type {Writable} from 'svelte/store';
import {Options} from '$lib/slickbild/helpers/LocalStorageStore';


export function localStorageStore<T>(key: string,initialValue: T,options?: Options<T>): Writable<T>;
