<script>
	import { fly } from 'svelte/transition'
	import { quartOut, quartInOut } from 'svelte/easing'
</script>

<div in:fly={{ delay: 500, duration: 400, x: 0, y: 600, easing: quartInOut}} out:fly={{ delay: 0, duration: 450, x: 0, y: 600, easing: quartOut}}>
	<slot></slot>
</div>