<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode } from '$lib/stores/globalstores'
	import { designLibrary } from '$lib/utils/localpulls'
	import ButtonBasic from '$lib/deslib/ButtonBasic.svelte'
	import InputText from '$lib/deslib/InputText.svelte'
	import { slide } from 'svelte/transition'
	import { quadIn } from 'svelte/easing'
	let y:number
	let isInvisible = false
	let mouseY:number
	let latestScrollY:number
	let iW:number
	let breakPoint:boolean
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

	$: if ( iW <= 1023 ) {
		breakPoint = true
	} else {
		breakPoint = false
	}

	$: {
		if ( y > 100 && y > latestScrollY ) {
			isInvisible = true
		} else {
			isInvisible = false
		}
		latestScrollY = y
	}

	onMount(async() => {
		titles = await designLibrary();
		const handleMouse = (event: {clientY: number;}) => {
			mouseY = event.clientY
			if ( mouseY <= 128 ) {
				isInvisible = false
			} 
		}
		window.addEventListener('mousemove', handleMouse)
		return() => {
			window.removeEventListener('mousemove',handleMouse)
		}
	})

</script>

<svelte:window bind:outerWidth={iW} bind:scrollY={y}/>

<div class="rta-grid grid2 stdfix" class:light={!$themeMode} class:dark={$themeMode}>
	<div class="rta-column rowgap200 mainone">
		<slot></slot>
	</div>
	<div class="rta-column rightone" class:opened={expandRightbar} class:movedToTop={isInvisible} data-lenis-prevent>
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
			<div class="rta-column" transition:slide={{ easing: quadIn }} data-lenis-prevent>
				<p class="tt-u"><strong><a href="/javascript">Design Library</a></strong></p>

			</div>
		{/if}
	</div>
</div>

