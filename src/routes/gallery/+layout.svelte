<script lang="ts">

	import { onMount } from 'svelte'
	import visibilityMode from '$lib/stores/visibility'
	import { fullGallery, limitGallery, singleImage } from '$lib/utils/supabase'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	let selectSection = Array(8).fill(false)
	selectSection[1] = true
	let iW:number
	let breakPoint:boolean
	let fake = false
	let expandRightbar = false
	let images:any
	let solo:any
	let section1 = 'abstract'
	let section2 = 'culture aesthetic'
	let section3 = 'mandalas'
	let section4 = 'misc'
	let section5= 'sci-fi'
	let section6 = 'the once was'
	let section1images:any
	let section2images:any
	let section3images:any
	let section4images:any
	let section5images:any
	let section6images:any
	let expandImage = Array(200).fill(false)
	let openID:number
	let modalImage = false


	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}

	function fauxfake(){
		fake = !fake
	}

	function toggleSection(index:number) {
		selectSection[index] = !selectSection[index]
		for ( let i = 0; i < selectSection.length; i ++ ) {
			if ( i !== index && selectSection[i] === true ) {
				selectSection[i] = false
			}
		}
	}

	function toggleImage(index:number) {
		expandImage[index] = !expandImage[index]
		for ( let i = 0; i < expandImage.length; i ++ ) {
			if ( i !== index && expandImage[i] === true ) {
				expandImage[i] = false
			}
		}
	}

	$: anyImageOpen = expandImage.some(item => item)

	$: anySectionOpen = selectSection.some(item => item)

	$: if ( iW <= 1023 ) {
		breakPoint = true
	} else {
		breakPoint = false
	}

	onMount(async() => {
		images = await fullGallery()
		section1images = await limitGallery(section1)
		section2images = await limitGallery(section2)
		section3images = await limitGallery(section3)
		section4images = await limitGallery(section4)
		section5images = await limitGallery(section5)
		section6images = await limitGallery(section6)
	})

</script>

<svelte:window bind:outerWidth={iW}/>

