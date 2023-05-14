---
title: Fix Document Not Defined Error
tags: errors
featured: false
---

Solve by wrapping the code inside the onMount function:

```js
import { onMount } from 'svelte'

onMount(() => {()
  //enter function here
})
```