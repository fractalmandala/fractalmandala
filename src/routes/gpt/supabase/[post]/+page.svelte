<script lang="ts">

	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
	import { newGPT } from '$lib/utils/supabase'
	import { themeMode } from '$lib/stores/globalstores'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'

	let thisTitle:string
	let chatStream:any	
	let fullChat = Array(20).fill(false)
	let fullGPT = Array(20).fill(false)
	let fake = false
	let chatValue:any
	let dataParsed:any

  export async function parseChatValue(chatValue:any) {
    let regex = /```(\w+)\n([\s\S]*?)```/g;
    let match;
		let parsedData:any = [];
    while ((match = regex.exec(chatValue)) !== null) {
      let language = match[1];  
      let code = match[2];  
      parsedData.push({language, code});
    }

    return parsedData;
  }

	function toggleChat(index:number){
		fullChat[index] = !fullChat[index]
		for ( let i = 0; i < fullChat.length; i ++ ) {
			if ( i !== index && fullChat[i] === true) {
				fullChat[i] = false
			}
		}
	}

	function toggleGPT(index:number){
		fullGPT[index] = !fullGPT[index]
		for ( let i = 0; i < fullGPT.length; i ++ ) {
			if ( i !== index && fullGPT[i] === true) {
				fullGPT[i] = false
			}
		}
	}

	function fauxfake(){
		fake = !fake
	}

	export let data

	onMount(async() => {
		thisTitle = data.title
		chatStream = await newGPT(thisTitle)
		dataParsed = await parseChatValue(chatValue);
		Prism.highlightAll()
	})

</script>

<svelte:head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-css.min.js" integrity="sha512-mHqYW9rlMztkE8WFB6wIPNWOVtQO50GYBsBRMyA1CMk34zLJ6BrvVy3RVHoIIofugmnoNLGxkuePQ9VT2a3u8w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">{data.title}</h3>
</div>
<div class="rta-column gptstyle p-top-32 p-bot-64">
	{#if chatStream && chatStream.length > 0}
		{#each chatStream as item, i}
			{#if item.author === 'user'}
				<div class="rta-column usercol null">
					<small class="spline">{item.author} | {item.id}</small>
					<p class="point" on:click={() => toggleChat(i)} on:keydown={fauxfake}>{item.value.slice(0,100)}</p>
					{#if fullChat[i]}
					<pre transition:slide>{item.value}</pre>
					{/if}
				</div>
			{:else}
				<div class="rta-column rowgap100 gptcol null">
					<small>{item.author} | {item.id}</small>
					{#if fullGPT[i]}
					<pre class="white point" on:click={() => toggleGPT(i)} on:keydown={fauxfake}>LESS</pre>
					<pre class="language-html" transition:slide={{duration: 300}}><code>
						{item.value}</code>
					</pre>
					{:else}
					<pre transition:slide={{duration: 300}}>{item.value.slice(0,200)}</pre>
					<pre class="white point" on:click={() => toggleGPT(i)} on:keydown={fauxfake}>...MORE</pre>
					{/if}
				</div>
			{/if}					
		{/each}
	{/if}
</div>
