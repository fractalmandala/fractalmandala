<script lang="ts">

	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'	

	onMount(async() => {
		hljs.highlightAll()	
	})


</script>



<slot></slot>