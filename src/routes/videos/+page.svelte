<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { allVideos } from '$lib/utils/localpulls'
	import Youtuber from '$lib/components/Youtuber.svelte'

	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	let fake = false
	let expandRightbar = false

	let vids:any

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}
	
	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		vids = await allVideos();
	})	

</script>



<div
	class="solopage zepad all minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>

	<div class="rta-column ycenter can-stick">
		<h3 class="tt-u">
			Videos
		</h3>
	</div>
	<div class="rta-column rowgap100 soloblog newblog bord-top p-top-32">

	<p>
		For a very, very brief period in life, I ran a YouTube channel by the name of Project Bhārata. This was also a period where I went on other channels and got to ramble on about stuff in my head. Here you can suffer through them, if you like :)
	</p>
	<div class="rta-column rowgap600 m-top-32">
			{#if vids && vids.length > 0}
				{#each vids as item, i}
				<div class="rta-row colgap300">
					<div class="rta-image height-30 w32">
						<Youtuber
							youTubeId={item.meta.videoid}
						/>
					</div>
					<div class="rta-column w64">
						<h4>{item.meta.title}</h4>
						<p>{item.meta.about}</p>
						<a href={item.linkpath}>
							<button class="secondbutton">
							Visit Page
							</button>
						</div>
					</div>		
				{/each}
			{/if}
	</div>
	</div>
</div>

<style lang="sass">

h4
	letter-spacing: -1px
	line-height: 1.12

</style>


