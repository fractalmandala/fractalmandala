---
title: Simple Hovers in Sveltekit
tags: animations
---

Toggle and hover functions are quite simple in Sveltekit, and you can figure out a lot of transition/animation on the pages through these. 

Let's assume we have a *div* class named 'icon.' We want this to be invisible on default, but if user mouse hovers over another class named 'select,' then we want 'icon' to be visible.

To achieve this, we declare a boolean variable which can be toggled true/false, and then make it reactive to mouseenter and mouseleave:

```javascript
let showIcon:boolean = false

function toggleIcon(){
	showIcon = !showIcon
}
```

The above declares the boolean, and sets it to toggle between true and false with the function 'toggleIcon.' Now in the html part:

```html
<div class="select" on:mouseenter={toggleIcon} on:mouseleave={toggleIcon}>See Icon!</div>
{#if showIcon}
	<img src="iconlink" alt="icon"/>
{/if}
```

Two things are going on in the above code:

1. the function 'toggleIcon' is triggered once when mouse enters the area of div class 'select,' and once again when mouse leaves the class area. Since we originally set 'showIcon' to false at the top of script, the first trigger toggles it to true, and the second trigger toggles it back to false.

2. the icon itself is wrapped in an instance of `{#if}` which is bound to the variable 'showIcon.' This means that the content inside this wrapper will be visible on the DOM only if the variable showIcon is true, and not otherwise.

As a result of the above two, on mouse enter the variable turns true, and the icon will be visible. On mouse leave the variable will go back to false, and the icon will no longer be visible.

This is a very basic application, but you can extend this in different directions to think of many different enter, leave, transition animations. The same toggle can also be done on click, instead of on hover:

```html
<div class="select" on:click={toggleIcon}>See!</div>
```
