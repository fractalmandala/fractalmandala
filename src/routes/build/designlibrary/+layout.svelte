<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakOne, breakZero, breakTwo } from '$lib/stores/globalstores'
	import { designLibrary } from '$lib/utils/localpulls'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'
	import { slide } from 'svelte/transition'
	import { quadIn } from 'svelte/easing'
	let fake = false
	let expandRightbar = false
	let titles:any = []
	let showComponent = Array(30).fill(false)

	function toggleComponent(index:number){
		showComponent[index] = !showComponent[index]
			for ( let i = 0; i < showComponent.length; i ++ ) {
				if ( i !== index && showComponent[i] === true ) {
					showComponent[i] = false
				}
			}
	}

	$: anyComponent = showComponent.some(item => item)

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}
	
	function fauxfake(){
		fake = !fake
	}


	onMount(async() => {
		titles = await designLibrary();
	})

</script>

<div class="rta-grid grid2 stdfix" class:light={!$themeMode} class:dark={$themeMode}>
	<div class="rta-column mainone">
		<BreadCrumb/>
		<slot></slot>
	</div>
	<div class="rta-column rightone" class:opened={expandRightbar} data-lenis-prevent>
		{#if $breakOne || $breakTwo}
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
		{#if $breakZero || expandRightbar}
			<div class="rta-column" transition:slide={{ easing: quadIn }}>
				<p class="tt-u"><strong><a href="/build/designlibrary">Design Library</a></strong></p>
			</div>
		{/if}
	</div>
</div>

