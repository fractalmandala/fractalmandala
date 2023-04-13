<script lang="ts">

	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	export let data

	onMount(async() => {
		hljs.highlightAll()
	})

</script>

<svelte:head>
<title>{data.title} - Fractal Maṇḍala Blog</title>
<meta name="description" content="{data.tags}"/>
</svelte:head>

<div class="mandpand">
	<div class="blogformatting">
		<h1>
			{data.title}
		</h1>
			<div class="blogpadding">
				<svelte:component this={data.content}/>
			</div>
	</div>
</div>

<style lang="sass">

.mandpand
	box-sizing: border-box
	padding-bottom: 0px
	@media screen and (min-width: 1024px)
		.blogpadding
			padding-right: 240px
	@media screen and (max-width: 1023px)
		.blogpadding
			padding-left: 16px
			padding-right: 16px

h1
	border-bottom: 1px solid #272727
	padding-bottom: 16px
	color: white
	font-size: 48px
	text-align: left
	@media screen and (max-width: 1023px)
		font-size: 36px

</style>