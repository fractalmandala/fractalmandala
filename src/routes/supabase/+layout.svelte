<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakOne, breakZero, breakTwo } from '$lib/stores/globalstores'
	import { themeSupabase } from '$lib/utils/localpulls'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'
	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
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
		titles = await themeSupabase();
	})

</script>

<BoxStandard
>
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
						<p class="space tt-u">
							<a href={item.linkpath}>
								{item.meta.title}
							</a>
						</p>
					{/each}
				{/if}
	</div>
</BoxStandard>
