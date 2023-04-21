<script lang="ts">

	import { onMount, afterUpdate } from 'svelte'
	import GridWork from '$lib/components/GridWork.svelte'
	import '$lib/styles/prism.css'
	import '$lib/styles/prismtoolbar.css'
	import Prism from 'prismjs'
	export let data

	onMount(() => {
		Prism.highlightAll()
	})

	afterUpdate(() => {
		Prism.highlightAll()
	})

</script>

<svelte:head>
	<script src="./src/lib/utils/prismextras.ts"></script>
</svelte:head>


<div class="boxc genericpad">
	<small>{data.type}</small>
	<h2>{data.title}</h2>
	<div class="boxr">
		<cite>{data.lang} | {data.tags}</cite>
	</div>
	{#if data.note && data.note.length > 0}
		<div class="boxc note">
			{data.note}
		</div>
	{/if}
	<pre class="code language-{data.lang}" data-src="plugins/toolbar/prism-toolbar.js">
		<code>
			{data.codesnippet}
		</code>
	</pre>
</div>


<style lang="sass">

	small
		color: #10D56C
	h2
		text-transform: capitalize
	.note
		margin-top: 64px
	.code
		padding: 0
		background: #171717
		margin-top: 64px
		padding: 24px

	.boxr
		border-bottom: 1px solid #272727
		padding-bottom: 16px

</style>
