<script lang="ts">
	
	import { onMount } from 'svelte'
	import { scale } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'
	import { allMandalas } from '$lib/utils/localpulls'
	let posts:any

	onMount(async() => {
		posts = await allMandalas()
	})

</script>

<div class="paint">
<slot></slot>
	<div class="newgrid buffer wider bufferYb x00">
		{#if posts && posts.length > 0}
		{#each posts as item, i}
			<div class="postal" in:scale={{delay: 50*i, easing: backOut }} out:scale={{ delay: 10*i, easing: backIn }}>
				<small>{item.meta.type}</small>
				<h5>
					<a href={item.path}>
						{item.meta.title}
					</a>
				</h5>
				<p>{item.meta.tags}</p>
			</div>
		{/each}
		{/if}
	</div>
</div>
