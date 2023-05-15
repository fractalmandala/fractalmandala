<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import { svelteTools, svelteLinks, svelteLearn } from '$lib/utils/sveltekittools'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'

	let title = 'Sveltekit Things'


</script>

<svelte:head>
	<PageTitle pageTitle={title}/>
</svelte:head>


	
		<h3 class="tt-u p-top-32-m">
			Sveltekit
		</h3>

	<div class="rta-column newblog p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
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
		<h6 class="p-top-32 bord-top">
		Learn Sveltekit
		</h6>
		{#if svelteLearn && svelteLearn.length > 0}
		<div class="rta-grid grid2 stay2">
		{#each svelteLearn as item}
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


