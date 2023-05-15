<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'
	import { archivalWritings } from '$lib/utils/localpulls'
	let fullChat = Array(20).fill(false)
	let y:number
	let fake = false
	let expandRightbar = false
	let titles:any = []

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}
	
	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		titles = await archivalWritings();
	})

</script>

<svelte:window bind:scrollY={y}/>

<BoxStandard>
	<div slot="mid"
		class:dark={$themeMode}
		class:light={!$themeMode}
		class:levelzero={$breakZero}
		class:levelone={$breakOne}
		class:leveltwo={$breakTwo}
		>
		<slot></slot>
	</div>
	<div slot="right">
		{#if titles && titles.length > 0}
			{#each titles as item}
				<p class="space">
					<a href={item.linkpath}>
						{item.meta.title}
					</a>
				</p>
			{/each}
		{/if}
	</div>

</BoxStandard>
