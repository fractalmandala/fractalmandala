<script lang="ts">

	import { onMount } from 'svelte' 
	import Header from '$lib/components/Header.svelte'
	import { page } from '$app/stores'
	import supabase from '$lib/utils/supabase'
	let noteContent: any
	let title:string 
	let type:string = 'quillcode'
	let tags:string
	let lang:any
	let note:any
	let codesnippet:any
	let area:boolean[] = Array(9).fill(false)
	area[1] = true
	let url:any


	export async function inputNote(){
		try {
			const { data, error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, type: type, lang: lang, tags: tags, note: noteContent})
			if (error) throw new Error(error.message)
			title = ''
			type = ''
			lang = ''
			tags = ''
		} finally {
			alert('submitted')
		}
	}





	onMount(async() => {
		url = $page.url.pathname
	})

</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>

<Header>
</Header>
<div class="pagecontainer">
	<div class="whitewrapper">
	<div class="boxc notes">
		<div class="notesection boxr">
			<input type="text" placeholder="title" bind:value={title}/>
			<input type="text" placeholder="tags" bind:value={tags}/>
			<input type="text" placeholder="lang" bind:value={lang}/>
			<input type="text" placeholder="type" bind:value={type}/>
		</div>
		<div class="boxc areas">
			<textarea bind:value={note}/>
			<textarea bind:value={codesnippet}/>
		</div>
	</div>
		<button class="neon" on:click={inputNote}>Submit</button>
	</div>
</div>

<style lang="sass">

.areas
	textarea
		border: 1px solid #e7e7e7
		height: 160px
		margin-top: 8px
		margin-bottom: 8px
	@media screen and (max-width: 1023px)
		height: 480px

.pagecontainer
	min-height: 100vh
	width: 100%
	@media screen and (min-width: 1024px)
		padding-left: 24vw
		padding-right: 24vw
	@media screen and (max-width: 1023px)
		padding-left: 32px
		padding-right: 32px



.whitewrapper
	background: white
	padding: 64px
	border-radius: 4px
	@media screen and (max-width: 1023px)
		padding: 8px

.notesection
	row-gap: 8px
	justify-content: space-between
	input[type=text]
		width: 24%
		border: 1px solid #e7e7e7
	@media screen and (max-width: 1023px)
		width: 100%

</style>