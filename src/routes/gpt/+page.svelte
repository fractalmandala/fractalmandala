<script lang="ts">


	import { themeMode } from '$lib/stores/globalstores'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'
	import InputText from '$lib/deslib/InputText.svelte'
	import GPTBox from '$lib/agents/GPTBox.svelte'
	let fake = false
	let showBox = false

	function toggleBox(){
		showBox = !showBox
	}

	function fauxfake(){
		fake = !fake
	}

</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>


<div class="rta-grid grid2 stdfix" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="rta-column mainone">
		<BreadCrumb/>
		<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
			<h3 class="bord-bot p-bot-16">
				GPTBoi, and Other Agents
			</h3>
		</div>
		<div class="rta-column snipstyle">
			<InputText/>
		</div>
		{#if showBox}
			<GPTBox></GPTBox>
		{/if}
	</div>
	<div class="rta-column rightone"></div>
		
</div>

