<script lang="ts">

	import { onMount } from 'svelte'
	import BroGPT from '$lib/agents/broGPT.svelte'
	import Sanskrit from '$lib/agents/Sanskrit.svelte'
	import Svelter from '$lib/agents/Svelter.svelte'
	import { scale } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import '$lib/styles/themes.sass'
	import { TagsFiltered } from '$lib/utils/supabase'
	import { allMandalas } from '$lib/utils/localpulls'
	import BigCard from '$lib/components/BigCard.svelte'
	import supabase from '$lib/utils/supabase'
	let submittance:any
	let userprompt:any
	let selectedAgent:boolean[] = Array(4).fill(false)	

	let tags = 'star'
	let codas:any
	let fake = false
	let gridalign = false
	let posts:any
	let expand:boolean[] = Array(20).fill(false)
	let area:boolean[] = Array(9).fill(false)
	let ifhovering = false
	area[1] = true

	function toggleHovering(){
		ifhovering = !ifhovering
	}

	function selectAgent(index:number){
		selectedAgent[index] = !selectedAgent[index]
		for ( let i = 0; i < selectedAgent.length; i ++ ) {
			if ( i !== index && selectedAgent[i] === true ) {
				selectedAgent[i] = false
			}
		}
	}

	function fauxfake(){
		fake = !fake
	}

	function togglePostItem(index:number){
		expand[index] = !expand[index]
			for (let i = 0; i < expand.length; i++) {
			if (i !== index && expand[i] === true) {
			expand[i] = false;
			}
			if ( expand.every(i => i === false )) {
				gridalign = false
			} else
				gridalign = true
		}
	}

	async function submitAnswer(){
		try {
			const { error } = await supabase
      .from('amrit-chatswithgpt')
      .insert({ prompt: userprompt, response: submittance })
      if (error) {
        throw new Error(error.message)
      }
      console.log('submitted')
    } catch (e) {
      console.error('Error inserting into Supabase:', e)
    }
	}

	function changeTag(newTag:any){
		tags = newTag
	}

	$: if ( tags ) {
		(async() => {
		codas = await TagsFiltered(tags)
		})()
	}


	onMount(async() => {
		hljs.highlightAll()	
		codas = await TagsFiltered(tags)
		posts = await allMandalas()
		
	})
</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>


