<script lang="ts">
	
	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { allWebdev, filteredWebdev } from '$lib/utils/localpulls'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	import DropDown from '$lib/deslib/DropDown.svelte'
	let hists:any
	let filteredItems:any
	let fake = false
	let expandRightbar = false
	let filter = ''

	

	function setNewFilter(newFilter:string){
		filter = newFilter
	}

	$: if ( filter ) {
		(async() => {
			filteredItems = await filteredWebdev(filter)
		})()
	}
	
	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		hists = await allWebdev();
		filteredItems = await filteredWebdev(filter)
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
			Webdev
		</h3>
		<DropDown>
		<div slot="mobile-banner">View Themes</div>
		<div slot="dropdown-part" class="dropsection">
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
				on:click={() => setNewFilter('ui')}
				class:selected={filter === 'ui'}
				>
				UI
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
		</DropDown>
	</div>

	<div class="rta-column rowgap100 soloblog newblog bord-top p-top-32">

		{#if hists && hists.length > 0}
			{#each hists as item}
				<div class="rta-column null" transition:slide>
						<h5 class="tt-u">
							<a href={item.linkpath}>
								{item.meta.id} - {item.meta.title}
							</a>
						</h5>				
				</div>
			{/each}
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
