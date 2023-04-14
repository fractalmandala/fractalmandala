<script lang="ts">

	import { onMount } from 'svelte' 
	import { fly } from 'svelte/transition'
	import { quintIn, quintOut } from 'svelte/easing'
	import IconCopy from '$lib/components/IconCopy.svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'

	let codeContents:any
	let fake = false

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

	export let language:any
	
</script>


<div class="postalx" in:fly={{ duration: 200, easing: quintOut, x: 0, y: 128}} out:fly={{ duration: 100, easing: quintIn, x: 0, y: -128}}>
			<div class="icon">
				<div class="subicon" on:click={copyToClipboard} on:keydown={fauxfake}>
				<IconCopy></IconCopy>
				</div>
			</div>
	<pre>
		<code class="language-{language}" bind:this={codeContents}>
			<slot></slot>
		</code>
	</pre>
</div>

<style lang="sass">

.icon
	display: flex
	flex-direction: row
	height: 20px
	justify-content: flex-end
	.subicon
		width: 20px

.postalx
	display: flex
	flex-direction: column
	position: relative
	border: 1px solid #272727
	border-radius: 4px
	background: #171717
	padding: 16px 24px
	pre
		white-space: pre-line

</style>