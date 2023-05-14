<script lang="ts">

	import Check from '$lib/icons/CheckBox.svelte'
	let checked = false
	let fake = false

	function toggleCheck(){
		checked = !checked
	}
	export let dimension = '16px'
	

</script>

<label class="rta-checkbox" style="width: {dimension}; height: {dimension}" class:checked={checked} class:unchecked={!checked}>
  <input type="checkbox" checked={checked} on:click={toggleCheck}>
	<Check checked={checked}/>
</label>


<style lang="sass">

.rta-checkbox
	border-radius: 3px
	input
		position: absolute
		opacity: 0
		cursor: pointer
		height: 0
		width: 0
		
.rta-checkbox.unchecked
	border: 1px solid #0bc160

.rta-checkbox.checked
	background: #0bc160


.rta-checkbox
	display: block
	position: relative
	cursor: pointer
	font-size: 12px
	user-select: none

</style>