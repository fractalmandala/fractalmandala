<script lang="ts">

	import { onMount } from 'svelte'
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'	
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import BigCard from '$lib/components/BigCard.svelte'
	import { get, writable } from 'svelte/store'
	import supabase from '$lib/utils/supabase'
	import { allNotes, allCodes, noCodes, allOthers, CodeCSS, CodeJS, CodeHTML, quillNotes, MidjourneyImages, MidjourneyTagged, chatsGPT, onlyStarred, singleNote } from '$lib/utils/supabase'
	import { allDocs, allMandalas } from '$lib/utils/localpulls'
	let submittance:any
	let query: string = ''
	let answer: string = ''
	let userprompt:any
	let loading: boolean = false
	let chatMessages: ChatCompletionRequestMessage[] = []

	const searchStore = writable('')
	let searchinput
	const resultsStore = writable([])
	let showResults = false
	let loadingStore = false;	
	let notes:any
	let codes:any
	let gens:any
	let ccss:any
	let cjs:any
	let chtml:any
	let docs:any
	let images:any
	let quills:any
	let chats:any
	let posts:any
	let nocodas:any
	let stars:any
	let faux:boolean = false
	let imageTag:any = ''
	let taggedimages:any
	let lightbox:boolean[] = Array(400).fill(false)
	let area:boolean[] = Array(9).fill(false)
	let inView:boolean[] = Array(300).fill(false)
	area[1] = true
	inView[1] = true
	let title:any
	let single:any
	let galleryView:boolean = false
	let postsview:boolean = false
	let openSidebar:boolean = false

	function showGallery(){
		galleryView = !galleryView
		if ( postsview === true) {
			postsview = false
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

	const searchWord = async() => {
	loadingStore = true
	showResults = true
	const searchTerm = get(searchStore)
	let results: any[] = []
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.textSearch('fts', searchTerm)
		.order('id')
		if (error) throw new Error(error.message)
		results = results.concat(data)
	// @ts-ignore
	resultsStore.set(data)
	loadingStore = false
	searchinput = ''
}

	$: if (imageTag) {
			(async() => {
				taggedimages = await MidjourneyTagged(imageTag)
			})()
		}


	function toggleFaux(){
		faux = !faux
	}

	onMount(async() => {
		hljs.highlightAll()	
		stars = await onlyStarred()
		notes = await allNotes()
		codes = await allCodes()
		gens = await allOthers()
		ccss = await CodeCSS()
		cjs = await CodeJS()
		chtml = await CodeHTML()
		docs = await allDocs()
		quills = await quillNotes()
		images = await MidjourneyImages()
		posts = await allMandalas()
		chats = await chatsGPT()
		nocodas = await noCodes()
		taggedimages = await MidjourneyTagged(imageTag)
		single = await singleNote(title)
	})
</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>



<div class="introarea">
	<p>
		A simple blog to document a non-programmer bootstrapping himself into web-dev. <span class="special">My stack:</span>
	</p>
	<p>
		- backend at <a href="https://supabase.com/" target="_blank" rel="noreferrer">Supabase</a><br>
		- framework: <a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">Sveltekit</a><br>
		- deployed at <a href="https://vercel.com/home" target="_blank" rel="noreferrer">Vercel</a><br>
		- also mounted:
	</p>
	<li><a href="https://lenis.studiofreight.com/" target="_blank" rel="noreferrer">Lenis</a></li>
	<li><a href="https://greensock.com/gsap/" target="_blank" rel="noreferrer">GSAP</a></li>
	<li><a href="https://mdsvex.pngwn.io/" target="_blank" rel="noreferrer">MDSvex</a></li>
	<li><a href="https://github.com/SharifClick/svelte-swipe" target="_blank" rel="noreferrer">Svelte Swipe</a></li>
	<li><a href="https://github.com/DaveKeehl/svelte-reveal" target="_blank" rel="noreferrer">Svelte Reveal</a></li>
	<li><a href="https://sveltelegos.com/" target="_blank" rel="noreferrer">Svelte Legos</a></li>
	<li><a href="https://prismjs.com/" target="_blank" rel="noreferrer">Prism JS</a></li>
	<p>
		On the left, browse/search through an unorganized assortment of code snippets, setup guides and troubleshooting pointers. Play with broGPT, my AI pal, below.
	</p>
</div>
<div class="postsarea">
	{#if posts && posts.length > 0}
		{#each posts as item}
			<BigCard linkvar={item.path}>
				<h5 slot="title">{item.meta.title}</h5>
				<p slot="tags"><span style="text-transform: uppercase; color: #10C56D">{item.meta.type}</span> - {item.meta.tags}</p>
			</BigCard>
		{/each}
	{/if}
</div>	
<div class="inviewarea">
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

<style lang="sass">

.introarea
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
	@media screen and (min-width: 1024px)
		padding-right: 240px
		padding-bottom: 24px
		border-bottom: 1px solid #272727
	@media screen and (max-width: 1023px)
		padding: 16px
		margin-left: 0
		margin-right: 0
		padding: 0 0 24px 0
		width: 100%
		border-bottom: 1px solid #272727
		p
			font-size: 14px

.inviewarea
	@media screen and (min-width: 1024px)
		padding-right: 240px
		padding-bottom: 48px
		padding-top: 24px
	@media screen and (max-width: 1023px)
		padding: 0 0 24px 0
		width: 100%
		border-bottom: 1px solid #272727
	
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
		@media screen and (min-width: 1024px)
			width: 600px

.postsarea
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	margin-top: 32px
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: ". . ."
		gap: 16px 16px
		height: 160px
		padding-right: 120px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px 16px
		padding-bottom: 32px
		height: 320px

</style>