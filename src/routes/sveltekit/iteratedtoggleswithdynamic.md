---
title: Toggling in Iterated Dynamic Items
tags: utilities
featured: true
---

If we have an array of booleans, dynamic in count, we can set up a toggling function like so.

```js
<script>

let selectedCategory:boolean[] = Array(5).fill(false)
selectedCategory[1] = true

function toggleCategry(index:number) {
  selectedCategory[index] = !selectedCategory[index]
  for ( let i = 0; i < selectedCategory.length; i ++ ) {
    if ( i !== index && selectedCategory[i] === true ) {
      selectedCategory[i] = false
    }
	}
}

</script>
```