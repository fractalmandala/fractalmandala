<script lang="ts">

	import { onMount } from 'svelte'
	import { blogPosts } from '$lib/utils/supabase'

	let posts:any

	onMount(async() => {
		posts = await blogPosts()
	})

</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

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