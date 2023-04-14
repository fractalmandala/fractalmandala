---
title: iterated toggling for sections with parts separated
tags: sveltecode
type: code
---

say we have a part with 2 sections:
1. thumbnail image
2. lightbox image

we want the lightbox to open separately fixed on the page, if thumbnail is clicked.
the code:

```html
<script>
let lightboximage = null

function toggleLightbox(index){
	if (lightboximage === index) {
		lightboximage = null
	} else {
		lightboximage = index
	}
}
</script>

{#each normalimages as image}
	<div>
	<img src={image.link} on:click={() => toggleLightbox(i)} on:keydown={() => toggleLightbox(i)}>
	</div>
{/each}
{#if lightboximage  !== null}
<div class="lightbox">
</div>
{/if}
```



