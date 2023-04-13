<script lang="ts">

	import { onMount } from 'svelte'
	import { allMandalas } from '$lib/utils/localpulls'
	import BigCard from '$lib/components/BigCard.svelte'

	let posts:any

	onMount(async() => {
		posts = await allMandalas()
	})

</script>

<slot></slot>
<div class="postsarea">
	{#if posts && posts.length > 0}
		{#each posts as item}
			<BigCard linkvar={item.path}>
				<h5 slot="title">{item.meta.title}</h5>
				<p slot="tags"><span style="text-transform: uppercase; color: #10C56D">{item.meta.type}</span> - {item.meta.tags}</p>
			</BigCard>
		{/each}
	{/if}
</div>

