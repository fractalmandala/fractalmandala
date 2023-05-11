<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'	
	export let data

</script>

<div class="rta-column" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<h3 class="bord-bot p-bot-16">{data.title}</h3>
	<div class="rta-column blogstyle" class:dark={$visibilityMode} class:light={!$visibilityMode}>
		<svelte:component this={data.content}/>
	</div>
</div>
