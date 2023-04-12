<script lang="ts">

	import { onMount } from 'svelte'
	import ChatMessage from '$lib/components/ChatMessage.svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'	
	import type { ChatCompletionRequestMessage } from 'openai'
	import { SSE } from 'sse.js'
	import TinyCard from '$lib/components/TinyCard.svelte'
	import TinyCard2 from '$lib/components/TinyCard.svelte'
	import TinyCard3 from '$lib/components/TinyCard.svelte'
	import TinyCard4 from '$lib/components/TinyCard.svelte'
	import TinyCard5 from '$lib/components/TinyCard.svelte'
	import BigCard from '$lib/components/BigCard.svelte'
	import TinyCard7 from '$lib/components/TinyCard.svelte'
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

	function toggleOpenSidebar(){
		openSidebar = !openSidebar
	}

	function showGallery(){
		galleryView = !galleryView
		if ( postsview === true) {
			postsview = false
		}
	}

	function showPosts(){
		postsview = !postsview
		if ( galleryView === true ) {
			galleryView = false
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

	async function newID(newTitle:any){
		title = newTitle
		single = await singleNote(title)
	} 

	function toggleArea(index:number) {
		area[index] = !area[index]
		for ( let i = 0; i < area.length; i ++ ) {
			if ( i !== index && area[i] === true ) {
				area[i] = false
			}
		}
		if ( openSidebar === false ) {
			openSidebar = true
		}
	}


	function toggleLightbox(index:number){
		lightbox[index] = !lightbox[index]
		for ( let i = 0; i < lightbox.length; i ++ ) {
			if ( i !== index && lightbox[i] === true ) {
				lightbox[i] = false
			}
		}
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



<div class="pagedoublegrid" class:expanded={openSidebar}>
	<div class="pagesidebar" class:expanded={openSidebar}>
		<div class="searcharea">
			<input type="text" bind:this={searchinput} on:input={(e) => {if(e && e.target) {searchStore.set(e.target.value)}}}>
			<button on:click={searchWord} on:keydown={toggleFaux} on:click={() => toggleArea(5)}>Find</button>
		</div>
		<div class="optionsarea">
			<div class="option" on:click={() => toggleArea(1)} on:keydown={toggleFaux}>Star</div>			
			<div class="option" on:click={() => toggleArea(6)} on:keydown={toggleFaux}>Code</div>
			<div class="option" on:click={() => toggleArea(2)} on:keydown={toggleFaux}>Docs</div>
			<div class="option" on:click={() => toggleArea(3)} on:keydown={toggleFaux}>Chats</div>
			<div class="option" on:click={() => toggleArea(4)} on:keydown={toggleFaux}>Other</div>
		</div>
		<div class="resultsdisplay">
			{#if area[1]}
				{#if stars && stars.length > 0}
					{#each stars as item, i}
						<TinyCard7 i={i} linkvar="/notes/{item.counting}">
							<p slot="title">
								{item.title}
							</p>
							<small slot="lang" style="color: #10D56C; text-transform: uppercase">{item.lang}</small>
							<small slot="tags" style="color: #575757">{item.tags}</small>
						</TinyCard7>
					{/each}
				{/if}
			{/if}
			{#if area[2]}
				{#if docs && docs.length > 0}
					{#each docs as item, i}
						<TinyCard2 i={i} linkvar="{item.path}">
							<p slot="title">{item.meta.title}</p>
							<small slot="lang" style="color: #10D56C; text-transform: uppercase">{item.meta.type}</small>
							<small slot="tags" style="color: #575757">{item.meta.tags}</small>
						</TinyCard2>
					{/each}
				{/if}
			{/if}
			{#if area[3]}
				{#if chats && chats.length > 0}
					{#each chats as item, i}
						<TinyCard3 i={i} linkvar="/play/{item.id}">
							<p slot="title">{item.prompt.slice(0,50)}</p>
						</TinyCard3>
					{/each}
				{/if}
			{/if}
			{#if area[4]}
				{#if nocodas && nocodas.length > 0}
					{#each nocodas as item, i}
						<TinyCard4 i={i} linkvar="/notes/{item.counting}">
							<p slot="title">
							<a href="/notes/{item.counting}" target="_self">
								{item.title}
							</a>
							</p>
							<small slot="lang" style="color: #10D56C; text-transform: uppercase">{item.type}</small>
							<small slot="tags" style="color: #575757">{item.tags}</small>
						</TinyCard4>
					{/each}
				{/if}
			{/if}
			{#if area[5]}
				{#if loadingStore}
				<p>Loading...</p>
				{/if}
				{#if showResults}
					{#if $resultsStore.length>0}
						{#each $resultsStore as item, i}
							<TinyCard5 i={i} linkvar="/notes/{item.counting}">
								<p slot="title">{item.title}</p>
								<small slot="lang" style="color: #10D56C; text-transform: uppercase">{item.type}</small>
								<small slot="tags" style="color: #575757">{item.tags}</small>								
							</TinyCard5>
						{/each}
					{/if}
				{/if}
			{/if}
			{#if area[6]}
				{#if codes && codes.length > 0}
					{#each codes as item, i}
						<TinyCard i={i} linkvar="/notes/{item.counting}">
							<p slot="title">
							<a href="/notes/{item.counting}" target="_self">
								{item.title}
							</a>
							</p>
							<small slot="lang" style="color: #10D56C; text-transform: uppercase">{item.lang}</small>
							<small slot="tags" style="color: #575757">{item.tags}</small>
						</TinyCard>
					{/each}
				{/if}
			{/if}
		</div>
	</div>
	<div class="pagemainpage">
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
						<form on:submit|preventDefault={() => handleSubmit()}>
							<input type="text" bind:value={query} />
							<button class="glowing" type="submit"> Send </button>
						</form>
					</div>
			</div>
			{#if galleryView}
				<div class="boxr" style="gap: 24px; margin-top: 32px">
					<button class="glowing" on:click={showGallery} on:keydown={toggleFaux}>Close Gallery</button>
					<button class="glowing" on:click={showPosts} on:keydown={toggleFaux}>View Posts</button>
				</div>
				<div class="galleryarea">
				{#if images && images.length > 0}
					<div class="carousel">
					{#each images as item}
						<div class="singleimage">
							<img src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1/{item.link.slice(90,100)}" alt={item.id}>
						</div>
					{/each}
					</div>
				{/if}
				</div>
				{:else if postsview}
				<div class="boxr" style="gap: 24px; margin-top: 32px">
					<button class="glowing" on:click={showGallery} on:keydown={toggleFaux}>Close Gallery</button>
					<button class="glowing" on:click={showPosts} on:keydown={toggleFaux}>Close Posts</button>
				</div>
				<div class="postsarea">
				{#if posts && posts.length > 0}
					{#each posts as item}
						<BigCard linkvar={item.path}>
							<h5 slot="title">{item.meta.title}</h5>
							<p slot="tags">{item.meta.type} - {item.meta.tags}</p>
						</BigCard>
					{/each}
				{/if}
				</div>					
				{:else}	
				<div class="boxr" style="gap: 24px; margin-top: 32px">
					<button class="glowing" on:click={showGallery} on:keydown={toggleFaux}>View Gallery</button>
					<button class="glowing" on:click={showPosts} on:keydown={toggleFaux}>View Posts</button>
				</div>
			{/if}
	</div>
</div>

<style lang="sass">

.pagedoublegrid
	display: grid
	grid-auto-flow: row
	.pagesidebar
		grid-area: pagesidebar
	.pagemainpage
		grid-area: pagemainpage
	@media screen and (min-width: 1024px)
		grid-template-columns: 320px 1fr
		grid-template-areas: "pagesidebar pagemainpage"
		grid-template-rows: auto
		gap: 0 48px
		.pagesidebar
			padding-left: 40px
			padding-right: 16px
			padding-top: 32px
			padding-bottom: 32px
		.pagemainpage
			padding: 32px 32px 32px 32px
			width: calc(100vw - 360px)
			.inviewarea
				padding-right: 240px
				padding-bottom: 48px
				border-bottom: 1px solid #272727
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-rows: 64px auto
		grid-template-areas: "pagesidebar" "pagemainpage"
		.pagesidebar
			padding-left: 32px
			padding-right: 32px
			padding-top: 4px
			padding-bottom: 4px
			overflow-x: hidden
		.pagesidebar.expanded
			height: 100%
		.pagemainpage
			padding: 32px
			width: 100%
			.inviewarea
				padding: 0 0 24px 0
				width: 100%
				border-bottom: 1px solid #272727

.pagedoublegrid.expanded
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-rows: auto auto
		grid-template-areas: "pagesidebar" "pagemainpage"



.pagesidebar
	display: flex
	flex-direction: column

.optionsarea
	display: flex
	flex-direction: row
	column-gap: 16px
	padding: 4px 8px
	text-align: center
	justify-content: space-between
	align-items: center
	background: #171717
	border: 1px solid #272727
	margin-bottom: 16px
	cursor: pointer
	.option
		font-size: 12px
		color: #676767
		&:hover
			color: white


.searcharea
	display: flex
	flex-direction: row
	gap: 8px
	margin-bottom: 8px
	button
		width: calc(25% - 8px)
		background: #171717
		border: 1px solid #272727
		border-radius: 2px
		color: #676767
		font-size: 12px
		padding-top: 4px
		padding-bottom: 4px
		cursor: pointer
		&:hover
			border: 1px solid white
			color: white
	input
		width: 75%
		outline: none
		color: white
		background: #171717
		border: 1px solid #272727
		border-radius: 2px

.resultsdisplay
	display: flex
	flex-direction: column
	row-gap: 16px
	
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

.singleimage
	display: flex
	flex-direction: column
	height: 200px
	img
		object-fit: cover
		height: 100%
		width: 100%

.galleryarea
	overflow-x: hidden
	width: 100%
	border-radius: 4px
	margin-top: 32px
	.carousel
		display: grid
		grid-auto-flow: column
		overflow-x: scroll
		width: 100%
		white-space: nowrap
		gap: 16px 16px
		.singleimage
			width: 200px
			flex-shrink: 0
	.carousel::-webkit-scrollbar
		height: 0px
	@media screen and (min-width: 1024px)
		padding: 32px
		border: 1px solid #272727
		.carousel
			grid-template-columns: 1fr 1fr 1fr 1fr
			grid-template-rows: 1fr 1fr
			grid-template-areas: ". . . ." ". . . ."
	@media screen and (max-width: 1023px)
		width: calc(100% - 64px)
		overflow-x: hidden
		.carousel
			grid-template-columns: 1fr 1fr 1fr
			grid-template-rows: 1fr 1fr
			grid-template-areas: ". . ." ". . ."
			overflow-x: scroll
			white-space: nowrap
			.singleimage
				width: 128px
				height: 128px

.postsarea
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	margin-top: 32px
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: ". . ."
		gap: 16px 16px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px 16px

</style>