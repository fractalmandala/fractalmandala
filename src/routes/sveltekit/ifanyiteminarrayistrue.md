---
title: Check if Any Boolean in Array is True
tags: utilities
---

For an array of booleans, say 'theseItems', we can create a new variable that is true is any item in the array is true, and false otherwise.

```js
$: anyItemTrue = theseItems.some(item => item)
```

The above assumes the following type of array, of say 10 items:

```js
let theseItems:[] = Array(10).fil(false)
```
