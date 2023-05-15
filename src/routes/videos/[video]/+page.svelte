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



	<Youtuber
			youTubeId={data.videoid}
		/>
	<p class="m-top-32">{data.about}</p>
	<svelte:component this={data.content}/>


