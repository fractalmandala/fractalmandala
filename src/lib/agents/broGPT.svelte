<script lang="ts">

	import { onMount } from 'svelte'
	import { breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import ChatMessages from '$lib/components/ChatMessage.svelte'
	import type { ChatMessage } from '$lib/buildapp/types'
	import '$lib/styles/themes.sass'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import supabase from '$lib/utils/supabase'
	let query: string = ''
	let answer: string = ''
	let chatId:any
	let userprompt:any
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let fake = false


	const handleSubmit = async () => {
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]
		userprompt = query
		const eventSource = new SSE('api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		})

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', (e: {data: string;}) => {
			try {
				loading = false
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }]
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

	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}

	function fauxfake(){
		fake = !fake
	}	

</script>

<div class="boxshowing"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
{#each chatMessages as message}
	<ChatMessages type={message.role} message={message.content} />
{/each}
{#if answer}
	<ChatMessages type="assistant" message={answer}/>
{/if}
{#if loading}
	<ChatMessages type="assistant" message="Loading.." />
{/if}
</div>
<div class="boxr ofform">
	<form on:submit|preventDefault>
		<textarea bind:value={query}
			on:keydown={fauxfake}
			/>
		<button class="secondbutton" on:click={() => handleSubmit()}>Send</button>
	</form>
</div>

<style lang="sass">

.levelzero.boxshowing
	border: var(--bord)
	padding: 32px
	border-radius: 6px

.ofform
	width: 100%
	transition: all 0.15s ease
	margin-top: 16px
	margin-bottom: 16px
	form
		display: flex
		flex-direction: row
		gap: 16px
		width: 100%
	form textarea
		height: 64px
		border: var(--bord)
		color: var(--opposite)
		padding: 16px
		background: var(--background)
		outline: none
		width: 80%



</style>