<script lang="ts">

	import { fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'

</script>


<div in:fly={{ delay: 400, duration: 500, x: 0, y: -800, easing: quintOut}} out:fly={{ delay: 0, duration: 350, x: 0, y: -800, easing: quintOut}}>
	<slot></slot>
</div>