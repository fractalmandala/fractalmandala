---
title: all code
tags: records
type: documentation
---

```html
<script lang="ts">
import supabase from '$lib/db'
import SidebarLinks from '$lib/components/SidebarLinks.svelte'
import { slide, fly } from 'svelte/transition'
import { quadOut } from 'svelte/easing'
import '$lib/styles/theme.sass'
import '$lib/styles/prism.css'
let canvaswide:boolean = false
let boxarrange:boolean = false
let category:boolean[] = [false, false, false, false, false]
let lang:boolean[] = [false, false, false, false]
export let allPosts:any

function toggleMenu(){
	canvaswide = !canvaswide
	boxarrange = !boxarrange
}

function toggleCategory(index:number) {
	category[index] = !category[index]
	for ( let i = 0; i < category.length; i++ ) {
		if ( i !== index && category[i] === true ) {
			category[i] = false
		}
	}
}

function toggleLang(index:number) {
	lang[index] = !lang[index]
	for ( let i = 0; i < lang.length; i++ ) {
		if ( i !== index && lang[i] === true ) {
			lang[i] = false
		}
	}
}

export async function allDocs() {
	const allPostFiles = import.meta.glob('/src/routes/docs/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)

			return {
				meta: metadata,
				path: postPath,
			}
		})
	)
	return allPosts
}

export async function notesGeneral(){
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('show',true)
		.eq('type','general')
		.order('id', {ascending: false})
		if (error) throw new Error(error.message)
		return data
}

export async function notesBookmark(){
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('show',true)
		.eq('type','bookmark')
		.order('id', {ascending: false})
		if (error) throw new Error(error.message)
		return data
}

export async function Html(){
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('show',true)
		.eq('type','code')
		.eq('lang','html')
		.order('id', {ascending: false})
		if (error) throw new Error(error.message)
		return data
}

export async function Css(){
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('show',true)
		.eq('type','code')
		.eq('lang','css')
		.order('id', {ascending: false})
		if (error) throw new Error(error.message)
		return data
}

export async function Js(){
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('show',true)
		.eq('type','code')
		.eq('lang','js')
		.order('id', {ascending: false})
		if (error) throw new Error(error.message)
		return data
}

export async function Sql(){
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('show',true)
		.eq('type','code')
		.eq('lang','postgresql')
		.order('id', {ascending: false})
		if (error) throw new Error(error.message)
		return data
}
</script>
<div class="totalboxforapp" class:boxarrange={boxarrange}>
  <div class="offcanvas" class:canvaswide={canvaswide} out:slide={{ duration: 400, easing: quadOut }}>
		{#if canvaswide}
		<div class="canvascloser">
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={toggleMenu} on:keydown={toggleMenu}>
				<path id="menuclose" d="M32 4.76596L27.234 0L16 11.234L4.76596 0L0 4.76596L11.234 16L0 27.234L4.76596 32L16 20.766L27.234 32L32 27.234L20.766 16L32 4.76596Z" fill="white"/>
			</svg>
		</div>
		<div class="canvaslinks">
			<h4 in:fly={{ duration: 200, delay: 400, x: 64, y: 0, easing: quadOut }} out:fly={{ duration: 50, delay: 0, x: 64, y: 0, easing: quadOut }}><a href="/gallery">Gallery</a></h4>
			<h4 in:fly={{ duration: 200, delay: 500, x: 64, y: 0, easing: quadOut }} out:fly={{ duration: 50, delay: 0, x: 64, y: 0, easing: quadOut }}><a href="/notepad">Notepad</a></h4>
			<h4 in:fly={{ duration: 200, delay: 600, x: 64, y: 0, easing: quadOut }} out:fly={{ duration: 50, delay: 0, x: 64, y: 0, easing: quadOut }}><a href="/playground">Playground</a></h4>
			<h4 in:fly={{ duration: 200, delay: 700, x: 64, y: 0, easing: quadOut }} out:fly={{ duration: 50, delay: 0, x: 64, y: 0, easing: quadOut }}><a href="/openai">OpenAI</a></h4>
			<h4 class="toggler" in:fly={{ duration: 200, delay: 900, x: 64, y: 0, easing: quadOut }} out:fly={{ duration: 50, delay: 0, x: 64, y: 0, easing: quadOut }} on:click={() => toggleCategory(1)} on:keydown={() => toggleCategory(1)}>Documents</h4>
			{#if category[1]}
				{#await allDocs()}
				<small>.</small>
				{:then data}
					{#each data as item, i}
					<p in:fly={{ duration: 100, delay: i*100, easing: quadOut }} out:fly on:click={toggleMenu} on:keydown={toggleMenu}><a href={item.path}>{item.meta.title}</a></p>
					{/each}
				{/await}
				{#await notesGeneral()}
				<small>.</small>
				{:then data}
					{#each data as item, i}
					<p in:fly={{ duration: 100, delay: i*100, easing: quadOut }} out:fly on:click={toggleMenu} on:keydown={toggleMenu}><a href="/{item.id}">{item.title}</a></p>
					{/each}
				{:catch error}
				<pre>{error}</pre>
				{/await}
			{/if}
			<h4 class="toggler" in:fly={{ duration: 200, delay: 1100, x: 64, y: 0, easing: quadOut }} out:fly={{ duration: 50, delay: 0, x: 64, y: 0, easing: quadOut }} on:click={() => toggleCategory(2)} on:keydown={() => toggleCategory(2)}>Bookmarks</h4>
			{#if category[2]}
				{#await notesBookmark()}
				<small>.</small>
				{:then data}
					{#each data as item, i}
					<p in:fly={{ duration: 100, delay: i*100, easing: quadOut }} out:fly on:click={toggleMenu} on:keydown={toggleMenu}><a href="/{item.id}">{item.title}</a></p>
					{/each}
				{:catch error}
				<pre>{error}</pre>
				{/await}	
			{/if}
			<h4 class="toggler" in:fly={{ duration: 200, delay: 1300, x: 64, y: 0, easing: quadOut }} out:fly={{ duration: 50, delay: 0, x: 64, y: 0, easing: quadOut }} on:click={() => toggleCategory(3)} on:keydown={() => toggleCategory(3)}>Code</h4>
			{#if category[3]}
				<p class="toggler" in:fly={{ duration: 100, delay: 0, easing: quadOut }} out:fly on:click={() => toggleLang(1)} on:keydown={() => toggleLang(1)}>HTML</p>
					{#if lang[1]}
						{#await Html()}
						<small>.</small>
						{:then data}
							{#each data as item, i}
							<h6 in:fly={{ duration: 100, delay: i*50, easing: quadOut }} out:fly on:click={toggleMenu} on:keydown={toggleMenu}><a href="/{item.id}">{item.title}</a></h6>
							{/each}
						{:catch error}
						<pre>{error}</pre>
						{/await}
					{/if}
				<p class="toggler" in:fly={{ duration: 100, delay: 100, easing: quadOut }} out:fly on:click={() => toggleLang(2)} on:keydown={() => toggleLang(2)}>CSS</p>
					{#if lang[2]}
						{#await Css()}
						<small>.</small>
						{:then data}
							{#each data as item, i}
							<h6 in:fly={{ duration: 100, delay: i*50, easing: quadOut }} out:fly on:click={toggleMenu} on:keydown={toggleMenu}><a href="/{item.id}">{item.title}</a></h6>
							{/each}
						{:catch error}
						<pre>{error}</pre>
						{/await}
					{/if}
				<p class="toggler" in:fly={{ duration: 100, delay: 200, easing: quadOut }} out:fly on:click={() => toggleLang(3)} on:keydown={() => toggleLang(3)}>JS</p>
					{#if lang[3]}
						{#await Js()}
						<small>.</small>
						{:then data}
							{#each data as item, i}
							<h6 in:fly={{ duration: 100, delay: i*50, easing: quadOut }} out:fly on:click={toggleMenu} on:keydown={toggleMenu}><a href="/{item.id}">{item.title}</a></h6>
							{/each}
						{:catch error}
						<pre>{error}</pre>
						{/await}
					{/if}
				<p class="toggler" in:fly={{ duration: 100, delay: 400, easing: quadOut }} out:fly on:click={() => toggleLang(4)} on:keydown={() => toggleLang(4)}>POSTGRESQL</p>
					{#if lang[4]}
						{#await Sql()}
						<small>.</small>
						{:then data}
							{#each data as item, i}
							<h6 in:fly={{ duration: 100, delay: i*50, easing: quadOut }} out:fly on:click={toggleMenu} on:keydown={toggleMenu}><a href="/{item.id}">{item.title}</a></h6>
							{/each}
						{:catch error}
						<pre>{error}</pre>
						{/await}
					{/if}
			{/if}
		</div>
		{/if}
	</div>
  <div class="mainpage">
    <div class="header">
      <div class="hlogo">
				<a href="/">FRACTAL MAṆḌALA</a>
			</div>
      <div class="hicons">
				<div class="iconmenu" on:click={toggleMenu} on:keydown={toggleMenu}>
					{#if canvaswide}
					<div class="hollow"></div>
					{:else}
					<svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.25 26.6667H36V32H20.25V26.6667Z" fill="white"/>
						<path d="M9 13.3333H36V18.6667H9V13.3333Z" fill="white"/>
						<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H36V5.33333H0V0Z" fill="white"/>
					</svg>
					{/if}
				</div>	
			</div>
    </div>
    <div class="pagearea">
      <div class="pageslot">
				<slot></slot>
			</div>
      <div class="pageside">
				<SidebarLinks></SidebarLinks>
			</div>
    </div>
  </div>
</div>

<style lang="sass">

.totalboxforapp 
	display: grid 
	grid-template-columns: 1fr 0
	grid-template-rows: 1fr 
	gap: 0px 0px 
	grid-auto-flow: row 
	grid-template-areas: "mainpage offcanvas" 
	box-sizing: border-box
	transition: all 0.32s var(--cubea)
.totalboxforapp.boxarrange
	transition: all 0.32s var(--cubea)
.offcanvas 
	box-sizing: border-box
	width: 0px
	transition: all 0.32s var(--cubea)
	display: flex
	flex-direction: column
	justify-content: flex-start
	z-index: 999
.canvascloser
	display: flex
	flex-direction: row
	height: 56px
	justify-content: flex-end
	align-items: center
	width: 100%
	svg
		object-fit: contain
		height: 20px
		path
			fill: #474747
		&:hover
			path
				fill: white
.mainpage 
	box-sizing: border-box
	display: grid 
	grid-template-columns: 1fr 
	grid-template-rows: 56px 1fr 
	gap: 0px 0px 
	grid-auto-flow: row 
	grid-template-areas: "header" "pagearea" 
	grid-area: mainpage 
	transition: all 0.32s var(--cubea)
.header 
	box-sizing: border-box
	display: grid 
	grid-template-columns: 1fr 1fr 
	grid-template-rows: 1fr 
	gap: 0px 0px 
	grid-auto-flow: row 
	grid-template-areas: "hlogo hicons" 
	grid-area: header 
	height: 56px 
	position: fixed
	top: 0
	width: 100%
	z-index: 990
.hlogo 
	box-sizing: border-box
	grid-area: hlogo 
	font-weight: bold
	color: white
	font-size: 20px
	transition: all 0.08s ease
	&:hover
		font-size: 18px
.hicons 
	box-sizing: border-box
	grid-area: hicons 
.pagearea 
	box-sizing: border-box
	display: grid 
	grid-template-columns: 1fr 320px 
	grid-template-rows: 1fr 
	gap: 0px 0px 
	grid-auto-flow: row 
	grid-template-areas: "pageslot pageside" 
	grid-area: pagearea 
.pageslot 
	box-sizing: border-box
	grid-area: pageslot 
	display: grid
	grid-auto-flow: row
	grid-template-columns: 1fr
	grid-template-rows: auto
	grid-template-areas: "."
.pageside 
	box-sizing: border-box
	grid-area: pageside 
	width: 320px 

.header 
	grid-area: header 
	display: grid
	grid-auto-flow: row
	box-sizing: border-box
	height: 56px
	background: linear-gradient(115.7deg, #10C56D 3.11%, #72CC50 49.78%, #53D66C 98.45%)
	grid-template-columns: 1fr 1fr
	grid-template-rows: 1fr
	align-items: center
	grid-template-areas: "hlogo hicons"
.hlogo
	grid-area: hlogo
.hicons
	grid-area: hicons
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-end
	height: 56px
	.iconmenu
		height: 56px
		width: 24px
		display: flex
		flex-direction: row
		align-items: center
		svg
			object-fit: contain
			height: 20px

.canvaslinks
	h4
		text-transform: uppercase
		font-weight: 600
		font-size: 1.6rem
		margin: 0 0 8px 0
		color: #474747
		text-align: right
		padding: 5px 0
		border-bottom: 1px solid #373737
		transition: all 0.2s var(--cubea)
		&:hover
			color: white
			border-bottom: 1px solid var(--hero)
			padding: 5px 8px 5px 0
	p
		color: #474747
		text-align: right
		padding-left: 32px
		margin: 0
		text-transform: capitalize
		padding-top: 4px
		padding-bottom: 4px
		font-size: 0.875rem
		&:hover
			color: var(--hero)
	h6
		color: #474747
		text-align: right
		font-weight: 400
		font-size: 0.75rem
		margin: 0
		text-transform: capitalize
		padding: 2px 0 2px 32px
		&:hover
			color: white

@media screen and (min-width: 1024px)
	.totalboxforapp
		width: 100vw
		overflow-x: hidden
	.totalboxforapp.boxarrange
		grid-template-columns: 1fr 320px
		grid-template-areas: "mainpage offcanvas"
	.offcanvas.canvaswide
		grid-area: offcanvas
		display: grid
		grid-auto-flow: row
		width: 320px
		background: var(--mainback)
		max-height: 100vh
		min-height: 100vh
		transition: all 0.32s var(--cubea)
		overflow-y: scroll
		grid-template-columns: 1fr
		grid-template-rows: 56px auto
		grid-template-areas: "canvascloser" "canvaslinks"
		align-items: start
		align-content: start
	.canvascloser
		grid-area: canvascloser
		padding-right: 32px
		height: 56px
		position: sticky
		top: 0
		right: 0
		background: var(--mainback)
	.canvaslinks
		grid-area: canvaslinks
		padding-right: 32px
		padding-top: 32px
	.header
		padding-left: 32px
		padding-right: 32px

@media screen and (max-width: 1023px)
	.totalboxforapp
		width: 100vw
		overflow-x: hidden
	.totalboxforapp.boxarrange
		grid-template-columns: 0px 1fr
		grid-template-areas: "mainpage offcanvas"
	.offcanvas.canvaswide
		grid-area: offcanvas
		display: grid
		grid-auto-flow: row
		width: 100vw
		background: var(--mainback)
		max-height: 100vh
		min-height: 100vh
		transition: all 0.32s var(--cubea)
		overflow-y: scroll
		grid-template-columns: 1fr
		grid-template-rows: 56px auto
		grid-template-areas: "canvascloser" "canvaslinks"
		align-items: start
		align-content: start
		position: fixed
		right: 0
		top: 0
	.canvascloser
		grid-area: canvascloser
		padding-right: 32px
		height: 56px
		position: sticky
		top: 0
		right: 0
		background: var(--mainback)
	.canvaslinks
		grid-area: canvaslinks
		padding: 32px
	.header
		padding-left: 16px
		padding-right: 16px
	.pagearea 
		box-sizing: border-box
		display: grid 
		grid-template-columns: 1fr
		grid-template-rows: 1fr 48px
		gap: 0px 0px 
		grid-auto-flow: row 
		grid-template-areas: "pageslot pageside" 
		grid-area: pagearea
	.pageside
		position: fixed
		bottom: 0
		width: 100%
		height: 48px
		background: linear-gradient(134.29deg, #101410 17.73%, #212121 65.85%)
</style>
```


