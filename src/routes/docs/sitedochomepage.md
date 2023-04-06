---
title: site doc - home
type: documentation
tags: bw2
---

#### site fonts
```sass
@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Sanskrit:ital@01&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap')
```

1. Tiro Devanagari Sanskrit for Hindi script rendering
2. Plus Jakarta Sans sitewide generic 
3. Cormorant Garamond for Dhiti

#### common layout loads
- component Analytics, for google analytics
- component List, for list of all nav links
- component Footer
- tippy:
```js
import tippy, { animateFill } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import 'tippy.js/dist/backdrop.css';
```
- mounts:
```js
onMount(async() => {
	tippy ('.expansion', {
		content: 'Click to Expand',
		arrow: false,
		theme: 'dark',
		animation: 'scale',
	})
})
```

#### all components used
##### home
- buttonarr
- buttonclassic
- mainbutton
- accordion
##### root layout
- analytics
- listoflinks
- footerglobal
##### rta
- logoridcurr
- sharesocial
##### bol reader
- dictionary
- mandalas
- suktas
##### dhiti
- tooltip
- dhitisearch
- dhitisharing
##### anveshi
- anveshi faq



#### typ
> small: .75
> cite: 0.875
> h6: 1.2
> p: .96rem
> h5: 1.5
> h4: 2
> h3: 4
> h2: 4
> h1: 7.6

on mobile:
> h6: 1.12
> h5: 1.2
> h4: 2
> h3: 2.7
> h2: 4
> h1: 3


### calibrated
```sass
.fluid
	min-height: 100vh
	padding-top: 80px
	small, p, h6, h5, h4, h3, h2, h1
		margin: 0 0 1rem 0
	small
		font-size: 12px
	@media screen and (max-width: 575px)
		h1
			font-size: 3.2rem !important
			font-weight: 800
			letter-spacing: -1px
		p
			font-size: 1rem
			margin: 0 0 1rem 0
		h6
			font-size: 1.24rem
			margin: 0 0 1rem 0
		h5
			font-size: 1.6rem
			margin: 0 0 1rem 0
		h4
			font-size: 2rem
			margin: 0 0 1rem 0
			font-weight: 800
		h3
			font-size: 2.7rem
			margin: 0 0 1rem 0
			font-weight: 800
		h2
			font-size: 2rem
			text-transform: uppercase
	@media screen and (max-width: 767px)
		p
			font-size: 1rem
		h6
			font-size: 1.24rem
		h5
			font-size: 1.75rem
		h4
			font-size: 2.2rem
			font-weight: 800
		h3
			font-size: 3rem
			font-weight: 800
		h2
			font-size: 2.1rem
			text-transform: uppercase
		h1
			font-size: 3.6rem
			font-weight: 800
	@media screen and (max-width: 1023px)
		p
			font-size: 1rem
		h6
			font-size: 1.3rem	
		h5
			font-size: 1.75rem
		h4
			font-size: 2.2rem
			font-weight: 800
		h3
			font-size: 3rem
			font-weight: 800
		h2
			font-size: 2.4rem
			text-transform: uppercase	
		h1
			font-size: 4rem
			font-weight: 800
	@media screen and (min-width: 1024px)
		p
			font-size: 1rem
		h6
			font-size: 1.25rem
		h5
			font-size: 1.6rem
		h4
			font-size: 2.2rem
			font-weight: 800
		h3
			font-size: 3rem
			font-weight: 800
		h2
			font-size: 2.7rem
			text-transform: uppercase
		h1
			font-size: 5rem
			font-weight: 800
```


