<script>

	import { themeMode } from '$lib/stores/globalstores'
	import { fly } from 'svelte/transition'
	import { quadOut, quadIn } from 'svelte/easing'

</script>

<div class="transistor" in:fly={{ delay: 500, duration: 400, y: 900, easing: quadOut}} out:fly={{ delay: 0, duration: 350, opacity: 0, x: 700, easing: quadIn}} class:dark={$themeMode} class:light={!$themeMode}>
	<slot></slot>
</div>

<style lang="sass">

.transistor
	box-sizing: border-box
	padding: 0

</style>