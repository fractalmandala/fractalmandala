<script lang="ts">

	import { onMount } from 'svelte'
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import { scale } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import type { ChatCompletionRequestMessage } from 'openai'
	import { TagsFiltered } from '$lib/utils/supabase'
	import { allMandalas } from '$lib/utils/localpulls'
	import { SSE } from 'sse.js'
	import Postal from '$lib/components/Postal.svelte'
	import BigCard from '$lib/components/BigCard.svelte'
	import supabase from '$lib/utils/supabase'
	let submittance:any
	let query: string = ''
	let answer: string = ''
	let answerTitle: string = ''
	let userprompt:any
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []
	let chatTitle: ChatCompletionRequestMessage[] = []
	let tags = 'star'
	let codas:any
	let fake = false
	let gridalign = false
	let posts:any
	let expand:boolean[] = Array(20).fill(false)
	let area:boolean[] = Array(9).fill(false)
	area[1] = true
	let allfalse = false

	$: if ( expand.every(i => i === false )) {
		allfalse = true
	} else {
		allfalse = false
	}

	function fauxfake(){
		fake = !fake
	}

	function togglePostItem(index:number){
		expand[index] = !expand[index]
			for (let i = 0; i < expand.length; i++) {
			if (i !== index && expand[i] === true) {
			expand[i] = false;
			}
			if ( expand.every(i => i === false )) {
				gridalign = false
			} else
				gridalign = true
		}
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

	const handleTitle = async () => {
		chatTitle = [...chatMessages, { role: 'user', content: query }]
		userprompt = query
		const eventSource = new SSE('/api/title', {
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
					chatTitle = [...chatMessages, { role: 'assistant', content: answerTitle }]
					answerTitle = ''
					return
				}

				const completionResponse = JSON.parse(e.data)
				const [{ delta }] = completionResponse.choices

				if (delta.content) {
					answerTitle = (answerTitle ?? '') + delta.content
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
			handleTitle()
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
		posts = await allMandalas()
		
	})
</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>



<div class="introarea buffer wider bufferYt">
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
<div class="inviewarea buffer wider bufferYb">
	<h5>{answerTitle}</h5>
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
				<textarea bind:value={query}
					on:keydown={handleKeyDownInput}
					/>
				<button class="glowing" type="submit" on:click={() => handleSubmit()} on:keydown={handleKeyDownInput}> Send </button>
			</form>
		</div>
</div>

<div class="newgrid buffer wider bufferYb x00">
	{#if posts && posts.length > 0}
		{#each posts as item, i}
			<div class="postal" on:click={() => togglePostItem(i)} on:keydown={fauxfake} class:opened={expand[i]} in:scale={{delay: 50*i, easing: backOut }} out:scale={{ delay: 10*i, easing: backIn }}>
				<small>{item.meta.type}</small>
				<h5>
					<a href={item.path}>
						{item.meta.title}
					</a>
				</h5>
				<p>{item.meta.tags}</p>
			</div>
		{/each}
	{/if}
</div>

<div class="thinstrip buffer wider">
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
<div class="newgrid buffer wider bufferYb x00" class:calibratedgrid={gridalign}>
	{#if codas && codas.length > 0}
		{#each codas as item, i}
			<div class="postal" on:click={() => togglePostItem(i)} on:keydown={fauxfake} class:opened={expand[i]} in:scale={{delay: 50*i, easing: backOut }} out:scale={{ delay: 10*i, easing: backIn }}>
					<small>{item.type}</small>
					<h5>
						{#if item.type.length > 0 && item.type === 'code'}
						<a href="/mandala/codes/{item.counting}">
						{item.title}
						</a>
						{:else}
						<a href="/mandala/notes/{item.counting}">
						{item.title}
						</a>				
						{/if}
					</h5>
					<p>{item.lang} - {item.tags}</p>
					{#if expand[i]}
						<BigCard language={item.lang}>
							{item.codesnippet}
						</BigCard>
					{/if}
			</div>
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
		box-shadow: 4px 6px 12px #010101
		overflow: hidden
		background: #111111
		color: #FFFFFF
		transition: all 0.15s ease
		font-size: 14px
		padding: 4px 8px
		position: relative
		z-index: 1
		text-align: center
		&::before
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			content: ''
			z-index: -1
			background-color: hsla(100,90%,25%,1)
			transition: all 0.05s ease
			filter: blur(30px)
			background-image: radial-gradient(at 17% 36%, hsla(148,97%,99%,1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,1) 0px, transparent 50%)
		&:hover
			overflow: visible
			&::before
				background-color: hsla(100,90%,5%,1)
				filter: blur(15px)
	.currentTag
		&:hover
			overflow: visible
		&::before
			filter: blur(30px)
			background-color: hsla(100,9%,9%,0.1)
			background-image: radial-gradient(at 9% 90%, hsla(248,79%,99%,0.1) 0px, transparent 100%), radial-gradient(at 8% 7%, hsla(395,99%,90%,0.1) 0px, transparent 10%)
		

.thinstrip
	.currentTag
		background: var(--purp)
		border: 1px solid #272727
		box-shadow: none
	div.currentTag
		box-shadow: none

.thinstrip
	display: grid
	grid-auto-flow: row
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
		grid-template-rows: 1fr 1fr
		gap: 16px 16px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-rows: 1fr 1fr 1fr
		gap: 8px 8px

	
p .special
	background: #64F540
	background: linear-gradient(to right, #64F540 0%, #11E876 50%, #07E859 100%)
	-webkit-background-clip: text
	-webkit-text-fill-color: transparent

.introarea a
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

.introarea p
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
	form textarea
		height: 64px
		border: 1px solid #272727
		color: white
		padding: 16px
		background: #171717
		outline: none
		width: 100%

.inviewarea
	h5
		color: white

</style>