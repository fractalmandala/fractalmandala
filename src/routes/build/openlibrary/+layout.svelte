<script lang="ts">

	import { themeMode, breakOne, breakZero, breakTwo } from '$lib/stores/globalstores'
	import { bolLinks } from '$lib/utils/sveltekittools'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	let fake = false
	let expandRightbar = false

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}
	
	function fauxfake(){
		fake = !fake
	}

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
			<div class="rta-column" transition:slide={{ easing: circOut }}>
				<p class="tt-u"><strong><a href="/build/openlibrary/intro">Bṛhat Open Library</a></strong></p>
				<small>
						Is a labour of ambition and perseverance. My goal is to 360-degree inter-connect every major scripture in Dharma, every Sanskrit word, every Pāṇinian dhātu.
				</small>
				<small>
					A vision that's possible only because I can stand on the shoulders of many who have laboured before me. Here are some of them...
				</small>
				{#if bolLinks && bolLinks.length > 0}
					{#each bolLinks as item}
						<small>
							<a class="greenlink" href={item.url} target="_blank" rel="noreferrer">
								{item.name}
							</a>
						</small>
					{/each}
				{/if}
			</div>
		{/if}
	</div>
</div>
