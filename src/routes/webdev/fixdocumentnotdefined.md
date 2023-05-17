---
title: Fix Document Not Defined Error
tag: errors
featured: false
type: sveltekit
id: 3
---

Solve by wrapping the code inside the onMount function:

```js
import { onMount } from 'svelte'

onMount(() => {()
  //enter function here
})
```