<script lang="ts">

	import { onMount } from 'svelte'
	import { themeGeneral } from '$lib/utils/localpulls'
	import visibilityMode from '$lib/stores/visibility'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	let y:number
	let isInvisible = false
	let mouseY:number
	let latestScrollY:number
	let iW:number
	let breakPoint:boolean
	let fake = false
	let expandRightbar = false
	let titles:any = []

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
		titles = await themeGeneral();
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

<div class="rta-grid grid2 stdfix" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<div class="rta-column mainone">
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
			<div class="rta-column" transition:slide={{ easing: circOut }} data-lenis-prevent>
				<p class="tt-u"><strong><a href="/webui">WebUI</a></strong></p>
				{#if titles && titles.length > 0}
					{#each titles as item}
						<p class="spline">
							<a href={item.linkpath}>
								{item.meta.title}
							</a>
						</p>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>

<style lang="sass">

.spline
	margin-bottom: 6px




</style>

