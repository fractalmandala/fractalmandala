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
				<h5 slot="title">{item.meta.title}</h5>
				<p slot="tags"><span style="text-transform: uppercase; color: #10C56D">{item.meta.type}</span> - {item.meta.tags}</p>
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
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: ". . ."
		gap: 16px 16px
		height: 160px
		padding-right: 120px
		border-top: 1px solid white
		padding-top: 32px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px 16px
		height: 320px
		padding-bottom: 32px


</style>