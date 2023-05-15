---
title: Scroll on Mouse Move
tags: scrolls
featured: false
type: sveltekit
---

```html
<script>
  let scrollX = 0;
  let scrollY = 0;

  function handleMouseMove(event) {
    // Get the amount of mouse movement
    const deltaX = event.movementX;
    const deltaY = event.movementY;

    // Update the scroll position based on the mouse movement
    scrollX += deltaX;
    scrollY += deltaY;

    // Set the new scroll position
    window.scrollTo(scrollX, scrollY);
  }
</script>

<div on:mousemove={handleMouseMove}>
  <!-- Your content goes here -->
</div>
```

