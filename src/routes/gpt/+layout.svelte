<script lang="ts">

	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
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

	$: if ( iW <= 1023 ) {
		breakPoint = true
	} else {
		breakPoint = false
	}

</script>

<svelte:window bind:outerWidth={iW}/>

<div class="rta-grid grid2 stdfix">
	<div class="rta-column mainone">
		<slot></slot>
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
		<p transition:slide={{ duration: 200, easing: circOut}}><strong><a href="/gpt">GPT HOME</a></strong></p>
		{/if}
	</div>
</div>

