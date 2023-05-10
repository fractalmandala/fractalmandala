<script lang="ts">

	import { onMount } from 'svelte'
	let searchQuery = ''
	let fake = false

	function fauxfake(){
		fake = !fake
	}

	
</script>

<form class="rta-row">
	<input type="text" bind:value={searchQuery} placeholder="Search..."/>
	<button type="submit" on:click={fauxfake} on:keydown={fauxfake}>Search</button>
</form>

	<div class="rta-column">

			<p>yes</p>

	</div>
