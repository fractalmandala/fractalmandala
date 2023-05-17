<script lang="ts">

	import { onMount } from 'svelte'
	import Animations from 'textify.js'

	onMount(() => {
		const { Textify } = Animations;
		new Textify({
			duration: 900,
			stagger: 40,
			fade: false,
			top: false,
			reveal: true,
			threshold: 0.8,
			once: false	
		})
	})

</script>

<p data-textify>
	<slot></slot>
</p>