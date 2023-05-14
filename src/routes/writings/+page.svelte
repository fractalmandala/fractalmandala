<script lang="ts">
	
	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { featuredHistory, featuredMandala, featuredArchival } from '$lib/utils/localpulls'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'
	let hists:any
	let mands:any
	let archs:any
	let fake = false
	let expandRightbar = false

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}
	
	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		hists = await featuredHistory();
		mands = await featuredMandala();
		archs = await featuredArchival();
	})

</script>

<div class="rta-grid grid2 stdfix" class:light={!$themeMode} class:dark={$themeMode}>
	<div class="rta-column mainone">
		<BreadCrumb/>
		<div class="rta-column stickyboy m-bot-32" class:dark={$themeMode} class:light={!$themeMode}>
			<h3 class="bord-bot p-bot-16">
				Writings
			</h3>
		</div>
		<p class="m-bot-32">
			At core, a writer is what I am. I was twelve years old when I read Isaac Asimov for the first time and simultaneously discovered two things: 1- I love science fiction; 2- I wanted to write.
		</p>
			{#if mands && mands.length > 0}
				{#each mands as item}
				<div class="featurebox2">
					<h5>
						<a class="flat" href={item.linkpath}>
							{item.meta.title}
						</a>
					</h5>
					</div>
				{/each}
			{/if}
			{#if hists && hists.length > 0}
				{#each hists as item}
				<div class="featurebox2">
					<h5>
						<a class="flat" href={item.linkpath}>
							{item.meta.title}
						</a>
					</h5>
				</div>	
				{/each}
			{/if}
			{#if archs && archs.length > 0}
				{#each archs as item}
				<div class="featurebox2">
					<h5>
						<a class="flat" href={item.linkpath}>
							{item.meta.title}
						</a>
					</h5>
				</div>
				{/each}
			{/if}
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
				<p class="tt-u"><strong><a href="/writings/mandala">Maṇḍala</a></strong></p>
				<p class="tt-u"><strong><a href="/writings/history">History</a></strong></p>
				<p class="tt-u"><strong><a href="/writings/archival">Archival</a></strong></p>
			</div>
		{/if}
	</div>
</div>

<style lang="sass">

.featurebox2
	h5
		padding-bottom: 24px

</style>