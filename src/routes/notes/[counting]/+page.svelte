<script lang="ts">
	
	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	let lang:any

	let fake:boolean = false
	let codeContents:any

	let theid:any


	let titular:any


	let nextid:any
	let previd:any


	function fauxfake(){
		fake = !fake
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
	<div class="boxr">
		<div class="boxr nav">
			<a href="/notes/{previd}" target="_self">
				<img src="https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/08icons/chevleft.png" alt="left"/>
			</a>
			<a href="/notes/{nextid}" target="_self">
				<img src="https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/08icons/chevright.png" alt="right"/>
			</a>
		</div>
		<h2>
			{data.title}
		</h2>
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
</div>

<style lang="sass">

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

.nav
	margin-right: 24px
	height: 28px
	padding-bottom: 8px
	gap: 12px
	img
		object-fit: contain
		height: 20px
		filter: saturate(0.01)
		opacity: 0.5
		cursor: pointer
		&:hover
			filter: saturate(1)
			opacity: 1
	@media screen and (max-width: 1023px)
		width: 100%
		flex-direction: row
		margin: 0

.nav.boxr
	@media screen and (max-width: 1023px)
		flex-direction: row
		justify-content: center
		

</style>