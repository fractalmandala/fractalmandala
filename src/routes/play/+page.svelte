<script lang="ts">

	import { onMount } from 'svelte'
	import { entireProject } from '$lib/utils/localpulls'
	
	let entirety:any

	onMount(async() => {
		entirety = await entireProject()
	})

</script>

<div class="rta-column">
	<h1>Just a playground for building stuff...</h1>
	{#if entirety && entirety.length > 0}
		{#each entirety as item}
			<p>{item.meta.title}</p>
		{/each}
	{/if}
</div>