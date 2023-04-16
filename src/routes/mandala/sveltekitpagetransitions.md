---
title: Page Transitions in Sveltekit
type: post
tags: animations
---

Page transitions in Sveltekit are delightfully easy, and were one of the first things that got me loving the framework. The basic steps are simple:

1. Create a component that will wrap the part of your pages that will transition.
2. Set up a function that passes information to this wrapper each time the url changes, which is its signal to transition.
3. Wrap the page and we're done!

### Wrapper Component

Create a new Svelte component, I name mine PageTransitions.svelte. Use the following code:

```html
<script lang="ts">

  import { page } from '$app/stores';
	import { quintIn, quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition';

</script>


{#key $page.url}
	<div in:fly={{ delay: 200, duration: 600, y: -600, opacity: 0, easing: quintOut }} out:fly={{ duration: 200, delay: 0, y: -600, opacity: 0, easing: quintIn }}>
		<slot></slot>
	</div>
{/key}
```

I choose the fly transition, but you can try others from Sveltekit's in-built transitions like slide and scale. Experiment with the easings too, though with page transitions we don't want to get too crazy.

The slot in the middle is where the entire transitioning page will go, and we wrap this component in a `{#key}` function that acts as its trigger. What is page.url you may wonder? Let's get to that then.

### Key and URL

I've seen a few possible ways to do this on the web. The idea is to get information whenever the page url changes, and pass that information to the component to trigger transition. Svelte makes this very easy for us, because we can:

```javascript
import { page } from '$app/stores'
```

on to pages, layout files, and even components. So I load it directly to the component, and through it we use the reactive variable of $page.url. A reactive variable is dynamic, meaning it changes realtime- making it perfect for our needs. So we use this as the key when wrapping the component. 

Other ways to do this are to track the url on the layout file where we use the component, and pass the information there.

### Setting it Up

Now we import this component in our root layout file:

```javascript
import TransitionPage from '$lib/components/TransitionPage.svelte'
```

And use it in the markup:

```html
<nav></nav>
	<TransitionPage>
		<div class="pagedoublegrid">
			<slot></slot>
		</div>
	</TransitionPage>
<footer></footer>
```

As you can see, we can have elements before and after the wrapper, no worries!

That's it, fire it up and your transitions should be working. There's only one check to be mindful of. Notice the delay and durations in my transition:

```html
<div in:fly={{ delay: 250, duration: 600, y: -600, opacity: 0, easing: quintOut }} out:fly={{ duration: 200, delay: 0, y: -600, opacity: 0, easing: quintIn }}>
</div>
```

I make sure that there is a delay on the 'in' transition slightly higher than the duration on the 'out' transition, which has no delay. This ensures a page transitions out before the new one comes in. Be doubly mindful of this if you start playing with backIn and backOut easings!

There ya go.