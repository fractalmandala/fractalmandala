<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { slide } from 'svelte/transition'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'
	import ExpandDown1 from '$lib/icons/ExpandDown.svelte'
	import ExpandDown2 from '$lib/icons/ExpandDown.svelte'
	import GPTParser from '$lib/gptapp/GPTParser.svelte'
	import GPTParser2 from '$lib/gptapp/GPTParser.svelte'
	import { newGPT, gptAnimation } from '$lib/utils/supabase'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'

	let thisTitle:string
	let titles:any
	let chatStream:any	
	let fullChat = Array(20).fill(false)
	let fullGPT = Array(20).fill(false)
	let fake = false
	let rotated = true

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
		titles = await gptAnimation();
		Prism.highlightAll()
	})

</script>

<svelte:head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-css.min.js" integrity="sha512-mHqYW9rlMztkE8WFB6wIPNWOVtQO50GYBsBRMyA1CMk34zLJ6BrvVy3RVHoIIofugmnoNLGxkuePQ9VT2a3u8w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</svelte:head>

<BoxStandard
	pageTitle={thisTitle}
>
	<div slot="mid" class="chatstream"
		class:dark={$themeMode}
		class:light={!$themeMode}
		class:levelzero={$breakZero}
		class:levelone={$breakOne}
		class:leveltwo={$breakTwo}
		>
		{#if chatStream && chatStream.length > 0}
			{#each chatStream as item, i}
				{#if item.author === 'user'}
					<div class="rta-column inputtext rowgap100 null" class:flatten={fullChat[i]}>
						{#if !fullChat[i]}
						<small>{item.author} | {item.id}</small>
						<pre class="point" on:click={() => toggleChat(i)} on:keydown={fauxfake}>{item.value.slice(0,200)}</pre>
						{/if}
						{#if fullChat[i]}
						<GPTParser response={item.value}>
							<button slot="button" class="secondbutton" on:click={() => toggleChat(i)}>Close</button>
						</GPTParser>
						{/if}
					</div>
				{:else}
					<div class="rta-column outputtext rowgap100 null">
						<small>{item.author} | {item.id}</small>
						{#if fullGPT[i]}
						<GPTParser2 response={item.value}/>
							<button class="rta-icon rta-row ycenter blank-button" on:click={() => toggleGPT(i)}>
								<ExpandDown2 rotated={rotated}/>
							</button>
						{:else}
						<pre transition:slide={{duration: 300}}>
							{item.value.slice(0,200)}
						</pre>
						<button class="rta-icon rta-row ycenter blank-button" on:click={() => toggleGPT(i)}>
							<ExpandDown1/>
						</button>
						{/if}
					</div>
				{/if}					
			{/each}
		{/if}
	</div>
	<div slot="right" class="null">
		{#if titles && titles.length > 0}
			{#each titles as item}
				<p class="spline">
					<a href="/gpt/sveltekit/{item.indexing}">
						{item.title}
					</a>
				</p>
			{/each}
		{/if}
	</div>

</BoxStandard>

<style lang="sass">

.rta-column
	small
		text-transform: uppercase
		font-family: 'Spline Sans', sans-serif

.levelzero
	.rta-column
		margin-bottom: 24px
		border-bottom: var(--bord)
		padding-bottom: 32px
		small
			font-size: 12px
		pre
			letter-spacing: -0.9px
	.inputtext
		pre
			color: var(--midline)
			font-size: 14px
		small
			color: var(--midline)
	.outputtext
		small
			color: var(--green)
		pre
			color: var(--opposite)
			font-size: 1.08rem


</style>
