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
			.insert({ title: title, type: type, lang: lang, tags: tags, note: note})
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
	<div class="boxc notes">
		<div class="notesection boxr">
			<input type="text" placeholder="title" bind:value={title}/>
			<input type="text" placeholder="tags" bind:value={tags}/>
			<input type="text" placeholder="lang" bind:value={lang}/>
			<input type="text" placeholder="lang" bind:value={url}/>
			<input type="text" placeholder="type" bind:value={type}/>
		</div>
		<div class="boxc areas">
			<textarea bind:value={note}/>
			<textarea bind:value={codesnippet}/>
		</div>
	</div>
		<button class="glowing" on:click={inputNote}>Submit</button>
</div>

<style lang="sass">

.pagecontainer
	min-height: 100vh
	width: 100%
	@media screen and (min-width: 1024px)
		padding-left: 24vw
		padding-right: 24vw
	@media screen and (max-width: 1023px)
		padding-left: 32px
		padding-right: 32px


.notesection
	row-gap: 8px
	justify-content: space-between
	gap: 16px
	input[type=text]
		width: 24%
		border: 1px solid #272727
		background: #171717
		padding: 8px
		border-radius: 4px
		outline: none
		color: white
	@media screen and (max-width: 1023px)
		width: 100%

.areas
	margin-top: 16px
	textarea
		margin-bottom: 16px
		background: #171717
		height: 160px
		outline: never
		border: 1px solid #313131
		

.glowing
	padding: 12px

</style>