---
title: Toggles in Sveltekit
tags: svelte functions
---

In this guide I'll walk you through the basics of toggling categories in Sveltekit. First, let's take a look at the code snippet provided:

```javascript
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
```

This code creates an array called 'selectedCategory' with a length of 5 and fills it with 'false' values. It then sets the second element of the array ('selectedCategory[1]') to 'true'.

The 'toggleCategory' function takes an index as an argument and toggles the value of the corresponding element in the 'selectedCategory' array. It then loops through the array and sets all other elements to 'false', ensuring that only one category can be selected at a time.

To use this code in your own project, simply call the 'toggleCategory' function with the index of the category you want to toggle. For example, 'toggleCategory(2)' would toggle the second category in the array.

Now, if you're thinking "why did he spell 'category' wrong in the function name?" then congratulations, you're paying attention.

In conclusion, toggling categories is a simple but useful technique that can be used in a variety of projects. With the code snippet provided, you'll be toggling categories like a pro in no time.