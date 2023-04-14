---
title: home page layout
type: documentation
tags: saved
---

```svelte
<script lang="ts">
import { onMount, onDestroy } from 'svelte'
import AllSearch from '$lib/components/AllSearch.svelte'
import Footer from '$lib/components/Footer.svelte'
import { fly } from 'svelte/transition'
import FMLogo from '$lib/components/FMLogo.svelte'
import { AllNotes } from '$lib/utils/supabasepulls'
import '$lib/styles/theme.sass'
import '$lib/styles/prism.css'
let navOpen:boolean = false
let noteItems:any
let showNotes:boolean = false
let showSearch:boolean = false
let input:any
let showOnMobile:boolean = false

function toggleOnMobile(){
	showOnMobile = !showOnMobile
}


function toggleSearch(){
	showSearch = !showSearch
}

function closeSearch(){
	if ( showSearch === true ) {
		showSearch = !showSearch
	}
}

function toggleNotes(){
	showNotes = !showNotes
}

onMount(async() => {
	noteItems = await AllNotes()
})

</script>




<div id="main" class="appcontainer">
	<div class="myheader">
		<div class="mands"><a href="/" target="_self">
			<FMLogo></FMLogo>
			<small>personal documentation and notes site</small>
		</a>
		</div>
		<div class="alllinks" class:showOnMobile={showOnMobile}>
				<div class="linkitem item0" on:click={toggleSearch} on:keydown={toggleSearch}>
					<p class="grey pointer" in:fly={{ duration: 100, delay: 0, x: 48, y: 0}}>Search <span class="green"> | </span></p>
				</div>
				<div class="linkitem item1" on:click={toggleOnMobile} on:keydown={toggleOnMobile}>
					<p class="grey" in:fly={{ duration: 100, delay: 0, x: 48, y: 0}}><a href="/gallery" target="_self">Gallery </a><span class="green"> | </span></p>
				</div>
				<div class="linkitem item2" on:click={toggleOnMobile} on:keydown={toggleOnMobile}>
					<p class="grey" in:fly={{ duration: 100, delay: 60, x: 80, y: 0}}><a href="/docs" target="_self">Documents </a><span class="green"> | </span></p>
				</div>
				<div class="linkitem item3" on:click={toggleOnMobile} on:keydown={toggleOnMobile}>
					<p class="grey" in:fly={{ duration: 100, delay: 120, x: 120, y: 0}}><a href="/playground" target="_self">Play </a><span class="green"> | </span></p>
				</div>
				<div class="linkitem item4" on:click={toggleOnMobile} on:keydown={toggleOnMobile}>
					<p class="grey" in:fly={{ duration: 100, delay: 180, x: 160, y: 0}}><a href="/openai" target="_self">OpenAI </a><span class="green"> | </span></p>
				</div>
				<div class="linkitem item5" on:click={toggleOnMobile} on:keydown={toggleOnMobile}>
					<p class="grey" in:fly={{ duration: 100, delay: 240, x: 200, y: 0}}><a href="/notepad" target="_self">Pad </a><span class="green"> | </span></p>
				</div>
				<div class="linkitem item6" on:mouseenter={toggleNotes} on:mouseleave={toggleNotes}>
					<p class="grey" in:fly={{ duration: 100, delay: 280, x: 0, y: 40}}>Notes </p>
						{#if showNotes}
							<div class="sublinks notelinks">
							{#if noteItems && noteItems.length > 0}
								{#each noteItems as note, i}
									<p in:fly={{ duration: 50, delay: i*40, x: 0, y: 12 }} out:fly={{ duration: 100, delay: 0, x: 0, y: 12}}><a href="/{note.id}">{note.title}</a></p>
								{/each}
							{/if}
							</div>
						{/if}
				</div>
				<div id="mobileicon" class="item7" class:showOnMobile={showOnMobile} on:click={toggleOnMobile} on:keydown={toggleOnMobile}>
					<svg width="16" height="24" viewBox="0 0 13 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path id="topmostguy" d="M12.4472 17.3588L9.83513 20.0256L-4.38917e-07 9.98439L9.83862 1.67361e-05L12.4437 2.67376L5.23185 9.99189L12.4472 17.3588Z" fill="#13BC62"/>
					</svg>
				</div>
		</div>
	</div>
	<div class="blackguy">
		<slot></slot>
	</div>
	<div class="footerarea">
		<Footer></Footer>
	</div>
</div>
{#if showSearch}
	<div class="offsearch">
		<AllSearch></AllSearch>
	</div>
{/if}


<style lang="sass">

.offsearch
	position: fixed
	top: 64px
	right: 0
	display: flex
	flex-direction: column
	width: 400px

.appcontainer
	display: grid
	grid-auto-flow: row
	grid-template-columns: 1fr
	grid-template-rows: 64px 1fr 64px
	grid-template-areas: "myheader" "blackguy" "footerarea"
	gap: 0px 0px
	min-height: 100vh
	box-sizing: border-box
	padding-left: 0
	padding-right: 0


.item7
	@media screen and (min-width: 900px)
		display: none
	@media screen and (max-width: 899px)
		display: flex
		grid-area: item7
		margin-bottom: 8px

.item7.showOnMobile
	svg
		@media screen and (max-width: 899px)
			transform: rotate(-90deg)

#mobileicon
	@media screen and (min-width: 900px)
		display: none
	@media screen and (max-width: 899px)
		display: flex

.item6
	display: flex
	flex-direction: column
	position: relative
	.notelinks
		display: flex
		flex-direction: column
		position: absolute
		top: 38px
		right: 0
		min-width: 320px
		text-align: right
		height: 400px
		overflow-y: scroll
		padding-right: 8px
		border-right: 1px solid #373737
		border-left: 1px solid #373737
		border-bottom: 1px solid #373737
		p
			font-size: 12px
			margin: 0
			background: #171717
			color: #474747
	.notelinks::-webkit-scrollbar
		width: 4px
	.notelinks::-webkit-scrollbar-track
		background: rgba(0,0,0,0)
	.notelinks::-webkit-scrollbar-thumb
		background: var(--green)
	@media screen and (max-width: 899px)
		grid-area: item6
		.notelinks
			min-height: 500px


.linksicon
	display: flex
	align-items: center
	justify-content: flex-end
	grid-area: linksicon

.mands a
	cursor: pointer

.myheader
	grid-area: myheader
	z-index: 900
	height: 64px
	width: 100%
	display: grid
	justify-content: space-between
	justify-items: stretch
	align-items: center
	padding: 0 16px
	position: relative
	grid-template-columns: 1fr 1fr
	grid-template-rows: auto
	grid-template-areas: "mands alllinks"
	position: fixed
	top: 0
	backdrop-filter: blur(6px)
	border-bottom: 1px solid #272727
	box-shadow: 5px 5px 4px #111111 inset, -5px -4px 6px #070707 inset
	transition: box-shadow 0.1s ease
	&::after
		content: ''
		position: absolute
		bottom: 0
		left: 0
		height: 1px
		width: 1px
		border-bottom: 1px solid var(--green)
		animation: borderlining 32s var(--cubee) infinite alternate
		box-shadow: 0 0 10px 10px var(--green)
		
.mands
	grid-area: mands
	display: grid
	width: 100%
	small
		font-size: 10px
		color: #373737
	&:hover
		small
			color: #10C56D

.alllinks
	grid-area: alllinks
	display: flex
	flex-dirction: row
	align-items: center
	justify-content: flex-end
	height: 56px
	width: 100%
	gap: 8px
	&:hover
		.svgicon svg
			transform: rotate(180deg)
			path
				fill: var(--green)
	p
		font-size: 14px
		font-weight: 500
		margin: 0 !important
		letter-spacing: 1px
		text-transform: uppercase
		&:hover
			color: var(--green)
	@media screen and (max-width: 899px)
		display: grid
		grid-auto-flow: row
		grid-template-columns: 1fr
		grid-template-rows: auto auto auto auto auto auto auto
		grid-template-areas: "item7" "item0" "item1" "item2" "item3" "item4" "item5" "item6"
		gap: 8px 0
		justify-items: end
		padding-top: 16px
		overflow-y: hidden
		transition: all 0.4s var(--boun)
		.item0
			grid-area: item0
		.item1
			grid-area: item1
		.item2
			grid-area: item2
		.item3
			grid-area: item3
		.item4
			grid-area: item4
		.item5
			grid-area: item5
	

.linkitem
	padding: 0
	width: max-content
	@media screen and (max-width: 899px)
		text-align: right
		p
			text-align: right
			font-size: 32px
		display: flex
		flex-direction: column
		align-items: flex-end
		align-content: flex-end
		width: 100%

.mands a
	display: flex
	flex-direction: column
	justify-self: flex-start
	justify-content: center
	text-align: left
	align-items: flex-start
	gap: 0px
	span
		color: #474747

@keyframes borderlining
	0%
		margin-left: 0
		width: 1px
		box-shadow: 0 0 0px 0px var(--green)
	50%
		margin-left: 100%
		width: 40px
		box-shadow: 0 0 120px 10px var(--green)
	100%
		margin-left: 0
		width: 1px
		box-shadow: 0 0 0px 0px var(--green)

#main
	transition: all 0.5s ease
	width: 100vw
	@media screen and (max-width: 767px)
	overflow-x: hidden


.blackguy
	grid-area: blackguy
	box-sizing: border-box
	padding-left: 0px
	padding-right: 0px

.footerarea
	grid-area: footerarea

</style>
```