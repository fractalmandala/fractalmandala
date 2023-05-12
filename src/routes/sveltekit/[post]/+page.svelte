<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'	
	export let data

</script>

<div class="rta-column stickyboy" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<h3 class="bord-bot p-bot-16">
		{data.title}
	</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<svelte:component this={data.content}/>
</div>

