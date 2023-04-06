---
title: temp site
---


sidenav
appbox

inside appbox:

headbox
pagebox in transition
footer

pagebox is simple box


```sass
#appbox
	min-height: 100vh
	transition: all 0.4s
	display: grid
	width: 100vw
	grid-auto-flow: row
	grid-template-columns: 1fr
	grid-template-rows: 72px auto auto
	gap: 0 0
	grid-template-areas: "." "pagebox" "footer"
	.footer
		grid-area: footer	
```

no pads upto layout
