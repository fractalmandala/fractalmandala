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
	let type:string = 'quillnote'
	let tags:string
	let lang:any
	let note:any
	let codesnippet:any
	let codes:any
	let fake:boolean = false
	let codeContents:any
	let confirmDelete:boolean = false
	let theid:any
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
		height: 120px
		margin-top: 8px
		margin-bottom: 8px

.pagecontainer
	min-height: 100vh
	width: 100%
	@media screen and (min-width: 1024px)
		padding-left: 21vw
		padding-right: 21vw
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