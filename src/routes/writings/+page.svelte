<script lang="ts">
	
	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { allWritings, filteredWritings } from '$lib/utils/localpulls'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	import DropDown from '$lib/deslib/DropDown.svelte'
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
	class="solopage zepad all minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>

	<div class="rta-column ycenter can-stick">
		<h3 class="tt-u">
			Writings
		</h3>
		<DropDown>
		<div slot="mobile-banner">View Themes</div>
		<div slot="dropdown-part" class="dropsection">
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
		</DropDown>
	</div>
	<div class="rta-column rowgap100 soloblog newblog bord-top p-top-32">
		{#if anyFilter}
			{#if filteredItems && filteredItems.length > 0 }
				{#each filteredItems as item}
					<div class="rta-column null" transition:slide>
						<h5 class="tt-u">
							<a href={item.linkpath}>
								{item.meta.title}
							</a>
						</h5>
					</div>
				{/each}
			{/if}
		{:else}
		{#if hists && hists.length > 0}
			{#each hists as item}
				<div class="rta-column null" transition:slide>
						<h5 class="tt-u">
							<a href={item.linkpath}>
								{item.meta.title}
							</a>
						</h5>				
				</div>
			{/each}
		{/if}
		{/if}
	</div>
</div>

<style lang="sass">

.levelzero
	.dropsection
		display: flex
		flex-direction: row
		column-gap: 32px
		padding: 16px 0

.levelone
	.dropsection
		display: flex
		flex-direction: row
		column-gap: 32px
		padding: 16px 0


.leveltwo
	.dropsection
		display: flex
		flex-direction: column
		row-gap: 16px
		padding: 16px 0
	.newblog
		margin-bottom: 16px



</style>
