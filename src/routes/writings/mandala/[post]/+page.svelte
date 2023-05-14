<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'

	export let data

</script>

<div class="rta-column rowgap300 stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		{data.title}
	</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<svelte:component this={data.content}/>
</div>

