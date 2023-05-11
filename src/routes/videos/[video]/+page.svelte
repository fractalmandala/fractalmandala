<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'	
	import Youtuber from '$lib/components/Youtuber.svelte'
	export let data

</script>

<div class="rta-column" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<h3 class="bord-bot p-bot-16">{data.title}</h3>		
		<Youtuber
			youTubeId={data.videoid}
		/>
	<div class="rta-column m-top-32 p-top-16 bord-top">
		<p>{data.about}</p>
		<svelte:component this={data.content}/>
	</div>
</div>
