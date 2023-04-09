<script lang="ts">

	import { onMount } from 'svelte' 
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
	let lang:string

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

<div class="pagecontainer">
	<div class="boxc notes">
		<div class="notesection boxc">
			<input type="text" placeholder="title" bind:value={title}/>
			<input type="text" placeholder="tags" bind:value={tags}/>
			<input type="text" placeholder="lang" bind:value={lang}/>
		</div>
	</div>
	<div class="editor-wrapper">
		<div bind:this={editor}/>
	</div>
	<button class="neon" on:click={inputNote}>Submit</button>
</div>

<style lang="sass">

.pagecontainer
	padding-left: 64px
	@media screen and (max-width: 1023px)
		padding-left: 32px
		padding-right: 32px

.editor-wrapper
	width: 60%
	margin-top: 32px
	margin-bottom: 16px
	@media screen and (max-width: 1023px)
		width: 100%

.notesection
	row-gap: 8px
	width: 30%
	@media screen and (max-width: 1023px)
		width: 100%

</style>