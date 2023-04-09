<script lang="ts">

	import { onMount, afterUpdate } from 'svelte'
	import Prism from 'prismjs'

	import '$lib/styles/prism.css'

	afterUpdate(async() => {
		Prism.highlightAll();
	})

	onMount(async() => {
		Prism.highlightAll();
	})

</script>

<slot></slot>
<div class="blogfoots"></div>


<style lang="sass">

.blogfoots
	border-top: 1px solid #272727
	height: 240px

</style>