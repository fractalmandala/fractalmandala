<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { slide } from 'svelte/transition'
	import { allVideos } from '$lib/utils/localpulls'
	import BoxStandard from '$lib/deslib/BoxStandard.svelte'
	import Youtuber from '$lib/components/Youtuber.svelte'
	let vids:any
	export let data

	let pageTitle = data.title

	onMount(async() => {
		vids = await allVideos();
	})	

</script>


<div class="solopage zepad all minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
>

	<div class="rta-column rowgap100 ycenter can-stick p-bot-16">
		<h4 class="tt-u">
			{data.title}
		</h4>
	</div>

	<div class="rta-column rowgap100 newblog bord-top p-top-32">
	<Youtuber
			youTubeId={data.videoid}
		/>
	<p class="m-top-32">{data.about}</p>
		<svelte:component this={data.content}/>
	</div>
</div>

<style lang="sass">


.levelzero
	.newblog
		width: 800px
		margin-left: 120px
	.can-stick
		padding-left: 120px

.levelone
	.newblog
		width: 800px
		margin-left: 0px
	.can-stick
		padding-left: 0px

</style>



