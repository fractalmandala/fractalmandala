<script lang="ts">
//@ts-nocheck
	import { clickOutsideAction } from "svelte-legos";
	let hidden = false;
	function handleClickOutside() {
  	hidden = !hidden;
	}	

</script>


<div class="rta-modal modal"
	use:clickOutsideAction
	on:clickoutside={handleClickOutside}
	>
	<slot></slot>
</div>