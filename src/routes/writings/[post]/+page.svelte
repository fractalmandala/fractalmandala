<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { filteredWritings } from '$lib/utils/localpulls'
	let pageItems:any
	let theme:any

	export let data

	onMount(async() => {
		theme = data.type
		pageItems = await filteredWritings(theme)
	})

</script>

<div class="zepad all single minH mob">
	<h2 class="tt-u">
		{data.title}
	</h2>
	<div class="rta-column newblog" class:dark={$themeMode} class:light={!$themeMode}>
		<svelte:component this={data.content}/>
	</div>
</div>
<div class="fixed-button"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<p class="tt-u"><strong>More in {data.type}</strong></p>
	{#if pageItems && pageItems.length > 0}
		{#each pageItems as item}
			<p>
				<a href={item.linkpath}>
					{item.meta.title}
				</a>
			</p>
		{/each}
	{/if}
</div>

<style lang="sass">

.fixed-button
	display: flex
	flex-direction: column
	position: fixed
	color: var(--midline)
	p strong
		color: var(--opposite)
		display: none
	p
		display: none
		margin: 0
		color: var(--grey)
		line-height: 1.2
		font-size: 14px
		&:hover
			a
				color: var(--gret)
	&:hover
		color: var(--gret)

.fixed-button.levelzero
	top: 80px
	right: 32px
	display: flex
	flex-direction: column
	row-gap: 8px
	width: 360px

.fixed-button.levelone, .fixed-button.leveltwo
	display: none

</style>

