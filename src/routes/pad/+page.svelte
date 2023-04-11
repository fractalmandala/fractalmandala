<script lang="ts">

	import { onMount } from 'svelte' 
	import Header from '$lib/components/Header.svelte'
	import { toast } from 'svoast'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import { page } from '$app/stores'
	import supabase from '$lib/utils/supabase'
	import '$lib/styles/snow.css'
	let editor: HTMLDivElement
	let quill: {on: (arg0: string,arg1: () => void) => void; root: {innerHTML: any;};}
	let noteContent: any
	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, {header: 3}, {header: 4}, "paragraph", "blockquote", "link", "image", "video", "code"],
		["bold", "italic", "underline", "strike"],
		[{ list: "ordered" }, { list: "ordered" }],
		[{ align: [] }],
		["clean"]
	];
	let title:string 
	let type:string
	let tags:string
	let counting:number
	let lang:any
	let codesnippet:any
	let area:boolean[] = Array(9).fill(false)
	area[1] = true
	let url:any
	let fake:boolean = false

	function fauxfake(){
		fake = !fake
	}

	export async function inputNote(){
		try {
			const { data, error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, type: type, counting: counting, lang: lang, tags: tags, note: noteContent})
			if (error) throw new Error(error.message)
			title = ''
			type = ''
			lang = ''
			tags = ''
			counting = 0
		} finally {
			alert('Successfully submitted!')
		}
	}


	onMount(async() => {
		hljs.highlightAll()
		url = $page.url.pathname
		const { default: Quill } = await import('quill')
		quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
			},
			theme: 'snow',
		})
    quill.on("text-change", () => {
      noteContent = quill.root.innerHTML;
    });
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
			<input type="text" placeholder="type" bind:value={type}/>
			<input type="number" placeholder="counting" bind:value={counting}/>
			<textarea class="hljs" bind:value={codesnippet}/>
			<button class="glowing">Submit</button>
		</div>
	</div>
	<div class="editor-wrapper">
		<div bind:this={editor}/>
	</div>
</div>

<style lang="sass">

.glowing
	padding: 16px


.pagecontainer
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	min-height: 100vh
	width: 100%
	@media screen and (min-width: 1024px)
		grid-template-columns: 240px 1fr
		grid-template-areas: "notes editor"
		padding-left: 20vw
		padding-right: 20vw
		gap: 0 40px
		.notes
			grid-area: notes
		.editor-wrapper
			grid-area: editor
			height: 100%
	@media screen and (max-width: 1023px)
		padding-left: 32px
		padding-right: 32px

.editor-wrapper
	margin-bottom: 16px

.notesection
	row-gap: 8px
	justify-content: space-between
	flex-wrap: wrap
	input[type=text], input[type=number]
		background: #171717
		width: 100%
		border: 1px solid #272727
		padding: 8px
		outline: none
		color: white
		box-shadow: -4px 10px 8px rgba(0,0,0,0.7)
		cursor: pointer
	textarea
		background: #171717
		outline: none
		width: 100%
		border-radius: 4px
		border: 1px solid #272727
		height: 200px
		&:hover
			box-shadow: 0px 0px 0px rgba(0,0,0,0)
	@media screen and (max-width: 1023px)
		width: 100%

</style>