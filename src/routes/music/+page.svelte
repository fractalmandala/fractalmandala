<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { tripSurfer } from '$lib/utils/supabase'
	import { allMusic } from '$lib/utils/localpulls'
	import Soundclouder1 from '$lib/components/Soundclouder.svelte'

	let thisTrack = Array(20).fill(false)
	let fake = false
	let tracks:any
	$: anyTrack = thisTrack.some(item => item)


	function toggleTrack(index:number) {
		thisTrack[index] = !thisTrack[index]
		for ( let i = 0; i < thisTrack.length; i ++ ) {
			if ( i !== index && thisTrack[i] === true ) {
				thisTrack[i] = false
			}
		}
	}

	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		tracks = await allMusic();
	})


</script>


<div
	class="solopage zepad y single minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<h1 class="tt-u">
		Music
	</h1>
	<p>
		I absolute love psytrance. I first discovered it in 2004, and when I first heard it my mind went- <i>"this is what I've wanted to hear all my life!"</i>
	</p>
	<p>In the years since I've dabbled in psytrance production, and as a result have invented the genre of poorly mastered, hastily finished amateur psytrance. You can find some of what I made on <a href="https://open.spotify.com/artist/7kyfFEEMs2Jg6FLF5gpC7O" target="_blank" rel="noreferrer">Spotify</a> or <a href="https://music.youtube.com/channel/UCZpvB_tpsx6Pj3g78uc0rtg" target="_blank" rel="noreferrer">YouTube</a> under the name Tripsurfer.</p>
	<p>Below I've added tracks uploaded to SoundCloud.</p>
	<div class="rta-column rowgap300 m-top-32">
		{#if tracks && tracks.length > 0}
			{#each tracks as item, i}
				<div class="rta-column">
					<Soundclouder1 soundcloudLink={item.meta.soundcloudLink}/>
				</div>
			{/each}
		{/if}
	</div>
</div>
