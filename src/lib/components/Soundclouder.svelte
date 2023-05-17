<script lang="ts">

	import { breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import GeneralObserver from '$lib/components/GeneralObserver.svelte'
	let iW: number

	$: if ( iW <= 786 ) {
		height = '100px'
	}	 else {
		height = '200px'
	}

	export let soundcloudLink: string = ''
	export let width: string = '100%'
	export let height: string = '200px'
	export let showVisual: boolean = true
	export let disable_observer: boolean = false
	export let iframe_styles: string = ''
</script>

<svelte:window bind:innerWidth={iW}/>

<GeneralObserver {disable_observer}>
	<iframe
		{width}
		{height}
		title={`soundcloud-${soundcloudLink}`}
		scrolling="false"
		frameborder="0"
		allow="autoplay"
		src="https://w.soundcloud.com/player/?url={soundcloudLink}&visual={showVisual}"
		style={iframe_styles}
	/>
</GeneralObserver>