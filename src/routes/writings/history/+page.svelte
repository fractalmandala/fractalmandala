<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	let fullImage = false
	let fake = false

	function toggleImage(){
		fullImage = !fullImage
	}

	function fauxfake(){
		fake = !fake
	}


</script>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		History
	</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<p>
		My writings in history range from research-based academic essays to speculative or opinionated pieces. I deal primarily with the issue of Indo-European linguistic origins and dispersals, and with tracing the chronological trajectory of Indian civilizational consciousness, as can be gleaned from Paurāṇika records.
	</p>
	<p>
		For long-read academic works, look at the essays on the Dāśarajña and on Bhāratīya Wanderlust. For something more irreverent, take a look at 2 Theories and a Pivot.
	</p>
	<p>
		This chart below needs to be updated, and corrected at places, but it does show well the broad Paurāṇika chronology as I see it. Click on the image or button to expand complete chronology.
	</p>
	<img class="m-top-16" id="shortimage" src="/images/shortimage.webp" alt="short chronology"/>
	{#if fullImage}
		<img id="bigimage" src="/images/chronologychart.png" alt="full chronology"/>
	{/if}
	<button class="mainbutton m-top-16" on:click={toggleImage}>
		{#if fullImage}
		Close Image
		{:else}
		Expand Image
		{/if}
	</button>
</div>

<style lang="sass">

#bigimage
	object-fit: cover
	width: 100%

#shortimage
	object-fit: contain
	width: 100%

</style>

