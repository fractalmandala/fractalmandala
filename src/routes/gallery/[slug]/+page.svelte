<script lang="ts">

	import { onMount } from 'svelte'
	import { rangeGallery } from '$lib/utils/supabase'

	let lower:number
	let topper:number
	let ranges:any

	onMount(async() => {
		lower = data.id - 5
		topper = data.id + 5
		ranges = await rangeGallery(lower,topper)
	})	

	export let data



</script>

<div class="rta-column">
	<img src={data.link} alt={data.slug}/>
	<div class="rta-row colgap200 xcenter-d p-top-8">
		{#if ranges && ranges.length > 0}
			{#each ranges as item}
				<p>
					<a href="/gallery/{item.slug}" class="greenlink">
						{#if data.slug === item.slug}
						<span class="is-grey">{item.slug}</span>
						{:else}
						{item.slug}
						{/if}
					</a>
				</p>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.rta-column
	padding-top: 56px
	img
		object-fit: cover
		object-position: center center
		width: 100%
		height: calc(100vh - 240px)

.is-grey
	color: var(--textone)

</style>