<script lang="ts">

	import { onMount } from 'svelte'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	export let data

	onMount(() => {
		Prism.highlightAll();
	})

</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<div class="pagecontainer">
	<h1>
		{data.title}
	</h1>
	<h6>{data.type} <span> | </span> {data.tags}</h6>
	<div class="boxc">
		<svelte:component this={data.content}/>
	</div>
</div>

<style lang="sass">

h1
	text-transform: uppercase
	margin: 0
	font-family: 'Martian Mono', monospace
	border-bottom: 1px solid #313131
	padding-bottom: 12px
	font-weight: 600

h6
	margin: 12px 0 16px 0
	text-transform: uppercase
	color: #474747
	font-size: 16px
	font-weight: 400

.boxc
	@media screen and (min-width: 1024px)
		width: 900px

</style>