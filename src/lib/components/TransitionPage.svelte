<script>
	import { fly } from 'svelte/transition'
	import { expoOut, expoIn } from 'svelte/easing'
</script>

<div in:fly={{ delay: 450, duration: 500, x: 0, y: -600, easing: expoOut}} out:fly={{ delay: 0, duration: 400, x: 0, y: 600, easing: expoIn}}>
	<slot></slot>
</div>