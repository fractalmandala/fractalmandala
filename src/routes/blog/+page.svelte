<script lang="ts">

	import { onMount } from 'svelte'
	import { blogPosts } from '$lib/utils/supabase'

	let posts:any

	onMount(async() => {
		posts = await blogPosts()
	})

</script>

<div class="pagecontainer">
	{#if posts && posts.length > 0}
		{#each posts as item}
			<h5>
				<a href="/blog/{item.id}" target="_self">
					{item.title}
				</a>
			</h5>
		{/each}
	{/if}
</div>