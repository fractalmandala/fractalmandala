<script lang="ts">

	import { page } from '$app/stores'
	import ChevRight1 from '$lib/icons/ChevRight.svelte'
	import ChevRight2 from '$lib/icons/ChevRight.svelte'
	import ChevRight3 from '$lib/icons/ChevRight.svelte'
	import ChevRight4 from '$lib/icons/ChevRight.svelte'
	import ChevRight5 from '$lib/icons/ChevRight.svelte'
	import ChevRight6 from '$lib/icons/ChevRight.svelte'

	let path = $page.url.pathname;
	let level:number
  let pathParts = path.split('/').filter(part => part !== '');
  let [part1, part2, part3, part4] = pathParts;
	let lone = false
	let ltwo = false
	let lthree = false
	let lfour = false

	$: if ( part4 ) {
		level = 4
	} else {
		if ( part3 ) {
			level = 3
		} else {
			if ( part2 ) {
				level = 2
			} else {
				level = 1
			}
		}
	}

	$: if ( level === 4) {
		lfour = true
	} else {
		lfour = false
	}
	
	$: if ( level === 3 ) {
		lthree = true
	} else {
		lthree = false
	}

	$: if ( level === 2 ) {
		ltwo = true
	} else {
		ltwo = false
	}

	$: if ( level === 1 ) {
		lone = true
	} else {
		lone = false
	}
 
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap" rel="stylesheet">
</svelte:head>

<div class="rta-row ycenter rta-breadcrumb">
	<div class="rta-row incrumb">
		<a href="/">fractal maṇḍala</a>
		<ChevRight1/>
	</div>
	{#if part1}
	<a class="rta-row incrumb" href="/{part1}" class:current={lone}>
		{part1}
		<ChevRight2/>
	</a>
	{/if}
	{#if part2}
	<a class="rta-row incrumb" href="/{part1}/{part2}" class:current={ltwo}>
		{part2}
		<ChevRight3/>
	</a>
	{/if}
	{#if part3}
	<a class="rta-row incrumb" href="/{part1}/{part2}/{part3}" class:current={lthree}>
		{part3}
		<ChevRight4/>
	</a>
	{/if}
	{#if part4}
	<a class="rta-row incrumb" href="/{part1}/{part2}/{part3}/{part4}" class:current={lfour}>
		{part4}
		<ChevRight5/>
	</a>
	{/if}
</div>

<style lang="sass">

.incrumb
	font-family: 'Cousine', monospace
	text-transform: uppercase
	font-size: 12px
	align-items: center
	color: var(--midline)
	cursor: pointer

.incrumb.current
	font-weight: bold
	color: var(--opposite)

.rta-breadcrumb
	color: var(--midline)
	a
		color: inherit
		&::after
			content: none
	margin-bottom: 8px
	border-bottom: var(--bord)
	padding-bottom: 4px

.incrumb
	&:hover
		color: var(--green)

</style>