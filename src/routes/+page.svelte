<script lang="ts">

	import { onMount } from 'svelte'
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'	
	import type { ChatCompletionRequestMessage } from 'openai'
	import { TagsFiltered } from '$lib/utils/supabase'
	import { SSE } from 'sse.js'
	import Postal from '$lib/components/Postal.svelte'
	import supabase from '$lib/utils/supabase'
	let submittance:any
	let query: string = ''
	let answer: string = ''
	let userprompt:any
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let tags = 'star'
	let codas:any
	let fake = false

	let area:boolean[] = Array(9).fill(false)
	area[1] = true

	function fauxfake(){
		fake = !fake
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

	function handleKeyDownInput(e:any){
		if (e.shiftkey && e.key === 'enter') {
			e.preventDefault(),
			query += '\n'
		}
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

	function changeTag(newTag:any){
		tags = newTag
	}

	$: if ( tags ) {
		(async() => {
		codas = await TagsFiltered(tags)
		})()
	}


	onMount(async() => {
		hljs.highlightAll()	
		codas = await TagsFiltered(tags)
	})
</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>



<div class="introarea buffer bufferYt">
	<p>
		A simple blog to document a non-programmer bootstrapping himself into web-dev. <span class="special">My stack:</span>
	</p>
	<p>
		- backend at <a href="https://supabase.com/" target="_blank" rel="noreferrer">Supabase</a><br>
		- framework: <a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">Sveltekit</a><br>
		- deployed at <a href="https://vercel.com/home" target="_blank" rel="noreferrer">Vercel</a><br>
		- also mounted:
	</p>
	<ul>
		<li><a href="https://lenis.studiofreight.com/" target="_blank" rel="noreferrer">Lenis</a></li>
		<li><a href="https://greensock.com/gsap/" target="_blank" rel="noreferrer">GSAP</a></li>
		<li><a href="https://mdsvex.pngwn.io/" target="_blank" rel="noreferrer">MDSvex</a></li>
		<li><a href="https://github.com/SharifClick/svelte-swipe" target="_blank" rel="noreferrer">Svelte Swipe</a></li>
		<li><a href="https://github.com/DaveKeehl/svelte-reveal" target="_blank" rel="noreferrer">Svelte Reveal</a></li>
		<li><a href="https://sveltelegos.com/" target="_blank" rel="noreferrer">Svelte Legos</a></li>
		<li><a href="https://prismjs.com/" target="_blank" rel="noreferrer">Prism JS</a></li>
	</ul>
	<p>
		Browse/search through an unorganized assortment of code snippets, setup guides and troubleshooting pointers. Play with broGPT, my AI pal, below.
	</p>
</div>
<div class="inviewarea buffer bufferYb">
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
</div>

<div class="thinstrip">
	<div on:click={() => changeTag('star')} on:keydown={fauxfake} class="{ tags === 'star' ? 'currentTag' : ''}">Star</div>
	<div on:click={() => changeTag('sveltecode')} on:keydown={fauxfake} class="{ tags === 'sveltecode' ? 'currentTag' : ''}">Sveltecode</div>
	<div on:click={() => changeTag('scroll')} on:keydown={fauxfake} class="{ tags === 'scroll' ? 'currentTag' : ''}">Scroll</div>
	<div on:click={() => changeTag('gpt')} on:keydown={fauxfake} class="{ tags === 'gpt' ? 'currentTag' : ''}">GPT</div>
	<div on:click={() => changeTag('supabase')} on:keydown={fauxfake} class="{ tags === 'supabase' ? 'currentTag' : ''}">Supabase</div>
	<div on:click={() => changeTag('animation')} on:keydown={fauxfake} class="{ tags === 'animation' ? 'currentTag' : ''}">Animations</div>
	<div on:click={() => changeTag('template')} on:keydown={fauxfake} class="{ tags === 'template' ? 'currentTag' : ''}">Templates</div>
	<div on:click={() => changeTag('error')} on:keydown={fauxfake} class="{ tags === 'error' ? 'currentTag' : ''}">Errors</div>
	<div on:click={() => changeTag('fetch')} on:keydown={fauxfake} class="{ tags === 'fetch' ? 'currentTag' : ''}">Fetch</div>
	<div on:click={() => changeTag('setup')} on:keydown={fauxfake} class="{ tags === 'setup' ? 'currentTag' : ''}">Setups</div>
	<div on:click={() => changeTag('typography')} on:keydown={fauxfake} class="{ tags === 'typography' ? 'currentTag' : ''}">Typography</div>
</div>
<div class="standardbloggrid buffer bufferYb x00">
	{#if codas && codas.length > 0}
		{#each codas as item, i}
			<Postal i={i} linkvar="/codes/{item.counting}">
				<small slot="postalone">{item.lang}</small>
				<h5 slot="postaltwo">{item.title}</h5>
				<p slot="postalthree">{item.tags}</p>
				<pre slot="codes">
					<code class="language-{item.lang}">
						{item.codesnippet}
					</code>
				</pre>
			</Postal>
		{/each}
	{/if}
</div>	


<style lang="sass">

.x00
	align-items: start
	align-content: start

.thinstrip
	div
		cursor: pointer
		border: 1px solid #272727
		border-radius: 4px
		cursor: pointer
		transform-origin: center center
		color: #FFFFFF
		transition: all 0.15s ease
		box-shadow: none
		font-size: 14px
		padding: 4px 8px
		position: relative
		z-index: 1
		&::before
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			content: ''
			z-index: -1
			background-color: hsla(100,90%,5%,1)
			transition: all 0.05s ease
			filter: blur(30px)
			background-image: radial-gradient(at 17% 36%, hsla(148,97%,99%,1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,1) 0px, transparent 50%)
		&:hover
			box-shadow: 4px 6px 12px #010101
			overflow: hidden
			background: #111111
			&::before
				background-color: hsla(100,90%,25%,1)
				filter: blur(15px)
	.currentTag
		&::before
			filter: blur(30px)
			background-color: hsla(100,90%,95%,1)
			background-image: radial-gradient(at 99% 90%, hsla(248,79%,99%,1) 0px, transparent 100%), radial-gradient(at 8% 7%, hsla(395,99%,90%,1) 0px, transparent 10%)
		

.thinstrip
	.currentTag
		background: #171717
		border: 1px solid #272727

.thinstrip
	display: flex
	@media screen and (min-width: 1024px)
		flex-direction: row
		justify-content: center
		gap: 48px

	
p .special
	background: #64F540
	background: linear-gradient(to right, #64F540 0%, #11E876 50%, #07E859 100%)
	-webkit-background-clip: text
	-webkit-text-fill-color: transparent
a
	position: relative
	&:hover
		background: #64F540
		background: linear-gradient(to right, #64F540 0%, #11E876 50%, #07E859 100%)
		-webkit-background-clip: text
		-webkit-text-fill-color: transparent
		&::after
			animation: vanishing 0.08s ease forwards
	&::after
		position: absolute
		bottom: 0
		left: 0
		height: 1px
		width: 100%
		content: ''
		background: #64F540
		background: linear-gradient(to right, #64F540 0%, #11E876 50%, #07E859 100%)
p
	font-family: 'Spline Sans', sans-serif
	font-size: 16px
	color: #FFFFFF
	line-height: 2
li
	font-family: 'Spline Sans', sans-serif
	font-size: 14px
	color: #FFFFFF
	line-height: 1.5
	list-style-type: none
	padding: 0
	margin-left: 32px

@media screen and (max-width: 1023px)
	p .special
		padding: 16px
		margin-left: 0
		margin-right: 0
		padding: 0 0 24px 0
		width: 100%
		border-bottom: 1px solid #272727
	p
		font-size: 14px

	
.ofform
	width: 100%
	transition: all 0.15s ease
	margin-top: 8px
	form
		display: flex
		flex-direction: row
		gap: 16px
	form input
		height: 64px
		border: 1px solid #272727
		color: white
		padding: 16px
		background: #171717
		outline: none
		width: 100%

</style>