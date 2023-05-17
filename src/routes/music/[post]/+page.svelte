<script lang="ts">

	import Soundclouder1 from '$lib/components/Soundclouder.svelte'
	export let data

	let pageTitle = data.title

</script>


<div class="rta-column height-40">
	<Soundclouder1 soundcloudLink={data.soundcloudLink}/>
</div>
<svelte:component this={data.content}/>


