<script lang="ts">


	import { themeMode } from '$lib/stores/globalstores'
	import GPTBox from '$lib/agents/GPTBox.svelte'
	let fake = false

	function fauxfake(){
		fake = !fake
	}

</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>


<div class="padl1 sides" class:dark={$themeMode} class:light={!$themeMode}>

	
			<GPTBox></GPTBox>
		
</div>

