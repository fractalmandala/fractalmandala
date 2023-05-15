<script lang="ts">

	import Chevron from '$lib/icons/Chevron.svelte'
	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'
	export let alignment = 'space-between'
	export let showSection = false
	export let isHeader = true
	let fake = false

	function fauxfake(){
		fake = !fake
	}

	const dispatch = createEventDispatcher()

</script>

<div class="rta-column subsection" class:border={showSection} class:padded={!isHeader}>
	<div class="rta-row ycenter" style="justify-content: {alignment}" on:click={() => dispatch('click')} on:keydown={fauxfake}>
		<button class="blank-button">
			<slot name="headitem"></slot>
		</button>
		{#if isHeader}
		<div class:rotated={showSection}>
			<Chevron/>
		</div>
		{/if}
	</div> 
	{#if showSection}
		<div class="rta-column insection">
			<slot name="items"></slot>
		</div>
	{/if}
</div>

<style lang="sass">

.rotated
	transform-origin: center center
	transform: rotate(180deg)
	transition: 0.14s

.subsection
	padding-bottom: 16px

.subsection.padded
	border-bottom: var(--bord)

.subsection.padded
	.rta-row
		padding: 8px 8px 8px 0

.subsection
	padding: 8px

.rta-row
	cursor: pointer
	button
		text-transform: uppercase
		font-weight: 400
		cursor: pointer

		

</style>