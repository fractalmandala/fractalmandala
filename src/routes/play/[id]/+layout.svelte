<script lang="ts">

	import { chatswithGPT } from '$lib/utils/supabase'
	import { onMount } from 'svelte';
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	let chats:any

	onMount(async () => {
		hljs.highlightAll()
		chats = await chatswithGPT()
	});
</script>


<slot></slot>
