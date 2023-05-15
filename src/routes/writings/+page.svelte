<script lang="ts">
	
	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { allWritings, filteredWritings } from '$lib/utils/localpulls'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	let hists:any
	let filteredItems:any
	let fake = false
	let expandRightbar = false
	let filter = ''
	let anyFilter = false	

	

	function setNewFilter(newFilter:string){
		filter = newFilter
	}

	function setAll(){
		filter = ''
	}

	$: if ( filter ) {
		(async() => {
			filteredItems = await filteredWritings(filter)
		})()
	}

	$: if ( filter === '' ) {
		anyFilter = false
	} else {
		anyFilter = true
	}
	
	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		hists = await allWritings();
		filteredItems = await filteredWritings(filter)
	})

</script>

<div
	class="solopage"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<h1 class="tt-u">
		Writing
	</h1>
	<div class="newblog">
		<h5 class="near thin">my great catharsis, my great solace...</h5>
	</div>
	<div class="rta-row p-bot-16 colgap300 m-top-16">
			<button class="secondbutton"
				on:click={() => setNewFilter('fractal maṇḍala')}
				class:selected={filter === 'fractal maṇḍala'}
				>
				Maṇḍala
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('history')}
				class:selected={filter === 'history'}
				>
				History
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('psychedelia')}
				class:selected={filter === 'psychedelia'}
				>
				Psychedelia
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('archival')}
				class:selected={filter === 'archival'}
				>
				Archival
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
			{#if filteredItems && filteredItems.length > 0 }
				{#each filteredItems as item}
					<div class="rta-column null" transition:slide>
						<h3 class="tt-u">
							<a href={item.linkpath}>
								{item.meta.title}
							</a>
						</h3>
					</div>
				{/each}
			{/if}
		{:else}
		{#if hists && hists.length > 0}
			{#each hists as item}
				<div class="rta-column null" transition:slide>
						<h3 class="tt-u">
							<a href={item.linkpath}>
								{item.meta.title}
							</a>
						</h3>				
				</div>
			{/each}
		{/if}
		{/if}
	</div>
</div>

<style lang="sass">

.newblog
	h3
		color: var(--textone)
		cursor: pointer
		font-weight: 700
		letter-spacing: -1px
		&:hover
			color: var(--gret)

</style>