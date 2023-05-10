<script lang="ts">

	import { onMount } from 'svelte'
	import { themeJavascript } from '$lib/utils/localpulls'

	let theData:any

	onMount(async() => {
		theData = await themeJavascript()
	})	

</script>

<div class="rta-grid grid2 stdfix">
	<div class="rta-column mainone">
		<slot></slot>
	</div>
	<div class="rta-column rightone">
		<p><strong><a href="/themes/webdev/supabase">JAVASCRIPT HOME</a></strong></p>
		{#if theData && theData.length > 0}
			{#each theData as item}
				<p><a href="{item.linkpath}">{item.meta.title}</a></p>
			{/each}
		{/if}
	</div>
</div>