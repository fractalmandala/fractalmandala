<script lang="ts">
//@ts-nocheck
	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import Copy from '$lib/icons/Copy.svelte'
	import ReadMore from '$lib/icons/ReadMore.svelte'
	import ReadLess from '$lib/icons/ReadLess.svelte'
	import { clickToCopyAction } from "svelte-legos"
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	export let response:any 
	let confirmCopy = false
	let fake = false
	let fullText = false
	let rawBlocks = response.split('```');

	function toggleText(){
		fullText = !fullText
	}

	function fauxfake(){
		fake = !fake
	}

	let blocks:any = [];
	for (let i = 0; i < rawBlocks.length; i++) {
	  if (i % 2 === 0) {
	    blocks.push({ type: 'text', content: rawBlocks[i] });
	  } else {
	    let [language, ...codeLines] = rawBlocks[i].split('\n');
	    const code = codeLines.join('\n');
	    if (!language || language.trim() === '') {
	      language = 'javascript';
	    }
	    blocks.push({ type: 'code', language: language.trim(), code: code.trim() });
	  }
	}


	function handleCopyDone(){
		confirmCopy = !confirmCopy
	}

	function handleCopyError(){
		console.log('error')
	}

  onMount(() => {
    Prism.highlightAll();
  });		


</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonmyous">
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<div class="rta-column rowgap200 null" transition:slide
	class:dark={$themeMode}
	class:light={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	{#each blocks as block}
		{#if block.type === 'text'}
		<div class="rta-column nocodeparent">
			{#if fullText}
			<div class="rta-column">
				<pre class="cutthis" transition:slide>{block.content}</pre>
				<button class="blank-button" on:click={toggleText}>
					<ReadLess/>
				</button>
			</div>
			{:else}
			<div class="rta-row ycenter null">
				<button class="blank-button" on:click={toggleText}>
					<ReadMore/>
				</button>
				<p class="cutthis" transition:slide>{block.content.slice(0,100)}...
				</p>
			</div>
			{/if}
		</div>
		{:else}
		<div class="rta-column codeparent">
			<div class="rta-row ycenter between">
				<small>{block.language}</small>
				<button class="blank-button"
					use:clickToCopyAction={block.code}
					on:copy-done={handleCopyDone}
					on:copy-error={handleCopyError}
					>
					<Copy confirmation={confirmCopy}/>
				</button>
			</div>
			<pre class="codeblock"><code class={`language-${block.language}`}>{block.code}</code></pre>
		</div>
		{/if}
	{/each}
</div>

<style lang="sass">

.cutthis
	margin-bottom: 0
	margin-top: 0
	padding: 0
	font-size: 16px


</style>