```html
<script lang="ts">
import { onMount } from 'svelte'
import Prism from 'prismjs'

onMount(() => {
	const htmlBlocks = document.querySelectorAll('.is-code code.language-html');
  const cssBlocks = document.querySelectorAll('.is-code code.language-css');
  const jsBlocks = document.querySelectorAll('.is-code code.language-js');
  const sqlBlocks = document.querySelectorAll('.is-code code.language-postgresql');

  htmlBlocks.forEach((block) => Prism.highlightElement(block));
  cssBlocks.forEach((block) => Prism.highlightElement(block));
  jsBlocks.forEach((block) => Prism.highlightElement(block));
  sqlBlocks.forEach((block) => Prism.highlightElement(block));
})
export let data:any
</script>


	<div class="boxr">
	<small class="smalllabel"><a href="/type/{data.type}">{data.type}</a></small>
	<small class="smallsecond"><a href="/tags/{data.tags}">{data.tags}</a></small>
	</div>
	<h4>{data.title}</h4>
	<p>{data.note}</p>
	<div class="is-code">
		<h6>{data.lang}</h6>
		<pre>
			<code class="language-{data.lang}">{data.codesnippet}</code>
		</pre>
	</div>


<style lang="sass">

.boxr
	gap: 24px
	border-bottom: 1px solid #f1f1f1

h4
	font-size: 2.4rem
	margin: 0
	text-transform: uppercase


.smalllabel
	background: var(--hero)
	color: white
	font-size: 12px
	text-transform: uppercase
	padding: 2px

.smallsecond
	text-transform: uppercase
	font-size: 12px
	padding: 2px
	letter-spacing: 1px
	color: #b7b7b7

.smallsecond a
	color: #b7b7b7

.boxc 
	overflow-y: scroll
	.is-code
		overflow-y: scroll
		text-align: left
		padding: 16px 0 16px 16px
		h6
			text-transform: uppercase
			color: var(--hero)
		pre
			text-align: left
			margin: 0
			padding: 16px
			code
				text-align: left
				font-size: 12px
				padding: 0
				margin: 0

</style>
```

```sass

h5
	text-transform: uppercase
	font-size: 1.44rem
	margin: 0
.inside
	p
		text-transform: capitalize
		font-size: 16px
		color: var(--text)
		a
			color: var(--text)
			&:hover
				color: var(--hero)
	h6
		font-size: 0.75rem
		line-height: 1.4rem
		color: var(--text)
	small
		font-size: 0.75rem
		text-transform: uppercase

@media screen and (min-width: 1024px)
	.taggednotes
		display: grid
		grid-auto-flow: row
		grid-template-columns: 1fr 1fr 1fr
		grid-template-rows: auto
		grid-template-areas: ". ."
		gap: 16px 32px
	.outside
		height: calc(100vh - 96px)
		h5
			padding-bottom: 24px
	.inside p
		font-size: 14px
```
