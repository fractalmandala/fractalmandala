<script lang="ts">

	import { onMount } from 'svelte'
	import { formentries } from '$lib/utils/supabase'

	let entries:any

	onMount(async() => {
		entries = await formentries()
	})
	
</script>

<div class="pagecontainer">
	{#if entries && entries.length > 0}
		{#each entries as item}
			<div class="boxc">
				<h5>{item.fullname}</h5>
				<p>{item.emailid}</p>
				<p>{item.phone}</p>
			</div>
		{/each}
	{/if}
</div>

<style lang="sass">


.boxc
	padding-bottom: 16px
	border-bottom: 1px solid #272727
	margin-bottom: 16px
	h5, p
		margin: 0
	h5
		font-size: 20px
		font-weight: 400
	p
		font-size: 16px

</style>