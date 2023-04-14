<script lang="ts">
	
	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import supabase from '$lib/utils/supabase'
	let lang:any
	let editingOn:boolean = false
	let fake:boolean = false
	let codeContents:any
	let theid:any
	let titular:any
	let nextid:any
	let previd:any
	let confirmationWindow:boolean = false
	let editTitle = false
	let editType = false
	let editTags = false
	let editNote = false
	let editCode = false
	let newTitle:any
	let newType:any
	let newTags:any
	let newNote:any
	let newCode:any

	function toggleEditTitle(){
		editTitle = !editTitle
	}

	function toggleEditType(){
		editType = !editType
	}

	function toggleEditTags(){
		editTags = !editTags
	}

	function toggleEditNote(){
		editNote = !editNote
	}

	function toggleEditCode(){
		editCode = !editCode
	}

	function toggleConfirmation(){
		confirmationWindow = !confirmationWindow
	}

	function fauxfake(){
		fake = !fake
	}
	function openEditing(){
		editingOn = !editingOn
	}

	function closeEditing(){
		if ( editingOn === true ) {
			editingOn = false,
			location.reload()
		}
	}

	function copyToClipboard(){
		const range = document.createRange();
		range.selectNodeContents(codeContents)
		const selection = window.getSelection()
  	if (selection) {
    	selection.removeAllRanges();
    	selection.addRange(range);

    	try {
      	document.execCommand('copy');
      	alert('Code snippet copied to clipboard');
    	} catch (err) {
      	alert('Failed to copy code snippet');
    	}

   		selection.removeAllRanges();
 		} else {
    	alert('Failed to copy code snippet');
  	}
	}

	const editDocumentTitle = async() => {
		const { error } = await supabase
		.from('amrit-notes')
		.update({title: newTitle})
		.eq('id',theid)
		if (error) throw new Error(error.message)
		location.reload()
	}

	const editDocumentType = async() => {
		const { error } = await supabase
		.from('amrit-notes')
		.update({type: newType})
		.eq('id',theid)
		if (error) throw new Error(error.message)
		location.reload()
	}

	const editDocumentTags = async() => {
		const { error } = await supabase
		.from('amrit-notes')
		.update({tags: newTags})
		.eq('id',theid)
		if (error) throw new Error(error.message)
		location.reload()
	}

	const editDocumentNote = async() => {
		const { error } = await supabase
		.from('amrit-notes')
		.update({note: newNote})
		.eq('id',theid)
		if (error) throw new Error(error.message)
		location.reload()
	}

	const editDocumentCode = async() => {
		const { error } = await supabase
		.from('amrit-notes')
		.update({codesnippet: newCode})
		.eq('id',theid)
		if (error) throw new Error(error.message)
		location.reload()
	}

	const deleteDocument = async() => {
		const { error } = await supabase
		.from('amrit-notes')
		.delete()
		.eq('id',theid)
		if (error) throw new Error(error.message)
		location.replace("/")		
	}

	export let data

	onMount(async() => {
		hljs.highlightAll()
		lang = data.lang
		titular = data.title
		theid = data.id
		nextid = data.counting + 1
		previd = data.counting - 1
		lang = data.lang
	})
</script>

<svelte:head>
<title>{data.title} - {data.type} - The Fractal Maṇḍala</title>
<meta name="description" content="{data.tags}"/>
</svelte:head>


