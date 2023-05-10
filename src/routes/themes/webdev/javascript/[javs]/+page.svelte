<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'	
	export let data

</script>

<div class="rta-column bord-bot" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<h2>
		{data.title}
	</h2>
</div>
<div class="rta-column snipstyle p-top-64 p-bot-64" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<svelte:component this={data.content}/>
</div>

<style lang="sass">

</style>