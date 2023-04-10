<script lang="ts">

	import Header from '$lib/components/Header.svelte'
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'

	let query: string = ''
	let answer: string = ''
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let scrollToDiv: HTMLDivElement

	function scrollToBottom() {
		setTimeout(function () {
			scrollToDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
		}, 100)
	}

	const handleSubmit = async () => {
		loading = true
		chatMessages = [...chatMessages, { role: 'user', content: query }]

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: chatMessages })
		})

		query = ''

		eventSource.addEventListener('error', handleError)

		eventSource.addEventListener('message', (e: {data: string;}) => {
			scrollToBottom()
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
		scrollToBottom()
	}

	function handleError<T>(err: T) {
		loading = false
		query = ''
		answer = ''
		console.error(err)
	}
</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Spline+Sans+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<Header></Header>

<div class="pagecontainer x0">
	<div class="boxc">
		<ChatMessage type="assistant" message="Yo! I'm broGPT. Whatcha wanna know?" />
			{#each chatMessages as message}
				<ChatMessage type={message.role} message={message.content} />
			{/each}
			{#if answer}
				<ChatMessage type="assistant" message={answer} />
			{/if}
			{#if loading}
				<ChatMessage type="assistant" message="Loading.." />
			{/if}
		</div>
		<div class="" bind:this={scrollToDiv} />
	<div class="boxc ofform">
		<form on:submit|preventDefault={() => handleSubmit()}>
			<input type="text" bind:value={query} />
			<button type="submit"> Send </button>
		</form>
	</div>
</div>

<style lang="sass">

.x0
	min-height: 100vh
	@media screen and (min-width: 1024px)
		padding-left: 24vw
		padding-right: 24vw

.ofform
	width: 100%
	box-shadow: -3px -5px 8px rgba(0,0,0,0.7)
	transition: all 0.15s ease
	&:hover
		box-shadow: -3px -5px 8px rgba(0,0,0,0.0)
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
	form button
		width: 128px
		color: white
		cursor: pointer
		border-radius: 4px
		background: #171717
		position: relative
		backdrop-filter: blur(20px)
		border: 1px solid #272727
		z-index: 3
		color: white
		transition: all 0.32s ease
		&::before
			position: absolute
			top: 0
			left: 0
			right: 0
			content: ''
			width: 100%
			height: 100%
			border-radius: 4px
			margin: 0 auto
			z-index: -1
			background: linear-gradient(89deg, rgba(16,213,108,0.2), rgba(40,170,53,0.4))
			background-size: 400% 400%
			animation: theglowing 8s ease infinite
			filter: blur(30px)
		&::after
			position: absolute
			background: rgba(0,0,0,0.6)
			backdrop-filter: blur(10px)
			content: ''
			top: 0
			left: 0
			width: 100%
			height: 100%
			z-index: -1
			border-radius: 4px
		&:hover
			overflow: hidden
			&::after
				background: rgba(0,0,0,0.2)


@keyframes theglowing
	0%
		background-position: 0% 50%
	50%
		background-position: 100% 50%
	100%
		background-position: 0% 50%


</style>