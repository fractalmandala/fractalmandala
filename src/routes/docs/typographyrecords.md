---
title: site typography
type: documentation
tags: typography
---

> .pad-a at 900px+
```sass
p
	font-size: 1rem
	letter-spacing: 0.2px
	margin: 0 0 12px 0
h6
	font-size: 1.2rem
	letter-spacing: 0.25px
	line-height: 1.2
	font-weight: 650
	margin: 0 0 12px 0
h5
	font-size: 1.84rem
	letter-spacing: 0px
	line-height: 1.28
	font-weight: 400
	margin: 0
h1
	font-size: 8rem
	letter-spacing: -3px
	margin: 0
```

> pad-a at 575px-
```sass

```

> the-title inside pad-a
```sass
h2
    font-weight: 600
    margin-top: 0
    text-transform: uppercase
    @media screen and (min-width: 900px)
        font-size: 4rem
        margin-bottom: 24px
    @media screen and (max-width: 899px)
        font-size: 3.2rem
        padding: 16px 0
        margin-bottom: 24px
    @media screen and (max-width: 767px)
        font-size: 3rem
        padding: 16px 0
        margin-bottom: 24px
    @media screen and (max-width: 575px)
        font-size: 2.4rem
        padding: 16px 0 0 0
        margin-bottom: 24px
```
