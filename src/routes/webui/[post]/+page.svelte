<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import PageTitle from '$lib/components/PageTitle.svelte'
	export let data

</script>

<PageTitle pageTitle={data.title}/>


	<h3 class="tt-u p-top-32-m">
		{data.title}
	</h3>

<div class="rta-column newblog p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<svelte:component this={data.content}/>
</div>

