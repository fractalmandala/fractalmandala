<script lang="ts">

	import { onMount } from 'svelte'
	import { archivalMandala } from '$lib/utils/localpulls'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'
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

	function toggleChat(index:number){
		fullChat[index] = !fullChat[index]
		for ( let i = 0; i < fullChat.length; i ++ ) {
			if ( i !== index && fullChat[i] === true) {
				fullChat[i] = false
			}
		}
	}

	onMount(async() => {
		titles = await archivalMandala();
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
			{#each titles as item, i}
				<p class="space">
					<a href={item.linkpath}>
						{item.meta.title}
					</a>
				</p>
			{/each}
		{/if}
	</div>

</BoxStandard>
