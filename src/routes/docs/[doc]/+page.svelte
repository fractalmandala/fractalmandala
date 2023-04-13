<script lang="ts">

	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	export let data
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
	})

</script>


<div class="pagecontainer x00">
	<h2>
		{data.title}
	</h2>
	<h6>
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

#docsinside
	border-radius: 4px

h2
	text-transform: uppercase
	margin: 0
	font-family: 'Spline Sans', sans-serif
	padding-bottom: 12px
	font-weight: 600
	color: white
	font-size: 40px
	@media screen and (max-width: 1023px)
		font-size: 32px
		text-align: center
		margin-bottom: 16px

.columnleft
	display: flex
	flex-direction: column
	row-gap: 32px
	padding-top: 32px
	@media screen and (min-width: 1024px)
		width: 80%
	@media screen and (max-width: 1023px)
		width: 100%
		padding: 0
		margin-top: 16px

.x00
	padding: 0
	row-gap: 0
	h6
		margin: 0
		font-weight: 400
		text-transform: uppercase
		color: #474747
		padding-top: 8px
		@media screen and (max-width: 1023px)
			text-align: center
	


</style>