<div class="rta-grid grid2 stdfix" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<div class="rta-column mainone">
		{#if selectSection[1]}
		<slot></slot>
		{/if}
		{#if selectSection[2]}
			<div class="rta-column" in:slide={{ duration: 300, delay: 300, easing: circOut }} out:slide={{ duration: 300, delay: 0, easing: circOut }}>
				<h3 class="bord-bot p-bot-16">Abstract</h3>
				<p>Strange scapes and non-places, things non-existent and imagined...</p>
				<div class="rta-grid grid4 rowgap100 colgap100" class:calibrated={anyImageOpen}>
				{#if section1images && section1images.length > 0}
					{#each section1images as item, i}
						<div class="rta-image back" on:click={() => toggleImage(i)} on:keydown={fauxfake} class:opentab={expandImage[i]} style="background-image: url('{item.link}')">
						</div>
					{/each}
				{/if}
				</div>
			</div>
		{/if}
		{#if selectSection[3]}
			<div class="rta-column" in:slide={{ duration: 300, delay: 300, easing: circOut }} out:slide={{ duration: 300, delay: 0, easing: circOut }}>
				<h3 class="bord-bot p-bot-16">Culture Aesthetic</h3>
				<p>Explorations in Dhārmika themes, flat motifs, iconography...</p>
				<div class="rta-grid grid4 rowgap100 colgap100" class:calibrated={anyImageOpen}>
				{#if section2images && section2images.length > 0}
					{#each section2images as item, i}
						<div class="rta-image back" on:click={() => toggleImage(i)} on:keydown={fauxfake} class:opentab={expandImage[i]} style="background-image: url('{item.link}')">
						</div>
					{/each}
				{/if}
				</div>
			</div>
		{/if}
		{#if selectSection[4]}
			<div class="rta-column" in:slide={{ duration: 300, delay: 300, easing: circOut }} out:slide={{ duration: 300, delay: 0, easing: circOut }}>
				<h3 class="bord-bot p-bot-16">Maṇḍalas</h3>
				<p>Because you can never have too many maṇḍalas...</p>
				<div class="rta-grid grid4 rowgap100 colgap100" class:calibrated={anyImageOpen}>
				{#if section3images && section3images.length > 0}
					{#each section3images as item, i}
						<div class="rta-image back" on:click={() => toggleImage(i)} on:keydown={fauxfake} class:opentab={expandImage[i]} style="background-image: url('{item.link}')">
						</div>
					{/each}
				{/if}
				</div> 
			</div>
		{/if}
		{#if selectSection[5]}
			<div class="rta-column" in:slide={{ duration: 300, delay: 300, easing: circOut }} out:slide={{ duration: 300, delay: 0, easing: circOut }}>
				<h3 class="bord-bot p-bot-16">Misc</h3>
				<p>Unclassified...</p>
				<div class="rta-grid grid4 rowgap100 colgap100" class:calibrated={anyImageOpen}>
				{#if section4images && section4images.length > 0}
					{#each section4images as item, i}
						<div class="rta-image back" on:click={() => toggleImage(i)} on:keydown={fauxfake} class:opentab={expandImage[i]} style="background-image: url('{item.link}')">
						</div>
					{/each}
				{/if}
				</div> 
			</div>
		{/if}
		{#if selectSection[6]}
			<div class="rta-column" in:slide={{ duration: 300, delay: 300, easing: circOut }} out:slide={{ duration: 300, delay: 0, easing: circOut }}>
				<h3 class="bord-bot p-bot-16">Sci-fi</h3>
				<p>Badly classified?</p>
				<div class="rta-grid grid4 rowgap100 colgap100" class:calibrated={anyImageOpen}>
				{#if section5images && section5images.length > 0}
					{#each section5images as item, i}
						<div class="rta-image back" on:click={() => toggleImage(i)} on:keydown={fauxfake} class:opentab={expandImage[i]} style="background-image: url('{item.link}')">
						</div>
					{/each}
				{/if}
				</div> 
			</div>
		{/if}
		{#if selectSection[7]}
			<div class="rta-column" in:slide={{ duration: 300, delay: 300, easing: circOut }} out:slide={{ duration: 300, delay: 0, easing: circOut }}>
				<h3 class="bord-bot p-bot-16">Scrolls of Āryavarta</h3>
				<p>Imaginations of a Bhārata that once was...</p>
				<div class="rta-grid grid4 rowgap100 colgap100" class:calibrated={anyImageOpen}>
				{#if section6images && section6images.length > 0}
					{#each section6images as item, i}
						<div class="rta-image back" on:click={() => toggleImage(i)} on:keydown={fauxfake} class:opentab={expandImage[i]} style="background-image: url('{item.link}')">
						</div>
					{/each}
				{/if}
				</div> 
			</div>
		{/if}
	</div>
	<div class="rta-column rightone" class:opened={expandRightbar}>
		{#if breakPoint}
		<div class="rta-row ycenter between rightmenu" on:click={toggleRightbar} on:keydown={fauxfake}>
			<button class="break899">
				{#if expandRightbar}
				Close Subsections
				{:else}
				Expand Subsections
				{/if}
			</button>
			<div class="iconchev" class:rotated={expandRightbar}>
				<svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.41345 0.187622L0.413452 3.18762L8.41345 11.1876L16.4135 3.18762L13.4135 0.187622L8.41345 5.18762L3.41345 0.187622Z" fill="#FFFFFF"/>
				</svg>
			</div>
		</div>
		{/if}
		{#if !breakPoint || expandRightbar}
		<p on:click={() => toggleSection(1)} on:keydown={fauxfake} transition:slide={{ duration: 200, easing: circOut}}><strong>GALLERY HOME</strong></p>
		<p on:click={() => toggleSection(2)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 40, easing: circOut}}>Abstract</p>
		<p on:click={() => toggleSection(3)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 60, easing: circOut}}>Culture Aesthetic</p>
		<p on:click={() => toggleSection(4)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 80, easing: circOut}}>Maṇḍalas</p>
		<p on:click={() => toggleSection(5)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 100, easing: circOut}}>Misc</p>
		<p on:click={() => toggleSection(6)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 120, easing: circOut}}>Sci-fi</p>
		<p on:click={() => toggleSection(7)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 140, easing: circOut}}>Scrolls of Āryavarta</p>
		{/if}
	</div>
</div>

<style lang="sass">

.grid4
	margin-top: 16px
	.rta-image
		border: 2px solid var(--opposite)
		border-radius: 6px
		transition: 0.38s cubic-bezier(0.205, 0.655, 0.000, 0.995)
		transform-origin: center center
		&:hover
			transform: scale(0.94)

.grid4
	@media screen and (min-width: 1024px)
		grid-template-areas: ". . . ."
		grid-template-columns: 1fr 1fr 1fr 1fr
		.rta-image
			height: 24vh
			transition: all 0.5s cubic-bezier(0.995, 0.225, 0.750, 0.750)

.grid4.calibrated
	@media screen and (min-width: 1024px)
		.rta-image.opentab
			grid-row: span 2
			grid-column: span 2
			height: 48vh
			display: flex
			align-items: flex-end
			padding-bottom: 24px
			justify-content: center


</style>