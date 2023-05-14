---
title: ChatGPT in Sveltekit
tags: ai, chatgpt
featured: false
---

I was able to integrate chatGPT into my Sveltekit project thanks to the wonderful tutorial and <a href="https://github.com/huntabyte/chatty" target="_blank" rel="noreferrer">accompanying code</a> by Huntabyte. So what you read below is simply a modification of this original integration.

I'm going to skip the general intros on creating a Sveltekit project and assume that you already have that set up. What's important, if you haven't done this already, is to sign up at OpenAI and acquire your API key. Please refer to their site for how to do this.

So, we have a Sveltekit project set up, and we have an OpenAI API key, let's begin!

#### API Key and OpenAI installation.
If you do not have this already, create a file named '.env' in the root folder of your project, and store the API key there like so:

```bash
VITE_OPENAI_API_KEY="your-key-here"
```

You can call this key in any file by importing it:

```javascript
import { VITE_OPENAI_API_KEY } from '$env/static/private'
```

And this is how you can use any private keys in fact. Next, install OpenAI's javascript library:

```bash
npm install openai
```

I'm assuming you are familiar with installing libraries in Sveltekit using NPM. You can also use Yarn if that's your thing. 

###### It is recommended that throughout your project's lifetime, use either NPM or Yarn, but never mix those.

#### Other Installations

For utility functions in communicating with OpenAI's library, we need to install a few more libraries. Install the GPT3 Tokenizer from <a href="https://www.npmjs.com/package/gpt3-tokenizer" target="_blank" rel="noreferrer">here</a>, and a helper for server-side events named SSE from <a href="https://www.npmjs.com/package/sse" target="_blank" rel="noreferrer">here.</a>

Information on what these are, and what they do, can be found at OpenAI's documentation, but put simply the tokenizer helps you control the usage of tokens in chatGPT, and SSE helps stream the responses instead of receiving them as a single chunk.

#### API Setup

Now the fun part! Create a folder inside 'routes' and name it 'api.' Create another folder inside that and name it 'chat.' Here, create a file named '+server.ts' (or .js if you've still not moved to Typescript!). This is assuming your project has a folder structure where all API functions are inside the route /routes/api, and within it each API file is a +server.ts inside a folder of its own name. In this file, paste the following code:

```javascript
import { VITE_OPENAI_API_KEY } from '$env/static/private'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import type { RequestHandler } from './$types'
import { getTokens } from '$lib/utils/tokenizer'
import { json } from '@sveltejs/kit'

export const config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		if (!VITE_OPENAI_API_KEY) {
			throw new Error('OPENAI_KEY env variable not set')
		}

		const requestData = await request.json()

		if (!requestData) {
			throw new Error('No request data')
		}

		const reqMessages: ChatCompletionRequestMessage[] = requestData.messages

		if (!reqMessages) {
			throw new Error('no messages provided')
		}

		let tokenCount = 0

		reqMessages.forEach((msg) => {
			const tokens = getTokens(msg.content)
			tokenCount += tokens
		})

		

		const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${VITE_OPENAI_API_KEY}`
			},
			method: 'POST',
			body: JSON.stringify({
				input: reqMessages[reqMessages.length - 1].content
			})
		})
		if (!moderationRes.ok) {
			const err = await moderationRes.json()
			throw new Error(err.error.message)
		}

		const moderationData = await moderationRes.json()
		const [results] = moderationData.results

		if (results.flagged) {
			throw new Error('Query flagged by openai')
		}

		const prompt =
			'You are a modern digital assistant.'
		tokenCount += getTokens(prompt)

		if (tokenCount >= 4000) {
			throw new Error('Query too large')
		}

		 

		const messages: ChatCompletionRequestMessage[] = [
			{ role: 'system', content: prompt },
			...reqMessages
		]

		const chatRequestOpts: CreateChatCompletionRequest = {
			model: 'gpt-3.5-turbo',
			messages,
			temperature: 0.9,
			stream: true
		}

		const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
			headers: {
				Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(chatRequestOpts)
		})

		if (!chatResponse.ok) {
			const err = await chatResponse.json()
			throw new Error(err.error.message)
		}

		return new Response(chatResponse.body, {
			headers: {
				'Content-Type': 'text/event-stream'
			}
		})
	} catch (err) {
		console.error(err)
		return json({ error: 'There was an error processing your request' }, { status: 500 })
	}
}
```

As you might notice, this file has an internal dependency through the import of getTokens from tokenizer. So, create a file called tokenizer.ts wherever you store all your utility functions. I store them at /src/lib/utils, so modify the import path according to your own structure. In tokenizer.ts, use this code:

```javascript
import GPT3TokenizerImport from 'gpt3-tokenizer'

const GPT3Tokenizer: typeof GPT3TokenizerImport =
	typeof GPT3TokenizerImport === 'function'
		? GPT3TokenizerImport
		: (GPT3TokenizerImport as any).default

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

export function getTokens(input: string): number {
	const tokens = tokenizer.encode(input)
	return tokens.text.length
}
```

#### Chat Helper

Create a component named ChatMessages.svelte, and use this code:

```html
<script lang="ts">


	import { onMount } from 'svelte'
	import { draggableAction } from 'svelte-legos'
	import { fade } from 'svelte/transition'
	import { elasticOut } from 'svelte/easing'
	let sampler:any
	let pressed = false
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai'

	onMount(async() => {
		sampler = message
	})

	export let type: ChatCompletionRequestMessageRoleEnum
	export let message: string


