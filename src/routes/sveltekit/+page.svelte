<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import { svelteTools, svelteLinks } from '$lib/utils/sveltekittools'
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
	<h6>
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
	<h6 class="p-top-32 bord-top">
		Bookmarked Links
	</h6>
	{#if svelteLinks && svelteLinks.length > 0}
		<div class="rta-grid grid2 stay2">
		{#each svelteLinks as item}
			<div class="rta-column null p-bot-16">
				<small>
					<a href="{item.url}" target="_blank" rel="noreferrer">
						{item.name}
					</a>
				</small>
			</div>
		{/each}
		</div>
	{/if}
</div>

