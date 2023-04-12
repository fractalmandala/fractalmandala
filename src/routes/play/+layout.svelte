<script lang="ts">


	import Header from '$lib/components/Header.svelte'
	import '$lib/styles/syntax.sass'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'	
	import supabase from '$lib/utils/supabase'
	import { onMount } from 'svelte'
	import { chatswithGPT } from '$lib/utils/supabase'
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	let fake:boolean = false
	let submittance:any
	let y:number
	let query: string = ''
	let answer: string = ''
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let userprompt:any
	let supachats:any 
	let limit:number = 6

	function increaseLimit(){
		limit = limit + 4;
		(async() => {
			supachats = await chatswithGPT(limit)
		})()
	}



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

	$: if (submittance) {
		submitAnswer()	
	}

	async function submitAnswer(){
		try {
			const { error } = await supabase
      .from('amrit-chatswithgpt')
      .insert({ prompt: userprompt, response: submittance })
      if (error) {
        throw new Error(error.message)
      }
      console.log('submitted')
    } catch (e) {
      console.error('Error inserting into Supabase:', e)
    }
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

	onMount(async() => {
		hljs.highlightAll()	
		supachats = await chatswithGPT(limit)
	})

</script>


<Header></Header>
<div class="radiationonly">
<div class="pagecontainer x0">
	<div class="selectionsarea">
		{#if supachats && supachats.length > 0}
			{#each supachats as item}
				<a href="/play/{item.id}" target="_self">
				<div class="sidebox sideuser">
					<p>{item.prompt.slice(0,100)}</p>
				</div>
				</a>
			{/each}
		{/if}
		<button class="glowing" on:click={increaseLimit} on:keydown={fauxfake}>Load More</button>
	</div>
	<div class="gptarea">
		<div class="chatdisplay">
		<slot></slot>
		</div>
		<div>
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
				<form on:submit|preventDefault={() => handleSubmit()}>
					<input type="text" bind:value={query} />
					<button class="glowing" type="submit"> Send </button>
				</form>
			</div>
		</div>
	</div>
</div>
</div>

<style lang="sass">

.sidebox
	width: 100%
	overflow: hidden
	padding-bottom: 4px

.sideuser
	text-align: left
	p
		text-transform: capitalize
		color: #878787
		font-size: 12px

.gptarea
	backdrop-filter: blur(20px)
	background: rgba(0,0,0,0.2)
	grid-area: gptarea
	@media screen and (min-width: 1024px)
		padding-right: 6vw
		padding-left: 6vw
		padding-top: 2vw
		padding-bottom: 6vw
		display: flex
		flex-direction: column
		justify-content: flex-start
		row-gap: 16px

.x0
	min-height: 100vh
	position: relative
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		padding-top: 0
		padding-bottom: 0
		grid-template-columns: 320px 1fr
		grid-template-areas: "selectionsarea gptarea"
		gap: 0 0px
		padding-left: 0
		padding-right: 0
		.selectionsarea
			padding-top: 2vw
			padding-left: 2vw
			padding-right: 2vw
			display: flex
			flex-direction: column
			row-gap: 0px

.selectionsarea
	border-right: 1px solid #272727
	grid-area: selectionsarea
	a
		&:hover
			p
				color: #10C56D

.ofform
	width: 100%
	transition: all 0.15s ease
	margin-top: 32px
	form
		display: flex
		flex-direction: row
		gap: 16px
	form input
		width: 600px
		height: 64px
		border: 1px solid #272727
		color: white
		padding: 16px
		background: #171717
		outline: none

.radiationonly
	background-color: hsla(0,0%,4%,1)
	animation: radiation 30s ease infinite
	margin-top: -8px
	width: 100vw
	box-sizing: border-box
	overflow: hidden

@keyframes radiation
	0%
		background-image: radial-gradient(at 100% 100%, hsla(143,89%,21%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(180,2%,4%,0.1) 0px, transparent 5%), radial-gradient(at 82% 73%, hsla(206,89%,47%,0.1) 0px, transparent 50%), radial-gradient(at 31% 100%, hsla(306,89%,28%,0.1) 0px, transparent 50%)
	50%
		background-image: radial-gradient(at 100% 100%, hsla(143,89%,21%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(180,2%,4%,0.1) 0px, transparent 5%), radial-gradient(at 82% 73%, hsla(206,89%,47%,0.1) 0px, transparent 50%), radial-gradient(at 31% 100%, hsla(306,89%,28%,0.1) 0px, transparent 50%)
	100%
		background-image: radial-gradient(at 100% 100%, hsla(143,89%,21%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(180,2%,4%,0.1) 0px, transparent 5%), radial-gradient(at 82% 73%, hsla(206,89%,47%,0.1) 0px, transparent 50%), radial-gradient(at 31% 100%, hsla(306,89%,28%,0.1) 0px, transparent 50%)


</style>