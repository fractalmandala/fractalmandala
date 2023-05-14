<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode } from '$lib/stores/globalstores'

	export let data

</script>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		{data.title}
	</h3>
</div>
<div class="rta-column snipstyle rta-design p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="fullwidth">
		<svelte:component this={data.content}/>
	</div>
</div>

<style lang="sass">

.rta-design
	text-align: center
	align-items: center
	.fullwidth
		width: 100%

</style>