<div class="themegreen">
	<div class="inviewarea buffer wider bufferYb">
		<small>Select GPT Agent:</small>
		<div class="boxr">
			<div class="agents" on:click={() => selectAgent(1)} on:keydown={fauxfake} class:selectedone={selectedAgent[1]}>broGPT</div>
			<div class="agents" on:click={() => selectAgent(2)} on:keydown={fauxfake} class:selectedtwo={selectedAgent[2]}>the Sanskritist</div>
			<div class="agents" on:click={() => selectAgent(3)} on:keydown={fauxfake} class:selectedthree={selectedAgent[3]}>Svelta Lowda</div>
		</div>
		{#if selectedAgent[1]}
			<BroGPT></BroGPT>
		{/if}
		{#if selectedAgent[2]}
			<Sanskrit></Sanskrit>
		{/if}
		{#if selectedAgent[3]}
			<Svelter></Svelter>
		{/if}
	</div>
	<div class="thinstrip buffer bufferYb bufferYt">
	<div on:click={() => changeTag('star')} on:keydown={fauxfake} class="{ tags === 'star' ? 'currentTag' : ''}">Star</div>
	<div on:click={() => changeTag('sveltecode')} on:keydown={fauxfake} class="{ tags === 'sveltecode' ? 'currentTag' : ''}">Sveltecode</div>
	<div on:click={() => changeTag('scroll')} on:keydown={fauxfake} class="{ tags === 'scroll' ? 'currentTag' : ''}">Scroll</div>
	<div on:click={() => changeTag('gpt')} on:keydown={fauxfake} class="{ tags === 'gpt' ? 'currentTag' : ''}">GPT</div>
	<div on:click={() => changeTag('supabase')} on:keydown={fauxfake} class="{ tags === 'supabase' ? 'currentTag' : ''}">Supabase</div>
	<div on:click={() => changeTag('animation')} on:keydown={fauxfake} class="{ tags === 'animation' ? 'currentTag' : ''}">Animations</div>
	<div on:click={() => changeTag('template')} on:keydown={fauxfake} class="{ tags === 'template' ? 'currentTag' : ''}">Templates</div>
	<div on:click={() => changeTag('error')} on:keydown={fauxfake} class="{ tags === 'error' ? 'currentTag' : ''}">Errors</div>
	<div on:click={() => changeTag('fetch')} on:keydown={fauxfake} class="{ tags === 'fetch' ? 'currentTag' : ''}">Fetch</div>
	<div on:click={() => changeTag('setup')} on:keydown={fauxfake} class="{ tags === 'setup' ? 'currentTag' : ''}">Setups</div>
	<div on:click={() => changeTag('typography')} on:keydown={fauxfake} class="{ tags === 'typography' ? 'currentTag' : ''}">Typography</div>
	</div>
	<div class="newgrids buffer bufferYb x00" class:resized={ifhovering}>
	{#if codas && codas.length > 0}
		{#each codas as item, i}
			<div class="tube green" class:hovered={ifhovering} in:scale={{delay: 50*i, easing: backOut }} out:scale={{ delay: 10*i, easing: backIn }}>
					<small>{item.type}</small>
					<h5>
						{#if item.type.length > 0 && item.type === 'code'}
						<a href="/mandala/codes/{item.counting}">
						{item.title}
						</a>
						{:else}
						<a href="/mandala/notes/{item.counting}">
						{item.title}
						</a>				
						{/if}
					</h5>
					<p>{item.lang} - {item.tags}</p>
					{#if expand[i]}
						<BigCard language={item.lang}>
							{item.codesnippet}
						</BigCard>
					{/if}
			</div>
		{/each}
	{/if}
	</div>	
</div>


<style lang="sass">

.inviewarea
	>small
		color: #676767
	.boxr
		padding-top: 8px
		gap: 16px
		border-bottom: 1px solid #272727
		padding-bottom: 16px

.agents.selectedone
	color: #10D56C

.agents.selectedtwo
	color: #227ceb

.agents.selectedthree
	color: #F64241

.agents
	text-transform: uppercase
	cursor: pointer

.themegreen
	padding-top: 128px
	
.x00
	align-items: start
	align-content: start

.thinstrip
	div
		cursor: pointer
		border-radius: 4px
		cursor: pointer
		transform-origin: center center
		color: #FFFFFF
		transition: all 0.15s ease
		border: 1px solid #272727
		font-size: 14px
		padding: 4px 8px
		position: relative
		overflow: hidden
		z-index: 1
		text-align: center
		&::before
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			content: ''
			z-index: -1
			background-color: hsla(200,9%,5%,1)
			transition: all 0.05s ease
			filter: blur(20px)
			background-image: radial-gradient(at 17% 36%, hsla(248,47%,49%,1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,0.2) 0px, transparent 50%)
		&:hover
			overflow: visible
			&::before
				background-color: hsla(130,90%,45%,1)
				filter: blur(15px)
	.currentTag
		&:hover
			overflow: visible
		&::before
			filter: blur(30px)
			background-color: hsla(130,90%,45%,1)
			background-image: radial-gradient(at 17% 36%, hsla(248,47%,49%,1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,0.2) 0px, transparent 50%)
		

.thinstrip
	.currentTag
		background-color: hsla(130,90%,15%,1)
		border: 1px solid #272727
		box-shadow: none
	div.currentTag
		box-shadow: none

.thinstrip
	display: grid
	grid-auto-flow: row
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
		grid-template-rows: 1fr 1fr
		gap: 16px 16px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-rows: 1fr 1fr 1fr
		gap: 8px 8px



</style>