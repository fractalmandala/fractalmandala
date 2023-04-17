<script lang="ts">

	import { onMount } from 'svelte'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	export let data
	
	onMount(() => {
		Prism.highlightAll()
	})

</script>

<svelte:head>
<title>{data.title} - {data.type} - The Fractal Maṇḍala</title>
<meta name="description" content="{data.tags}"/>
</svelte:head>

<div class="pagecontainer x00">
	<div class="boxr">
		<div class="boxr nav">
			<a href="/notes">
				<img src="https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/08icons/chevleft.png" alt="left"/>
			</a>
			<a href="/notes">
				<img src="https://rnfvzaelmwbbvfbsppir.supabase.co/storage/v1/object/public/brhatwebsite/08icons/chevright.png" alt="right"/>
			</a>
		</div>
		<h2>
			{data.title}
		</h2>
		<div style="text-align: right; padding-left: 24px; color: #fe4a49; cursor: pointer; font-size: 12px">EDIT</div>

	</div>
	<div class="columnleft">
		<pre>
			{@html data.note}
		</pre>
	</div>
</div>

<style lang="sass">

.x00
	@media screen and (min-width: 1024px)
		padding-top: 128px
		padding-left: 10vw
		padding-right: 10vw
	h6
		margin: 0
		padding-left: 72px
		font-weight: 400
		text-transform: uppercase
		color: #474747
		padding-bottom: 8px
	.boxr
		align-items: center
		justify-content: flex-start
		padding-left: 0
		margin-left: 0
		@media screen and (max-width: 1023px)
			flex-direction: column

.columnleft
	display: flex
	flex-direction: column
	row-gap: 32px
	padding-top: 32px
	@media screen and (min-width: 1024px)
		width: 80%

h2
	text-transform: uppercase
	margin: 0
	font-family: 'Spline Sans', sans-serif
	padding-bottom: 12px
	font-weight: 600
	color: white
	font-size: 40px
	@media screen and (max-width: 1023px)
		font-size: 21px
		text-align: center
		margin-bottom: 16px

pre
	white-space: pre-line


.nav
	margin-right: 24px
	height: 28px
	padding-bottom: 8px
	gap: 12px
	img
		object-fit: contain
		height: 20px
		filter: saturate(0.01)
		opacity: 0.5
		cursor: pointer
		&:hover
			filter: saturate(1)
			opacity: 1
	@media screen and (max-width: 1023px)
		width: 100%
		flex-direction: row
		margin: 0

.nav.boxr
	@media screen and (max-width: 1023px)
		flex-direction: row
		justify-content: center

</style>