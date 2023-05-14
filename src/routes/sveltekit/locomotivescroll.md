---
title: Locomotive Scroll in Sveltekit
tags: scrolls
featured: false
---

```js
import LocomotiveScrollProvider from 'svelte-locomotive-scroll'
```

```html
<LocomotiveScrollProvider
  options={
    {
      smooth: true,
      // ... all available Locomotive Scroll instance options 
    }
  }
  watch={
    [
      //..all the dependencies you want to watch to update the scroll.
      //  Basicaly, you would want to watch page/location changes
      //  I.e. in Sveltekit you would want to watch properties like `$page` imported from '$app/stores' (you may want to add more criterias if the instance should be update on locations with query parameters)
    ]
  }
>
    {/* ...your app */}
</LocomotiveScrollProvider>

// wrap pages:
<div data-scroll-section>
 {/* ...your page */}
</div>
```
