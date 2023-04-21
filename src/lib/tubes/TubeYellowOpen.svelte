<script lang="ts">

	import { onMount, afterUpdate } from 'svelte'
	import '$lib/styles/prism.css'
	import '$lib/styles/prismtoolbar.css'
	import Prism from 'prismjs'

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

<div class="tube yellow opentab">

	<div class="boxr">
		<small>
			<slot name="lang"></slot>
		</small>
		<slot name="button">
		</slot>
	</div>
	<h5>
		<slot name="title"></slot>
	</h5>

		<slot name="tags"></slot>

	<h6>
		<slot name="note"></slot>
	</h6>
	<pre class="language" data-src="plugins/toolbar/prism-toolbar.js">
		<slot name="code"></slot>
	</pre>

</div>

<style lang="sass">

	.opentab
		background: #171717
		.boxr
			justify-content: space-between
			align-items: center

</style>