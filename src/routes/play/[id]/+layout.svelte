<script lang="ts">

	import Header from '$lib/components/Header.svelte';
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

<Header />
<div class="radiationonly">
	<div class="pagecontainer x0">
		<div class="selectionsarea">
			{#if chats && chats.length > 0}
				{#each chats as item}
					<a href="/play/{item.id}" target="_self">
					<h6>{item.id} - {item.prompt.slice(0,50)}</h6>
					<p>{item.response.slice(0,50)}</p>
					</a>
				{/each}
			{/if}
		</div>
		<div class="gptarea">
			<div class="gptchatboard">
				<pre>
					<slot></slot>
				</pre>
			</div>
		</div>
	</div>
</div>

<style lang="sass">

pre
	font-family: 'Spline Sans', sans-serif
	overflow-x: auto
	box-sizing: border-box
	white-space: pre-line
	word-wrap: break-word
	word-break: break-word

.x0
	min-height: 100vh
	position: relative
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		padding-top: 0
		padding-bottom: 0
		grid-template-columns: 400px 1fr
		grid-template-areas: "selectionsarea gptarea"
		gap: 0 0px
		padding-left: 0
		padding-right: 0
		.selectionsarea
			padding-top: 2vw
			padding-left: 2vw
			padding-right: 2vw
			display: flex
			flex-direction: column
			row-gap: 0px
		.gptarea
			grid-area: gptarea
			padding-right: 10vw
			padding-left: 6vw
			padding-top: 64px
			padding-bottom: 64px

.selectionsarea
	p, h6
		font-family: 'Spline Sans', sans-serif
		margin: 0
	h6
		font-weight: 400
		color: #676767
		font-size: 12px
	a
		border-bottom: 1px solid #272727
		padding-bottom: 16px
		margin-top: 8px

.gptchatboard
	background: #171717
	padding: 24px
	border: 1px solid #272727
	border-radius: 4px


</style>