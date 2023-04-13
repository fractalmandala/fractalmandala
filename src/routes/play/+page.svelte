<script lang="ts">

	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'	
	import { chatsGPT } from '$lib/utils/supabase'
	import BigCard from '$lib/components/BigCard.svelte'

	let chats:any

	onMount(async() => {
		hljs.highlightAll()	
		chats = await chatsGPT()
	})


</script>

<svelte:head>
<title>broGPT and other Models | a playground with OpenAI, Sveltekit and Supabase</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Spline+Sans+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>


<div class="postsarea">
	{#if chats && chats.length > 0}
		{#each chats as item, i}
			<BigCard linkvar="/play/{item.id}">
				<h5 slot="title">{item.prompt.slice(0,50)}</h5>
			</BigCard>
		{/each}
	{/if}
</div>

<style lang="sass">

.postsarea
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	margin-top: 32px
	padding-bottom: 32px
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 16px 16px
		height: 100%
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px 16px
		padding-bottom: 0px
		height: 100%
		padding-left: 16px
		padding-right: 16px

</style>

