<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { gptAll, gptFiltered } from '$lib/utils/supabase'
	import { slide } from 'svelte/transition'
	let alls:any
	let filter:any
	let filtered:any
	let anyFilter = false	

	function setNewFilter(newFilts:string){
		filter = newFilts
	}
 
	$: if ( filter ) {
		(async() => {
			filtered = await gptFiltered(filter)
		})();
	}

	$: if ( filter === '' ) {
		anyFilter = false
	} else {
		anyFilter = true
	}

	import InputText from '$lib/deslib/InputText.svelte'
	import GPTBox from '$lib/agents/GPTBox.svelte'
	let fake = false
	let showBox = false

	function toggleBox(){
		showBox = !showBox
	}

	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		filtered = await gptFiltered(filter)
		alls = await gptAll();
	})

</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>


<div
	class="solopage"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<h1 class="tt-u">
		GPT Boi, and Others...
	</h1>
	<div class="rta-row p-bot-16 colgap300 m-top-16">
		<button class="secondbutton"
			on:click={() => setNewFilter('sveltekit')}
			class:selected={filter === 'sveltekit'}
			>
			Sveltekit
		</button>
		<button class="secondbutton"
			on:click={() => setNewFilter('supabase')}
			class:selected={filter === 'supabase'}
			>
			Supabase
		</button>
		<button class="secondbutton"
			on:click={() => setNewFilter('webui')}
			class:selected={filter === 'webui'}
			>
			UI
		</button>
		<button class="secondbutton"
			on:click={() => setNewFilter('animation')}
			class:selected={filter === 'animation'}
			>
			Animation
		</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('other')}
				class:selected={filter === 'other'}
				>
				Other
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('')}
				class:selected={filter === ''}
				>
				All
			</button>
	</div>
	<div class="rta-column rowgap100 soloblog newblog bord-top p-top-32">
		{#if anyFilter}
			{#if filtered && filtered.length > 0 }
				{#each filtered as item}
					<div class="rta-column null" transition:slide>
						<h5 class="tt-u">
							<a href="/gpt/{item.theme}/{item.indexing}">
								{item.title}
							</a>
						</h5>
					</div>
				{/each}
			{/if}
		{:else}
		{#if alls && alls.length > 0}
			{#each alls as item}
				<div class="rta-column null" transition:slide>
						<h5 class="tt-u">
							<a href="/gpt/{item.theme}/{item.indexing}">
								{item.title}
							</a>
						</h5>				
				</div>
			{/each}
		{/if}
		{/if}
	</div>
</div>

<style lang="sass">


.soloblog.newblog
	h5
		margin: 0
		padding: 0

</style>

