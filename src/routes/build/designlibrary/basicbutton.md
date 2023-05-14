---
title: Button Basic
tags: buttons
featured: false
about: Button Basic Variant with props to use inside parent
id: 1
---

<script lang="ts">

	import ComponentUnit from '$lib/deslib/ComponentUnit.svelte'
	import ButtonBasic from '$lib/deslib/ButtonBasic.svelte'
	let showCode = false
	
	function toggleCode(){
		showCode = !showCode
	}

</script>

<ComponentUnit>
	<ButtonBasic>Button</ButtonBasic>
</ComponentUnit>

<button class="secondbutton m-bot-16" on:click={toggleCode}>
	{#if showCode}
	Hide Code
	{:else}
	Show Code
	{/if}
</button>

{#if showCode}


```html
<button class="secondbutton">
	<slot></slot>
</button>
```

```sass
	color: var(--background)
	max-width: 160px
	background: #0bc160
	width: max-content
	border: 1px solid transparent
	padding: 2px 12px 0 12px
	border-radius: 3px
	transform-origin: center center
	transition: 0.08s
	letter-spacing: -0.12px
	cursor: pointer
	font-size: 14px
	text-transform: capitalize
	line-height: 1.75
	&:hover
		border: 1px solid #0bc160
		color: #0bc160
		background: var(--background)
```


{/if}
