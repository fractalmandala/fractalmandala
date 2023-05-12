<script lang="ts">

	import { onMount } from 'svelte'
	import visibilityMode from '$lib/stores/visibility'
	import { fullGallery } from '$lib/utils/supabase'
	let images:any

	onMount(async() => {
		images = await fullGallery()
	})

</script>

<div class="rta-column stickyboy" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<h3 class="bord-bot p-bot-16">Midjourney Gallery</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<p>
		Midjourney is awesome! And anyone prancing about with the "AI art is not true art" has just spent way too long being in very high opinion of themselves, combined with an inner Luddite they may or may not recognize.
		One may well have a dislike for it, or simply prefer to not engage at all. But to declare on behalf of the rest of humanity that it isn't true art is frankly, ignorant and silly.
	</p>
	<p>
		Below is a sampling of the kind of explorations I want to make with Midjourney, and in the sidebar you can look at stuff I've created thus far.
	</p>
	<h5 class="near bord-top p-top-32">
		Nasadīya Across Space and Time
	</h5>
</div>