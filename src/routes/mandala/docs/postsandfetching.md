---
title: posts and fetching
type: documentation
tags: fetch api
---

say we have a folder docs, inside which are markdown files as posts.
in docs, create subfolder `[docs]`, within which will reside the base page.svelte, page.ts and layout.svelte files.

to display a list of all docs on the route /docs, create a file in utils with title docs.ts and insert this code:

```ts
export const fetchPosts = async() => {
	const allPosts = import.meta.glob('/src/routes/docs/*.md')
	const iterablePosts = Object.entries(allPosts)

	const allDhitiposts = await Promise.all(
		iterablePosts.map(async ([path, resolver]) => {
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)

			return {
				meta: metadata,
				path: postPath
			}
		})
	)
	return allDhitiposts
}
```

the above code parses all ".md" files at the route /src/routes/docs, and retrieves their front matter and links.

now create API that fetches this data, in +server.ts file at api/docs route:

```ts
import { fetchPosts } from '$lib/utils/docs'
import { json } from '@sveltejs/kit'

export const GET = async() => {
  const allPosts = await fetchPosts()

	return json(allPosts)
}
```

now at route docs, create the +page.ts to complement the +page.svelte at /docs:

```ts
export const load = async ({ fetch }) => {
	const response = await fetch (`api/dhiti`)
	const posts = await response.json()
	return {
		posts
	}
}
```

export this load function into the +page.svelte file.
the above is clean and recommended way. or, simply use this function in page.svelte directly:

```ts
const Latest = async() => {
	const allPostFiles = import.meta.glob('/src/routes/docs/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
			}
		})
	)
	// @ts-ignore
	return allPosts
}
```

in this case we need to use async onmount:

```ts
let items:[]
import { onMount }  from 'svelte'
//
//
onMount(async() => {
	items = await Latest()
})
```

and to render:

```html
{#each items as item}
// here
{/each}
```

