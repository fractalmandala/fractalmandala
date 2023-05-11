<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
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

<div class="rta-grid grid2 stdfix" class:light={!$visibilityMode} class:dark={$visibilityMode}>
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
		<p transition:slide={{ duration: 200, easing: circOut}}><strong><a href="/essays">ESSAYS HOME</a></strong></p>
		<p transition:slide={{ duration: 200, delay: 40, easing: circOut}} class="spline"><a href="/essays/macrohistoriccase">1. The Macrohistoric Case for India's Civilizational Primacy</a></p>
		<p transition:slide={{ duration: 200, delay: 60, easing: circOut}} class="spline"><a href="/essays/historyvsitihasa">2. History is Ontic, Itihāsa Ontologic</a></p>
		<p transition:slide={{ duration: 200, delay: 80, easing: circOut}} class="spline"><a href="/essays/rathaasbija">3. Ratha as a Bīja of Civilizational DNA</a></p>
		<p transition:slide={{ duration: 200, delay: 100, easing: circOut}} class="spline"><a href="/essays/indiancivcon">4. Indian Civilizational Consciousness</a></p>
		<p transition:slide={{ duration: 200, delay: 120, easing: circOut}} class="spline"><a href="/essays/ramasjourney">5. Rāma Journey, the Avatāra in You</a></p>
		{/if}
	</div>
</div>

