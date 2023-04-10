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
<div class="blogfoots">
	<div class="boxc">
		<a href="/forms" target="_self">
		Forms
		</a>
	</div>
	<div class="boxc">
		<a href="/pad" target="_self">
		Big Note
		</a>
	</div>
	<div class="boxc">
		<a href="/forms" target="_self">
		Playground
		</a>
	</div>
	<div class="boxc">
		<a href="/mandala" target="_self">
		Blog
		</a>
	</div>
</div>


<style lang="sass">

.blogfoots
	border-top: 1px solid #272727
	box-shadow: -4px -4px 12px #010101 inset
	height: 240px
	background-color: hsla(0,1%,2%,1)
	background-image: radial-gradient(at 100% 90%, hsla(141,64%,8%,1) 0px, transparent 50%), radial-gradient(at 3% 80%, hsla(120,74%,11%,0.1) 0px, transparent 50%)
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		padding: 0 21vw
		align-items: center
		.boxc
			text-align: center
			justify-content: center
			font-size: 16px
			color: #474747
			cursor: pointer
			height: max-content
			&:hover
				color: #10D56C

</style>