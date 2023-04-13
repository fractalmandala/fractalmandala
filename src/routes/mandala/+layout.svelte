<script lang="ts">

	import { onMount } from 'svelte'
	import { allMandalas } from '$lib/utils/localpulls'
	import BigCard from '$lib/components/BigCard.svelte'

	let posts:any

	onMount(async() => {
		posts = await allMandalas()
	})

</script>

<slot></slot>
<div class="postsarea">
	{#if posts && posts.length > 0}
		{#each posts as item}
			<BigCard linkvar={item.path}>
				<small slot="category">{item.meta.type}</small>
				<h5 slot="title">{item.meta.title}</h5>
				<p slot="tags">{item.meta.tags}</p>
			</BigCard>
		{/each}
	{/if}
</div>

<style lang="sass">

.postsarea
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	margin-top: 32px
	padding-bottom: 32px
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 16px 16px
		height: 100%
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px 16px
		padding-bottom: 0px
		height: 100%
		padding-left: 16px
		padding-right: 16px

</style>