<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import ChevronRight from '$lib/icons/ChevFRight.svelte'
	import ChevronLeft from '$lib/icons/ChevFLeft.svelte'

	let rotated = true

</script>

<div class="rta-row rta-pagination">
	<button class="blank-button ">
		<ChevronLeft --thisFill="#0BC160"/>
	</button>
	<button class="blank-button">
		<ChevronRight --thisFill="#0BC160"/>
	</button>
</div>

<style lang="sass">

.rta-pagination
	.blank-button
		transform-origin: center center
		transition: 0.09s
		padding: 0
		&:hover
			transform: scale(0.9)

</style>