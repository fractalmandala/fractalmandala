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

<style lang="sass">

.paint
	box-sizing: border-box
	background-color: hsla(0,1%,3%,1)
	background-image: radial-gradient(at 18% 82%, hsla(137,87%,7%,1) 0px, transparent 50%), radial-gradient(at 60% 0%, hsla(137,100%,12%,0.3) 0px, transparent 50%)

</style>