</script>

<div class="boxofchat {type === 'user' ? 'chat-end' : 'chat-start'}" in:fade={{ duration: 300, delay: 50, easing: elasticOut }} class:packaged={pressed} use:draggableAction>
	<div class="agent {type === 'user' ? 'user' : 'broGPT'}">
		{type === 'user' ? 'user' : 'broGPT'}:
	</div>
	<pre class="commbody {type === 'user' ? 'user' : 'broGPT'}">
		{@html message}
	</pre>
	{#if pressed}
	<span style="color: white">STORED</span>
	{/if}
</div>
```

I've skipped sharing any styling in this post, so bear in mind that you will have to manage that at your end. This includes styling to parse the code in GPT's responses, and to insert line-breaks, para-breaks etc. where needed.

Now it's time to bring this all together:

#### The Chats Page

Create a +page.svelte file where you want to host the chatting section. I'm going to break down the code of this file to show different functions. If all you need is the code to copy and paste, just use the original code by Huntabyte shared at this post's beginning.

Import all required files:

```javascript
	import { onMount } from 'svelte'
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
```

Function to handle submission of prompt:

```javascript
	const handleSubmit = async () => {
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]
		userprompt = query
		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		})

		query = ''

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', (e: {data: string;}) => {
			try {
				loading = false
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }]
					console.log(answer)
					submittance = answer
					answer = ''
					return
				}

				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices

				if (delta.content) {
					answer = (answer ?? '') + delta.content
				}
			} catch (err) {
				handleError(err)
			}
		})
		eventSource.stream()
	}
```

Those with a keen eye may notice the line 'submittance = answer' in the code above. I'll tell ya what that's for in the bonus section ;)

Code for error handling: 

```javascript
	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}
```

HTML Markup to render the chats:

```html
	<ChatMessage type="assistant" message="Namaste. How may I help you?" />	
	{#each chatMessages as message}
		<ChatMessage type={message.role} message={message.content} />
	{/each}
	{#if answer}
		<ChatMessage type="assistant" message={answer}/>
	{/if}
	{#if loading}
		<ChatMessage type="assistant" message="Loading.." />
	{/if}
	<div class="boxc ofform">
		<form on:submit|preventDefault>
			<input type="text" bind:value={query}
				on:keydown={handleKeyDownInput}
				/>
			<button class="glowing" type="submit" on:click={() => handleSubmit()} on:keydown={handleKeyDownInput}> Send </button>
		</form>
	</div>
```

And that's it! With this you have a basic version of chatGPT set up in your own Sveltekit project. But if you start using this, you'll notice that each chunk of chat disappears as soon as you begin a new one. Wait a minute! What about chat history! What if you want to save your chats!

Well, since I love Supabase, I decided to integrate all of this with a Supabase table, so all my chats are automatically pushed there and stored, from where I can fetch them whenever I like. You can use this kind of implementation with your own database, but if you want to know how to integrate Supabase with Sveltekit, you can check <a href="/mandala/sveltekitandsupabase" target="_blank" rel="noreferrer">this post.</a>

#### Bonus - DB Integration

What we need essentially is to insert each prompt and each response into a Supabase table. You can get more creative if you like, but this covers the basic need. So I have a table in Supabase titled 'chatswithgpt' which has 2 columns- 'prompt' and 'response.'

I need to submit each response AFTER the stream is over (if you try before, it creates as many row-entries in the table as there were tokens in the response.) and each prompt after it is submitted. Let's look at the prompt first, which is being submitting in the form we added on the page above. The form runs a function 'handleSubmit' on click.

###### And here let's recall the line submittance = answer in the handleSubmit function! This takes the complete answer and assigns it as a string to a declared variable named 'submittance.'

We need to track any changes to this variable, so let's have some fun Svelte reactivity:

```javascript
	$: if (submittance) {
		submitAnswer()	
	}
```

This watches the variable submittance, and runs a function submitAnswer whenever there is a change in it. The submitAnswer function is a generic async function to insert data in Supabase:

```javascript
	async function submitAnswer(){
		try {
			const { error } = await supabase
      .from('chatswithgpt')
      .insert({ prompt: userprompt, response: submittance })
      if (error) {
        throw new Error(error.message)
      }
      console.log('submitted')
    } catch (e) {
      console.error('Error inserting into Supabase:', e)
    }
	}
```

Notice, it has another variable named 'userprompt,' and that we can get from the input form too, where the input prompt is bind to the variable 'query.' Which is why in the handleSubmit function we have the line:

```javascript
userprompt = query
```

So what we're doing in handleSubmit is that, between communicating with the OpenAI API, we're assigning the prompt and response strings to 2 variables that we can insert into Supabase. By using Svelte's reactive variable feature, we are able to know whenever the response variable receives new text, and use that to trigger a submit function to Supabase. 

#### Bonus Inside Bonus!

In Supabase, you can create a vector column in the same table, and begin creating vector embeddings of all communication with chatGPT. Then, use these to fine tune your own models. 

###### I used GPT to make the GPT *insert thanos meme*