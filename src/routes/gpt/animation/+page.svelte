<script lang="ts">

	import { onMount } from 'svelte'
	import { gptAnimation } from '$lib/utils/supabase'
	import { themeMode } from '$lib/stores/globalstores'
	let titles:any = []

	onMount(async() => {
		titles = await gptAnimation();
	})

</script>


<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		Animation
	</h3>
</div>
<div class="rta-grid grid2 p-bot-64 colgap400">
	{#if titles && titles.length > 0}
		{#each titles as item}
			<a href="/gpt/animation/{item.indexing}" class="rta-column rowgap100 featurebox2 bord-bot p-bot-32 p-top-32">
				<h5>
					{item.title}
				</h5>
			</a>
		{/each}
	{/if}
</div>