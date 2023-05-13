<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import { svelteTools } from '$lib/utils/sveltekittools'
	import PageTitle from '$lib/components/PageTitle.svelte'

	let title = 'Sveltekit Things'


</script>

<svelte:head>
	<PageTitle pageTitle={title}/>
</svelte:head>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		Sveltekit
	</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<h6 class="p-bot-16">
		A collection of Sveltekit tools, utilities and libraries that I like. 
	</h6>
	{#if svelteTools && svelteTools.length > 0}
		{#each svelteTools as item}
			<div class="rta-column null p-bot-16">
				<p>
					<a href="{item.url}" target="_blank" rel="noreferrer">
						{item.name}
					</a>
				</p>
				<small>{item.about}</small>
			</div>
		{/each}
	{/if}
</div>

