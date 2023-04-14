<script lang="ts">

	import { onMount } from 'svelte'
	import { allMandalas } from '$lib/utils/localpulls'
	import Postal from '$lib/components/Postal.svelte'

	let posts:any

	onMount(async() => {
		posts = await allMandalas()
	})

</script>


<div class="standardbloggrid buffer bufferYt bufferYb">
	{#if posts && posts.length > 0}
		{#each posts as item, i}
			<Postal i={i} linkvar={item.path}>
				<small slot="postalone">{item.meta.type}</small>
				<h5 slot="postaltwo">{item.meta.title}</h5>
				<p slot="postalthree">{item.meta.tags}</p>
			</Postal>
		{/each}
	{/if}
</div>

<style lang="sass">

.standardbloggrid
	background-color: hsla(0,0%,4%,1)
	background-image: radial-gradient(at 23% 26%, hsla(53,95%,22%,0.09) 0px, transparent 50%), radial-gradient(at 89% 55%, hsla(97,86%,9%,0.27) 0px, transparent 50%)

</style>