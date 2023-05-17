<script lang="ts">

	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	let response:any
	
	export let data

	response = data.value
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

  onMount(() => {
    Prism.highlightAll();
  });	

</script>


<h5 class="bord-bot p-bot-16">{data.title}</h5>

<div class="rta-column rowgap300 gptstyle p-top-32 p-bot-64">
	{#each blocks as block}
  	{#if block.type === 'text'}
    	<pre>{block.content}</pre>
  	{:else}
			<h5>{block.language}</h5>
   	 	<pre><code class={`language-${block.language}`}>{block.code}</code></pre>
  {/if}
{/each}
</div>

<style lang="sass">

pre
	border: 1px solid var(--borderline)
	white-space: pre-line


</style>