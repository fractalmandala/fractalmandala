<script lang="ts">

	import { onMount } from 'svelte'
	import TinyCard from '$lib/components/TinyCard.svelte'
	import { formentries } from '$lib/utils/supabase'

	let entries:any

	onMount(async() => {
		entries = await formentries()
	})
	
</script>



<div class="pagecontainer padl1">
	{#if entries && entries.length > 0}
		{#each entries as item, i}
			<TinyCard i={i} linkvar="/form">
				<p slot="title">
					{item.fullname}
				</p>
				<small class="tinycardcat" slot="category">
					{item.emailid}
				</small>
				<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="tags">
					{item.phone}
				</small>
			</TinyCard>
		{/each}
	{/if}
</div>

<style lang="sass">


.pagecontainer
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . . ."
		gap: 24px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "."
		gap: 16px

</style>