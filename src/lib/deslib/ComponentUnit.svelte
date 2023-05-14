<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'

</script>

<div class="outerunit rta-column rowgap100">
	<div class="innerunit">
		<slot></slot>
	</div>
</div>

<style lang="sass">

.innerunit
	border: 1px solid var(--borderline)

</style>