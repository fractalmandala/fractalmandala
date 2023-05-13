<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode } from '$lib/stores/globalstores'
	import { tripSurfer } from '$lib/utils/supabase'
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
		tracks = await tripSurfer();
	})


</script>


<div class="rta-column stickyboy solo" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		Music
	</h3>
</div>
<div class="rta-column snipstyle p-bot-64 solo" class:dark={$themeMode} class:light={!$themeMode}>
	<p>
		I absolute love psytrance. I first discovered it in 2004, and when I first heard it my mind went- <i>"this is what I've wanted to hear all my life!"</i>
	</p>
	<p>In the years since I've dabbled in psytrance production, and as a result have invented the genre of poorly mastered, hastily finished amateur psytrance. You can find some of what I made on <a href="https://open.spotify.com/artist/7kyfFEEMs2Jg6FLF5gpC7O" target="_blank" rel="noreferrer">Spotify</a> or <a href="https://music.youtube.com/channel/UCZpvB_tpsx6Pj3g78uc0rtg" target="_blank" rel="noreferrer">YouTube</a> under the name Tripsurfer.</p>
	<p>Below I've added tracks uploaded to SoundCloud.</p>
		<div class="rta-grid grid4 stay2 m-top-16 colgap100 rowgap100">
		{#if tracks && tracks.length > 0}
			{#each tracks as item, i}
				<div class="rta-column ingrid" on:click={() => toggleTrack(i)} on:keydown={fauxfake} class:opened={thisTrack[i]}>
					<Soundclouder1 soundcloudLink={item.tracklink}/>
				</div>
			{/each}
		{/if}
		</div>
</div>

<style lang="sass">

.ingrid
	height: 192px
	padding: 16px
	cursor: pointer
	border: 1px solid var(--borderline)
	border-radius: 6px

.ingrid.opened
	border: 1px solid var(--opposite)
	@media screen and (min-width: 1024px)
		grid-column: span 4
		grid-row: span 1
	@media screen and (max-width: 1023px)
		grid-column: span 2

</style>
