---
title: lenis save
tags: lenis scroll
type: documentation
---

```html
		const lenis = new Lenis({
			duration: 2.6,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 1,
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