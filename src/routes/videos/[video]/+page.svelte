<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import Youtuber from '$lib/components/Youtuber.svelte'
	export let data

</script>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">{data.title}</h3>		
</div>
<div class="rta-column rowgap400 snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
		<Youtuber
			youTubeId={data.videoid}
		/>
	<p>{data.about}</p>
	<svelte:component this={data.content}/>
</div>
