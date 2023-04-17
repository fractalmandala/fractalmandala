<script lang="ts">

	import { onMount } from 'svelte'
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import '$lib/styles/themes.sass'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import supabase from '$lib/utils/supabase'
	let query: string = ''
	let answer: string = ''
	let userprompt:any
	let submittance = ''
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let fake = false

	const handleSubmit = async () => {
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]
		userprompt = query
		const eventSource = new SSE('api/sanskrit', {
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

	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}

	async function submitAnswer(){
		try {
			const { error } = await supabase
      .from('amrit-notes')
      .insert({ title: 'chat with gpt', note: userprompt, codesnippet: submittance, type: 'gptchat' })
      if (error) {
        throw new Error(error.message)
      }
      console.log('submitted')
    } catch (e) {
      console.error('Error inserting into Supabase:', e)
    }
	}

	function fauxfake(){
		fake = !fake
	}	

	$: if (submittance) {
		submitAnswer()	
	}


</script>

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
		<textarea bind:value={query}
			on:keydown={fauxfake}
			/>
		<div class="major blue" on:click={() => handleSubmit()} on:keydown={fauxfake}> Send </div>
	</form>
</div>

<style lang="sass">

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
		font-family: 'Spline Sans', sans-serif
		height: 64px
		border: 1px solid #272727
		color: white
		padding: 16px
		background: #171717
		outline: none
		width: 80%
	.major
		width: calc(20% - 16px)
		display: flex
		align-items: center
		justify-content: center

</style>