---
title: custom cursor codes for sveltekit
type: code
tags: animations
---

```html
<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import { spring, tweened } from "svelte/motion"
import '$lib/styles/dhitistyling.sass'
let showNumbers:boolean = false
let cursor:any
let isHovering:boolean = false
let mouseX = 0
let mouseY = 0

	const mouseCoords = spring({ x: 0, y: 0 })
	const scale = tweened(1, { duration: 100 })

	const onMouseMove = (event:any) => {
		$mouseCoords = { x: event.x, y: event.y }
	}

	const onMouseOver = (event:any) => {
		if (event.target instanceof HTMLButtonElement) {
			$scale = 2.5
		} else if (event.target instanceof HTMLParagraphElement) {
			$scale = 2
		} else {
			$scale = 1
		}
	}

	const onMouseOut = (event:any) => {
		$scale = 1
	}

</script>
<svelte:window 
	on:mousemove={onMouseMove} 
	on:mouseover={onMouseOver}
	on:mouseout={onMouseOut}
/>
<div class="containerxx">
	<div
		class="cursor"
		style:--x={`${$mouseCoords.x}px`}
		style:--y={`${$mouseCoords.y}px`}
		style:--scale={$scale}
	>
		<svg width="21" height="13" viewBox="0 0 21 13" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path id="topmostguy" d="M2.66687 12.4472L0 9.83513L10.0412 0L20.0256 9.83862L17.3519 12.4437L10.0337 5.23185L2.66687 12.4472Z" fill="#FE4A49"/>
		</svg>
	</div>
</div>
	<slot></slot>



<style>


body, * {
	cursor: none;
}

	.containerxx {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		cursor: none;
		
	}

	.cursor {
		position: absolute;
		top: 0;
		left: 0;

		width: 35px;
		height: 35px;
		z-index: 2000;
		transform: translate(-50%, -50%) translate(var(--x, 0px), var(--y, 0px)) scale(var(--scale, 1));
	}

</style>
```