<div class="pagecontainer x00">
	{#if editingOn}
		<div class="editingsection">
		<h5>Select Field to Edit:</h5>
			<p on:click={toggleEditTitle} on:keydown={fauxfake}>Title</p>
			<p on:click={toggleEditType} on:keydown={fauxfake}>Type</p>
			<p on:click={toggleEditTags} on:keydown={fauxfake}>Tags</p>
			<p on:click={toggleEditNote} on:keydown={fauxfake}>Note</p>
			<p on:click={toggleEditCode} on:keydown={fauxfake}>Codesnippet</p>
			<p style="color: #fe4a49; cursor: pointer; padding-top: 16px" on:click={toggleConfirmation} on:keydown={fauxfake}>DELETE</p>
		<h5 style="cursor: pointer" on:click={closeEditing} on:keydown={fauxfake}>EXIT</h5>
		</div>
		<div class="corrections">
			{#if editTitle}
				<textarea placeholder={data.title} bind:value={newTitle}/>
				<div class="boxr" style="gap: 16px; margin-top: 8px">
					<button class="plain green" on:click={editDocumentTitle} on:keydown={fauxfake}>Confirm</button>
					<button class="plain red" on:click={toggleEditTitle} on:keydown={fauxfake}>Cancel</button>
				</div>
			{/if}
			{#if editType}
				<textarea placeholder={data.type} bind:value={newType}/>
				<div class="boxr" style="gap: 16px; margin-top: 8px">
					<button class="plain green" on:click={editDocumentType} on:keydown={fauxfake}>Confirm</button>
					<button class="plain red" on:click={toggleEditType} on:keydown={fauxfake}>Cancel</button>
				</div>
			{/if}
			{#if editTags}
				<textarea placeholder={data.tags} bind:value={newTags}/>
				<div class="boxr" style="gap: 16px; margin-top: 8px">
					<button class="plain green" on:click={editDocumentTags} on:keydown={fauxfake}>Confirm</button>
					<button class="plain red" on:click={toggleEditTags} on:keydown={fauxfake}>Cancel</button>
				</div>
			{/if}
			{#if editNote}
				<textarea placeholder={data.note} bind:value={newNote}/>
				<div class="boxr" style="gap: 16px; margin-top: 8px">
					<button class="plain green" on:click={editDocumentNote} on:keydown={fauxfake}>Confirm</button>
					<button class="plain red" on:click={toggleEditNote} on:keydown={fauxfake}>Cancel</button>
				</div>
			{/if}
			{#if editCode}
				<textarea placeholder={data.codesnippet} bind:value={newCode}/>
				<div class="boxr" style="gap: 16px; margin-top: 8px">
					<button class="plain green" on:click={editDocumentCode} on:keydown={fauxfake}>Confirm</button>
					<button class="plain red" on:click={toggleEditCode} on:keydown={fauxfake}>Cancel</button>
				</div>
			{/if}
		</div>
	{:else}
	<div class="boxr">
		<h2>
			{data.title}
		</h2>
		<div style="text-align: right; padding-left: 24px; color: #fe4a49; cursor: pointer; font-size: 12px" on:click={openEditing} on:keydown={fauxfake}>EDIT</div>
	</div>
	<h6>
		{data.type} | {data.tags}
	</h6>
	<div class="columnleft">
		{#if data.note && data.note.length > 0}
			{#if data.type && data.type.length > 0}
				{#if data.type === 'quillcode'}
					<div class="notebox">
						<div class="notepara">
							<pre>
								<code class="language-{data.lang}">
								{data.note}
								</code>
							</pre>
						</div>
					</div>
				{:else}
					<div class="notebox">
						<p class="notepara">{data.note}</p>
					</div>
				{/if}
			{/if}
		{/if}
		{#if data.codesnippet && data.codesnippet.length > 0}
		<div class="surroundcode">
			<div id="stripp" class="boxr" style="background: #000000; height: 24px; justify-content: space-between; padding-left: 8px; padding-right: 8px">
				<div style="font-size: 12px; color: #10D56C">{data.lang}</div>
				<div id="copy" style="font-size: 12px; cursor: pointer;" on:click={copyToClipboard} on:keydown={fauxfake}>COPY</div>
			</div>
			<pre>
				<code class="language-{data.lang}" bind:this={codeContents}>
					{data.codesnippet}
				</code>
			</pre>
			</div>
		{/if}
	</div>
	{/if}
</div>
{#if confirmationWindow}
	<div class="confirmationmodal">
		<div class="insidemodal">
			<h5>This will delete the document!</h5>
			<h5 style="color: #fe4a49">Are you sure?</h5>
			<div class="boxr">
				<button class="plain green" on:click={deleteDocument} on:keydown={fauxfake}>Yes</button>
				<button class="plain red" on:click={toggleConfirmation} on:keydown={fauxfake}>Cancel</button>
			</div>
		</div>
	</div>
{/if}

<style lang="sass">

.corrections
	display: flex
	flex-direction: column
	margin-top: 32px
	textarea
		padding: 8px
		font-family: 'Spline Sans', sans-serif
		background: #171717
		border: 1px solid #272727
		color: white
		@media screen and (min-width: 1024px)
			width: 60%
		@media screen and (max-width: 1023px)
			width: 100%

.editingsection
	display: flex
	flex-direction: column
	row-gap: 8px
	p, h5
		margin: 0
	h5
		font-weight: 400
		color: #676767
		font-size: 18px
	p
		cursor: pointer

.notepara
	color: white

.notepara
	pre
		white-space: pre-line


#copy
	color: #474747
	&:hover
		color: white

#stripp
	@media screen and (max-width: 1023px)
		flex-direction: row

.columnleft
	display: flex
	flex-direction: column
	row-gap: 32px
	padding-top: 32px
	@media screen and (min-width: 1024px)
		width: 80%

.metaoptions
	display: none
	flex-direction: row
	margin-bottom: 8px

.surroundcode
	padding: 24px
	border: 1px solid #272727
	border-radius: 4px
	box-shadow: 3px 5px 18px rgba(0,0,0,0.7), -3px -5px 12px rgba(0,0,0,0.3)
	transition: all 1s
	background: #141414
	&:hover
		animation: tinydance 1s cubic-bezier(0.000, 0.760, 0.645, 1.650) forwards
	pre
		white-space: pre-line

@keyframes tinydance
	0%
		box-shadow: 3px 5px 18px rgba(0,0,0,0.7), -3px -5px 12px rgba(0,0,0,0.3)
	100%
		box-shadow: 3px 5px 18px rgba(0,0,0,0.7) inset, -3px -5px 12px rgba(0,0,0,0.3) inset

.notepara
	line-height: 1.8

h2
	text-transform: uppercase
	margin: 0
	font-family: 'Spline Sans', sans-serif
	padding-bottom: 12px
	font-weight: 600
	color: white
	font-size: 40px
	@media screen and (max-width: 1023px)
		font-size: 21px
		text-align: center
		margin-bottom: 16px

.x00
	padding: 0
	row-gap: 0
	position: relative
	h6
		margin: 0
		padding-left: 72px
		font-weight: 400
		text-transform: uppercase
		color: #474747
		padding-bottom: 8px
	.boxr
		align-items: center
		justify-content: flex-start
		padding-left: 0
		margin-left: 0
		@media screen and (max-width: 1023px)
			flex-direction: column

.confirmationmodal
	position: absolute
	top: 0
	left: 0
	width: 100%
	height: 100%
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	backdrop-filter: blur(20px)
	.insidemodal
		width: 200px
		display: flex
		flex-direction: column
		background: white
		height: max-content
		padding: 16px
		color: #272727
		text-align: center
		align-items: center
		row-gap: 8px
		h5
			margin: 0
		.boxr
			gap: 16px
			justify-content: center

.nav
	margin-right: 24px
	height: 28px
	padding-bottom: 8px
	gap: 12px
	@media screen and (max-width: 1023px)
		width: 100%
		flex-direction: row
		margin: 0

.nav.boxr
	@media screen and (max-width: 1023px)
		flex-direction: row
		justify-content: center
		

</style>