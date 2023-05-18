<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { resizableAction } from "svelte-legos";
	import { slide } from 'svelte/transition'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'
	import ExpandDown1 from '$lib/icons/ExpandDown.svelte'
	import ExpandDown2 from '$lib/icons/ExpandDown.svelte'
	import GPTParser from '$lib/gptapp/GPTParser.svelte'
	import GPTParser2 from '$lib/gptapp/GPTParser.svelte'
	import { newGPT, gptSveltekit, evenGPT, oddGPT } from '$lib/utils/supabase'
	import supabase from '$lib/utils/supabase'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'

	let thisTitle:string
	let titles:any
	let pageTitle:string
	let chatStream:any	
	let renderedItems = new Set();
	let fullChat = Array(20).fill(false)
	let fullGPT = Array(20).fill(false)
	let fake = false
	let inputAgent = ''
	let rotated = true
	let evens:any
	let odds:any

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

  const renderDistinctItem = (item:any) => {
    let processedItem = item.fts.replace(/[\d:,'/]/g,'').replace(/\s/g, '\n');
    if (!renderedItems.has(processedItem)) {
      renderedItems.add(processedItem);
      return processedItem;
    }
    return null;
  }

	export async function updateChat(newID:number){
		const { error } = await supabase
		.from('amrit-gpt')
		.update({ author: inputAgent })
		.eq('id', newID)
		if ( error ) throw new Error(error.message)
	}

	export let data

	onMount(async() => {
		thisTitle = data.title
		pageTitle = data.title
		chatStream = await newGPT(thisTitle);
		titles = await gptSveltekit();
		evens = await evenGPT(thisTitle);
		odds = await oddGPT(thisTitle);
		Prism.highlightAll();
	})

</script>

<svelte:head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-css.min.js" integrity="sha512-mHqYW9rlMztkE8WFB6wIPNWOVtQO50GYBsBRMyA1CMk34zLJ6BrvVy3RVHoIIofugmnoNLGxkuePQ9VT2a3u8w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>


<div class="zepad all single minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<h2 class="tt-u">
		{data.title}
	</h2>
	<div class="rta-column newblog" class:dark={$themeMode} class:light={!$themeMode}>
		{#if chatStream && chatStream.length > 0}
			{#each chatStream as item, i}
				<div class="rta-column rowgap600 p-top-16 overlord bord-bot m-bot-16 p-bot-16 boxno-{i}"
					>
					<GPTParser2 response={item.value}/>
				</div>
			{/each}
		{/if}
	</div>
</div>

