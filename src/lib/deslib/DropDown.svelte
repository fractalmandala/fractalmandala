<script lang="ts">

	import { slide } from 'svelte/transition'
	import { breakZero, breakOne, breakTwo, themeMode } from '$lib/stores/globalstores'
	import Chevron from '$lib/icons/Chevron.svelte'
	let showDropdown = false
	let fake = false

	function fauxfake(){
		fake = !fake
	}

	function toggleDropdown(){
		showDropdown = !showDropdown
	}

</script>


<div class="rta-dropdown"
	class:dark={$themeMode}
	class:light={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<button class="banner blank-button" on:click={toggleDropdown}>
		<slot name="mobile-banner"></slot>
		<Chevron rotated={showDropdown}/>
	</button>
	{#if !$breakTwo || showDropdown}
		<div class="dropsection" transition:slide on:click={toggleDropdown} on:keydown={fauxfake}>
			<slot name="dropdown-part"></slot>
		</div>
	{/if}
</div>

<style lang="sass">

.rta-dropdown
	display: flex

.dropsection
	display: flex

.rta-dropdown.levelzero, .rta-dropdown.levelone
	flex-direction: row
	.dropsection
		flex-direction: row
		column-gap: 8px

.rta-dropdown.leveltwo
	flex-direction: column
	.dropsection
		flex-direction: column

.rta-dropdown.levelzero, .rta-dropdown.levelone
	.banner
		display: none

.rta-dropdown.leveltwo
	.banner
		display: flex
		flex-direction: row
		justify-content: space-between
		align-items: center
		border: 1px solid var(--opposite)
		color: var(--opposite)
		font-family: var(--coder)
		border-radius: 4px

</style>