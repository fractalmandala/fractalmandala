---
title: Integrating Sveltekit and Supabase
tags: supabase
featured: false
type: sveltekit
---

This is an example of how to integrate Supabase with Sveltekit. Some caveats to keep in mind:

1. Using utilities like Supabase with Sveltekit involves the use of secret keys, such as a Supabase project's API key. 
2. These secret values should never be used such that they are passed out publicly, as it creates a major security vulnerability.
3. In Sveltekit, this means that 'private environment variables' are only used in server-side code, and never in client-side code.

###### Simply put, server-side code runs on the web-server (uses host-side resources/applications) while client-side code runs on the user's end. This is why private keys should not pass to client-side codes.

#### Install Supabase

I'm going to assume instances of Sveltekit and Supabase projects already set up and running. To begin on this with Supabase, first:

```shell
npm install @supabase/supabase-js

//or

yarn add @supabase/supabase-js
```

Next, we must incorporate into Sveltekit the private environment variables we will need, to access our Supabase project. These are the *public url* and *public anon key* of the project, which are found in our Supabase project Settings as **Project URL** and **Project API Keys**. While the URL is public and you may well have use-cases of letting users call it directly, the API keys are not to be publicly shared. Also look into row-level-security at Supabase (RLS).

#### Keys and Client

Create a file title .env in your root Sveltekit folder. This means that if you have a project folder titled 'Bananas,' within which you would have 'src,' 'static,' 'lib' and other folders, create the .env file in the folder 'Bananas'. Inside this file, we add the two variables like so:

```shell
VITE_SUPABASE_URL="project_url"
VITE_SUPABASE_ANON_KEY="project_api_keys"
```

I've found that the above works whether or not we enter the values within quotes. But as a general practice I've been using quotes. With the above done, we create the Supabase client. Depending on your Sveltekit project structure, this client is to be created where you create your general utility and function ts/js files. For example, I use a folder titled 'lib' inside the root project folder, within which sub-folders carry components, stylesheets, utilities etc. So in lib > utils I create a file titled 'supabase.ts.' (you can call the file anything you like.)

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default supabase
```

In the above code, we first import a client-creator that the Supabase library we previously installed supplies. Then, a simple client is created and set as default export, which uses the private environment variables we've placed in the .env file. This instance can now be called in any page, layout or page.ts file like so:

```javascript
import supabase from '$lib/utils/supabase'
```

#### Fetch and Render

I prefer to create all my project Supabase functions in the same file as this client creator. So the above code is followed by all sorts of async functions that fetch from different Supabase tables as required. We'll look at one example of how this is done. Assume a Supabase table titled 'notes' which has the columns 'id', 'title', and 'note'. I can fetch the data like so:

```javascript
export async function myNotes(){
	const { data, error } = await supabase
	.from('notes')
	.select()
	.order('id')
	if (error) throw new Error(error.message)
	return data
}
```

Now, in any component or on a +page.svelte I can call and render this data:

```html
<script lang="ts">
	import { onMount } from 'svelte'
	import { myNotes } from '$lib/utils/supabase'

	let notes:any

	onMount(async() => {
		notes = await myNotes()
	})
</script>
```

```html
<div>
	{#if notes && notes.length > 0}
		{#each notes as item}
			<p>{item.note}</p>
		{/each}
	{/if}
</div>
```

In the above code, we call the function and mount it under an async wrap as shown. Then we use an `{#each}` iteration to render the data. Sometimes in Sveltekit you may encounter an error of "length undefined," to prevent which we use the `{#if}` key as shown.

Well, that's it then. In this way you can integrate Supabase with Sveltekit. <a href="https://supabase.com/docs/reference/javascript/introduction" target="_blank" rel="noreferrer">Supabase</a> has great documentation on how to fetch data in different ways and filters. 
