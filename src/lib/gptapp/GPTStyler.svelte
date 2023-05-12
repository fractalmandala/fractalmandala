<script lang="ts">

	import { onMount } from 'svelte'
	import visibilityMode from '$lib/stores/visibility'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	
	export let data:any = ''

	let regex = /```(\w+)\n([\s\S]*?)```/g;
	let match;
	let parsedData:any = [];

	while ((match = regex.exec(data)) !== null) {
  let language = match[1];  // this will contain the language, e.g. "javascript"
  let code = match[2];  // this will contain the code inside the code block

  parsedData.push({language, code});
	}


	onMount(() => {
		Prism.highlightAll();
	})

</script>

<pre class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<code class="language-markdown">
		{parsedData}<slot></slot>
	</code>
</pre>

<style lang="sass">

.dark
	border: 1px solid var(--borderline)
	code
		color: var(--green)

</style>