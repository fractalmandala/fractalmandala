<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import ChevronRight from '$lib/icons/ChevFRight.svelte'
	import ChevronLeft from '$lib/icons/ChevFLeft.svelte'
	import { newGPT, gptSveltekit, evenGPT, oddGPT } from '$lib/utils/supabase'
	import { marked } from 'marked'
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


<div class="solopage zepad all minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<div class="rta-column rowgap100 ycenter can-stick p-bot-16">
		<h4 class="tt-u">
			{data.title}
		</h4>
		<div class="rta-row rta-pagination">
			<a href="/gpt/{data.previd}" class="blank-button">
				<ChevronLeft --thisFill="#0BC160"/>
			</a>
			<a href="/gpt/{data.nextid}" class="blank-button">
				<ChevronRight --thisFill="#0BC160"/>
			</a>
		</div>
	</div>

	<div class="rta-column rowgap100 soloblog newblog bord-top p-top-32">
		{#if chatStream && chatStream.length > 0}
			{#each chatStream as item, i}
				<div class="rta-column rowgap200 overlord bord-bot m-top-16 m-bot-16 p-bot-16 boxno-{i}"
					>
					{@html marked.parse(item.value)}
				</div>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.overlord
	font-size: 14px
	line-height: 1

.levelzero
	.overlord
		width: 800px

.rta-pagination
	.blank-button
		transform-origin: center center
		transition: 0.09s
		padding: 0
		&:hover
			transform: scale(0.9)


</style>