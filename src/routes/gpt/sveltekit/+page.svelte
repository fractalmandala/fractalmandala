<script lang="ts">

	import { onMount } from 'svelte'
	import { gptSveltekit } from '$lib/utils/supabase'
	let titles:any = []

	onMount(async() => {
		titles = await gptSveltekit();
	})


</script>

<div class="rta-column stickyboy">
	<h3 class="bord-bot p-bot-16">
		Sveltekit
	</h3>
</div>
<div class="rta-grid grid2 p-bot-64 colgap400">
	{#if titles && titles.length > 0}
		{#each titles as item}
			<a href="/gpt/sveltekit/{item.indexing}" class="rta-column rowgap100 featurebox2 bord-bot p-bot-32 p-top-32">
				<h5>
					{item.title}
				</h5>
			</a>
		{/each}
	{/if}
</div>


