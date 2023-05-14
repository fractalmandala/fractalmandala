<script lang="ts">

	export let dimension = 16
	export let checked = false

</script>

<svg width="{dimension}" height="{dimension}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class:unchecked={!checked} class:checked={checked}>
	<path d="M12.6 24.5L4.43333 16.3333L6.63333 14.1333L12.6 20.1333L25.3333 7.4L27.5333 9.56667L12.6 24.5Z" fill="FFFFFF"/>
</svg>

<style lang="sass">

svg.unchecked
	path
		fill: transparent

svg.checked
	path
		fill: white

</style>

