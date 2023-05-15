<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	export let data

</script>

<div class="rta-column" class:dark={$themeMode} class:light={!$themeMode}>
	<h2 class="tt-u p-top-32-m">
		{data.title}
	</h2>
</div>
<div class="rta-column newblog p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<svelte:component this={data.content}/>
</div>

<style lang="sass">

.newblog
	white-space: pre-line
	word-wrap: break-word
	word-break: break-word

</style>

