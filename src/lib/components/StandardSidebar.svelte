<script lang="ts">

	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import TinyCard from '$lib/components/TinyCard.svelte'
	import TinyCard2 from '$lib/components/TinyCard.svelte'
	import TinyCard3 from '$lib/components/TinyCard.svelte'
	import TinyCard4 from '$lib/components/TinyCard.svelte'
	import TinyCard5 from '$lib/components/TinyCard.svelte'
	import TinyCard7 from '$lib/components/TinyCard.svelte'
	import { get, writable } from 'svelte/store'
	import supabase from '$lib/utils/supabase'
	import { allNotes, allCodes, noCodes, allOthers, CodeCSS, CodeJS, CodeHTML, quillNotes, MidjourneyImages, MidjourneyTagged, chatsGPT, onlyStarred, singleNote } from '$lib/utils/supabase'
	import { allDocs, allMandalas } from '$lib/utils/localpulls'

	const searchStore = writable('')
	let searchinput
	const resultsStore = writable([])
	let showResults = false
	let loadingStore = false	
	let faux:boolean = false
	let area:boolean[] = Array(9).fill(false)
	area[1] = true
	let imageTag:any = ''
	let taggedimages:any
	let openSidebar:boolean = false
	let title:any
	let single:any
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

	async function newID(newTitle:any){
		title = newTitle
		single = await singleNote(title)
	} 

	function toggleOpenSidebar(){
		openSidebar = !openSidebar
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
							<a href="/notes/{item.counting}">
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


<style lang="sass">

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



</style>