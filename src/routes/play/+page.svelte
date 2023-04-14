<script lang="ts">

	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'	
	import { chatsGPT } from '$lib/utils/supabase'
	import { slide } from 'svelte/transition'
	import BigCard from '$lib/components/BigCard.svelte'
	import Postal from '$lib/components/Postal.svelte'

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


<div class="standardbloggrid buffer bufferYt bufferYb">
	{#if chats && chats.length > 0}
		{#each chats as item, i}
			<Postal i={i} linkvar="/play/{item.id}">
				<h5 slot="postalone">{item.prompt.slice(0,50)}</h5>
				<p slot="postaltwo">{item.response.slice(0,200)}</p>
			</Postal>
		{/each}
	{/if}
</div>


<style lang="sass">

.standardbloggrid
	background-color: hsla(0,0%,4%,1)
	background-image: radial-gradient(at 23% 26%, hsla(103,91%,7%,0.59) 0px, transparent 50%), radial-gradient(at 89% 55%, hsla(135,89%,7%,0.59) 0px, transparent 50%)


</style>