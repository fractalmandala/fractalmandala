<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'

	export let data

	onMount(async() => {
		Prism.highlightAll();
	})

</script>

<div class="zepad all single minH mob">
	<h2 class="tt-u">
		{data.title}
	</h2>
	<div class="rta-column newblog" class:dark={$themeMode} class:light={!$themeMode}>
		<svelte:component this={data.content}/>
	</div>

</div>
