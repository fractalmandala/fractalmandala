<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import PageTitle from '$lib/components/PageTitle.svelte'
	let pageTitle = 'Gallery'

</script>

<svelte:head>
	<PageTitle pageTitle={pageTitle}/>
</svelte:head>

<div class="rta-column text stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">Videos</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<p>
		For a very, very brief period in life, I ran a YouTube channel by the name of Project Bhārata. This was also a period where I went on other channels and got to ramble on about stuff in my head. Here you can suffer through them, if you like :)
	</p>
</div>