<script>
	import { fly } from 'svelte/transition'
	import { expoOut, expoIn } from 'svelte/easing'
</script>

<div in:fly={{ delay: 250, duration: 200, x: 0, y: -600, easing: expoOut}} out:fly={{ delay: 0, duration: 200, x: 0, y: 600, easing: expoIn}}>
	<slot></slot>
</div>