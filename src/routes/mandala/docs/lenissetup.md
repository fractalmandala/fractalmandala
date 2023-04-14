---
title: lenis
tags: scroll
type: documentation
---

easing
```javascript
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
```

```javascript
import { onMount } from 'svelte';
import Lenis from '@studio-freight/lenis'
onMount(async() => {
const lenis = new Lenis({
		duration: 1.2,
		direction: 'vertical',
		gestureDirection: 'vertical',
		lerp: 0.6,
		smooth: true,
		mouseMultiplier: 0.7,
		smoothTouch: false,
		touchMultiplier: 1,
		infinite: false,
	})

function raf(time: any){
	lenis.raf(time)
	requestAnimationFrame(raf)
}
requestAnimationFrame(raf)	
})
```
