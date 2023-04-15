<script lang="ts">

	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import Animations from 'textify.js'
	let codeContents:any
	let fake:boolean = false

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

	onMount(async() => {
		hljs.highlightAll()
		const { Textify, TextifyTitle } = Animations
		new TextifyTitle({
			duration: 1000,
			stagger: 50,
			once: false,
			scale: 0,
			fade: true,
			fadeDuration: 500,
			ease: "elasticInOut"
		})
		new Textify({
			duration: 600,
			stagger: 60,
			once: false,
			fade: true
		})	
	})

	export let data

</script>


<div class="pagecontainer wider x00 buffer bufferYt bufferYb">
	<h1 class="prime" data-textify-title>
		{data.title}
	</h1>
	<h6 data-textify class="gr">
		{data.type} | {data.tags}
	</h6>
	<div class="columnleft">
		<div class="boxc" id="docsinside">
			<div id="copy" style="font-size: 12px; cursor: pointer;" on:click={copyToClipboard} on:keydown={fauxfake}>COPY</div>
			<svelte:component this={data.content} bind:this={codeContents}/>
		</div>	
	</div>
</div>

<style lang="sass">

.columnleft
	display: flex
	flex-direction: column
	row-gap: 32px
	padding-top: 32px
	@media screen and (max-width: 1023px)
		padding: 0
		margin-top: 32px

.x00
	row-gap: 0
	h6
		margin: 0
		font-weight: 400
		text-transform: uppercase
		color: #474747
		padding-top: 8px
	


</style>