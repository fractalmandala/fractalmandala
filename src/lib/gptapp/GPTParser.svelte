<script lang="ts">

	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import Copy from '$lib/icons/Copy.svelte'
	import { clickToCopyAction } from "svelte-legos"
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	export let response:any 
	let confirmCopy = false
	let rawBlocks = response.split('```');

	let blocks:any = [];
  for (let i = 0; i < rawBlocks.length; i++) {
    if (i % 2 === 0) {
      blocks.push({ type: 'text', content: rawBlocks[i] });
    } else {
      const [language, ...codeLines] = rawBlocks[i].split('\n');
      const code = codeLines.join('\n');
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

<div class="rta-column null" transition:slide
	class:dark={$themeMode}
	class:light={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<slot name="button"></slot>
	{#each blocks as block}
		{#if block.type === 'text'}
			<pre>{block.content}</pre>
		{:else}
		<div class="rta-column codeparent m-top-32">
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

.levelzero
	.codeparent
		border: var(--bord)
		background: var(--opposite)
		border-radius: 4px
		padding: 16px
		.codeblock
			padding: 32px 16px 16px 16px
			border-top: 1px solid var(--near)

</style>
