<script lang="ts">

	import { onMount } from 'svelte'
	import Header from '$lib/components/Header.svelte'
	import hljs from 'highlight.js'

	import '$lib/styles/highlight.css'

	onMount(async() => {
		hljs.highlightAll()
	})

</script>

<Header></Header>
<slot></slot>

