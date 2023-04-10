<script lang="ts">

	import { onMount } from 'svelte' 
	import Header from '$lib/components/Header.svelte'
	import { page } from '$app/stores'
	import supabase from '$lib/utils/supabase'
	import '$lib/styles/snow.css'
	let editor: HTMLDivElement
	let quill: {on: (arg0: string,arg1: () => void) => void; root: {innerHTML: any;};}
	let noteContent: any
	export let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, {header: 3}, {header: 4}, "blockquote", "link", "image", "video", "code"],
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
	let confirmDelete:boolean = false
	let area:boolean[] = Array(9).fill(false)
	area[1] = true
	let url:any


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
			alert('submitted')
		}
	}


	onMount(async() => {
		confirmDelete = false
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
	<div class="whitewrapper">
	<div class="boxc notes">
		<div class="notesection boxr">
			<input type="text" placeholder="title" bind:value={title}/>
			<input type="text" placeholder="tags" bind:value={tags}/>
			<input type="text" placeholder="lang" bind:value={lang}/>
			<input type="text" placeholder="type" bind:value={type}/>
			<input type="number" placeholder="counting" bind:value={counting}/>
		</div>
	</div>
	<div class="editor-wrapper">
		<div bind:this={editor}/>
	</div>
		<button class="neon" on:click={inputNote}>Submit</button>
	</div>
</div>

<style lang="sass">


.pagecontainer
	min-height: 100vh
	width: 100%
	@media screen and (min-width: 1024px)
		padding-left: 21vw
		padding-right: 21vw
	@media screen and (max-width: 1023px)
		padding-left: 32px
		padding-right: 32px

.editor-wrapper
	margin-top: 32px
	margin-bottom: 16px


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