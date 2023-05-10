<script lang="ts">

	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	let selectSection = Array(5).fill(false)
	selectSection[1] = true
	let iW:number
	let breakPoint:boolean
	let fake = false
	let expandRightbar = false

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

	$: if ( iW <= 1023 ) {
		breakPoint = true
	} else {
		breakPoint = false
	}

</script>

<svelte:window bind:outerWidth={iW}/>

<div class="rta-grid grid2 stdfix">
	<div class="rta-column mainone">
		{#if selectSection[1]}
		<slot></slot>
		{/if}
		{#if selectSection[2]}
		<h1>Scrolls of Āryavarta</h1>
		{/if}
		{#if selectSection[3]}
		<h1>Dharma Aesthetic</h1>
		{/if}
		{#if selectSection[4]}
		<h1>Miscellaneous</h1>
		{/if}
		{#if selectSection[5]}
		<h1>Featured</h1>
		{/if}
		{#if selectSection[6]}
		<h1>Latest</h1>
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
		<p on:click={() => toggleSection(2)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 40, easing: circOut}}>Scrolls of Āryavarta</p>
		<p on:click={() => toggleSection(3)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 60, easing: circOut}}>Dharma Aesthetic</p>
		<p on:click={() => toggleSection(4)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 80, easing: circOut}}>Miscellaneous</p>
		<p on:click={() => toggleSection(5)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 100, easing: circOut}}>Featured</p>
		<p on:click={() => toggleSection(6)} on:keydown={fauxfake} transition:slide={{ duration: 200, delay: 120, easing: circOut}}>Latest</p>
		{/if}
	</div>
</div>