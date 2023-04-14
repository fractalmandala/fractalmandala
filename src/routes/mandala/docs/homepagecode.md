---
title: home page code
type: documentation
tags: saved
---

```html
<script lang="ts">
//@ts-nocheck
import { onMount } from 'svelte'
import { fly } from 'svelte/transition'
import { AllDocs } from '$lib/utils/allfetches'
import { Codes, Bookmarks, Others, HTM, Generals, Documents } from '$lib/utils/supabasepulls'
let items:any
let allcodes:any
let allbookmarks:any
let allgenerals:any
let fulldocuments:any
let allhtmls:any
let allothers:any
export let openNote:any = []
let selectedCategory:boolean[] = [false, false, false, false, false, false]

function toggleCategory(index:number){
	selectedCategory[index] = !selectedCategory[index]
	for ( let i = 0; i < selectedCategory.length; i++ ) {
		if ( i !== index && selectedCategory[i] === true ) {
			selectedCategory[i] = false
		} 
	}
}


onMount(async() => {
	items = await AllDocs()
	allcodes = await Codes()
	fulldocuments = await Documents()
	allbookmarks = await Bookmarks()
	allgenerals = await Generals()
	allhtmls = await HTM()
	allothers = await Others()
})

</script>

<div class="addtoppad">
	{#if items && items.length > 0}
		{#each items as item}
			<div class="boxr boxrr1">
				<div class="boxc boxca text1">
					<h1><a href={item.path}>{item.meta.title}</a></h1>
				</div>
				<div class="boxc boxcb">
					<cite>{item.meta.tags}</cite>
					<caption>{item.meta.type}</caption>
				</div>
			</div>
		{/each}
	{/if}
</div>
<div class="secondleft">
	<div class="boxr categoryfilters">
		<div class="singlefilter" on:click={() => toggleCategory(1)} on:keydown={() => toggleCategory(1)}>All Codes</div>
		<div class="green"> | </div>
		<div class="singlefilter" on:click={() => toggleCategory(2)} on:keydown={() => toggleCategory(2)}>Javascript</div>
		<div class="green"> | </div>
		<div class="singlefilter" on:click={() => toggleCategory(3)} on:keydown={() => toggleCategory(3)}>CSS</div>
		<div class="green"> | </div>
		<div class="singlefilter" on:click={() => toggleCategory(4)} on:keydown={() => toggleCategory(4)}>SQL</div>
		<div class="green"> | </div>
		<div class="singlefilter" on:click={() => toggleCategory(5)} on:keydown={() => toggleCategory(5)}>HTML</div>
		<div class="green"> | </div>
		<div class="singlefilter" on:click={() => toggleCategory(6)} on:keydown={() => toggleCategory(6)}>Others</div>
	</div>
	{#if selectedCategory[1]}
		{#if allcodes && allcodes.length > 0}
		{#each allcodes as code, i}
		<div class="boxr boxrr2" in:fly={{ duration: 100, delay: i*50, x: -200, y: 0}} out:fly={{ duration: 50, delay: 0, x: 0, y: 32 }}>
		<h6>{code.lang}</h6>
		<h3><a href="/{code.id}">{code.title}</a></h3>
		</div>
		{/each}
		{/if}
	{/if}
	{#if selectedCategory[2]}
		{#if allgenerals && allgenerals.length > 0}
		{#each allgenerals as code, i}
		<div class="boxr boxrr2" in:fly={{ duration: 100, delay: i*50, x: -200, y: 0}} out:fly={{ duration: 50, delay: 0, x: 0, y: 32 }}>
		<h6>{code.lang}</h6>
		<h3><a href="/{code.id}">{code.title}</a></h3>
		</div>
		{/each}
		{/if}
	{/if}
	{#if selectedCategory[3]}
		{#if allbookmarks && allbookmarks.length > 0}
		{#each allbookmarks as code, i}
		<div class="boxr boxrr2" in:fly={{ duration: 100, delay: i*50, x: -200, y: 0}} out:fly={{ duration: 50, delay: 0, x: 0, y: 32 }}>
		<h6>{code.lang}</h6>
		<h3><a href="/{code.id}">{code.title}</a></h3>
		</div>
		{/each}
		{/if}
	{/if}
	{#if selectedCategory[4]}
		{#if fulldocuments && fulldocuments.length > 0}
		{#each fulldocuments as code, i}
		<div class="boxr boxrr2" in:fly={{ duration: 100, delay: i*50, x: -200, y: 0}} out:fly={{ duration: 50, delay: 0, x: 0, y: 32 }}>
		<h6>{code.lang}</h6>
		<h3><a href="/{code.id}">{code.title}</a></h3>
		</div>
		{/each}
		{/if}
	{/if}
	{#if selectedCategory[5]}
		{#if allhtmls && allhtmls.length > 0}
		{#each allhtmls as code, i}
		<div class="boxr boxrr2" in:fly={{ duration: 100, delay: i*50, x: -200, y: 0}} out:fly={{ duration: 50, delay: 0, x: 0, y: 32 }}>
		<h6>{code.lang}</h6>
		<h3><a href="/{code.id}">{code.title}</a></h3>
		</div>
		{/each}
		{/if}
	{/if}
	{#if selectedCategory[6]}
		{#if allothers && allothers.length > 0}
		{#each allothers as code, i}
		<div class="boxr boxrr2" in:fly={{ duration: 100, delay: i*50, x: -200, y: 0}} out:fly={{ duration: 50, delay: 0, x: 0, y: 32 }}>
		<h6>{code.lang}</h6>
		<h3><a href="/{code.id}">{code.title}</a></h3>
		</div>
		{/each}
		{/if}
	{/if}
</div>

<style lang="sass">

.addtoppad
	padding-top: 64px
	.boxrr1
		border-bottom: 1px solid #272727
		overflow-x: hidden
		align-items: center
		padding-left: 16px
		padding-right: 16px
		position: relative
		&::after
			position: absolute
			top: 0
			left: 0
			height: 1px
			width: 0
			content: ''
			background: var(--green)
			transition: all 0.2s var(--cubec)
		&:hover
			box-shadow: -6px -8px 6px #111111 inset
			&::after
				width: 100%
			.boxcb cite
				color: white
				transform: translateX(0)
			.boxcb caption
				transform: translateX(0)
		@media screen and (max-width: 1023px)
			padding: 4px 24px
		h1
			font-size: 2.4rem
			font-weight: 600
			text-transform: uppercase
			margin: 0
			transition: all 0.11s var(--cubea)
			color: #373737
			cursor: pointer
			letter-spacing: 2px
			&:hover
				color: white
				padding-left: 12px
			@media screen and (max-width: 1023px)
				font-size: 1.28rem
				letter-spacing: 0.3px
				font-weight: bold
				padding: 4px 0
		.boxca
			width: 90%
			@media screen and (max-width: 1023px)
				width: calc(80% - 16px)
		.boxcb
			width: 10%
			cite
				width: 100%
				font-size: 12px
				text-align: right
				margin: 0
				text-transform: uppercase
				font-style: normal
				color: #373737
				transform: translateX(128px)
				transition: all 0.08s var(--cubeb)
			caption
				width: 100%
				font-size: 14px
				text-align: right
				margin: 0
				font-style: normal
				color: var(--green)
				transform: translateX(128px)
				transition: all 0.08s var(--cubeb)
			@media screen and (max-width: 1023px)
				width: 20%
				cite
					font-size: 10px
				caption
					font-size: 12px





.secondleft 
	border-right: 1px solid #272727
	position: relative
	overflow: hidden
	padding-top: 24px
	&::after
		position: absolute
		top: 0
		right: 0
		width: 1px
		height: 2px
		content: ''
	.categoryfilters
		gap: 16px
		border-top: 1px solid #373737
		border-bottom: 1px solid #373737
		padding-top: 2px
		padding-bottom: 2px
		margin-bottom: 8px
		padding-left: 16px
		padding-right: 16px
		.singlefilter
			text-transform: uppercase
			color: #474747
			cursor: pointer
			padding-left: 6px
			padding-right: 6px
			&:hover
				color: white
				background: var(--green)
		@media screen and (max-width: 899px)
			display: flex
			flex-direction: column
			.green
				display: none
			margin-left: 0
			border: none

	.boxrr2
		padding-left: 32px
		align-items: center
		h3
			margin: 0
			text-transform: uppercase
			font-weight: 600
			font-size: 1rem
			padding: 1px 0
			color: #373737
			transition: all 0.07s var(--cubea)
		h6
			margin: 0
			text-transform: uppercase
			color: var(--green)
			font-size: 0.75rem
			transition: all 0.07s var(--cubea)
		&:hover
			h6
				color: #373737
			h3
				color: white
		@media screen and (max-width: 1023px)
			padding-left: 24px
			padding-right: 24px
			gap: 12px
			h3
				font-size: 16px
			h6
				font-size: 12px





</style>
```