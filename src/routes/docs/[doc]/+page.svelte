<script lang="ts">

	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import Header from '$lib/components/Header.svelte'
	import DropDown from '$lib/components/DropDown.svelte'
	import TinyCard from '$lib/components/TinyCard.svelte'
	import TinyCard2 from '$lib/components/TinyCard.svelte'
	import TinyCard3 from '$lib/components/TinyCard.svelte'
	import TinyCard4 from '$lib/components/TinyCard.svelte'
	import TinyCard5 from '$lib/components/TinyCard.svelte'
	import TinyCard6 from '$lib/components/TinyCard.svelte'
	import TinyCard7 from '$lib/components/TinyCard.svelte'
	import { allNotes, allCodes, allOthers, CodeCSS, CodeJS, quillNotes, MidjourneyImages, MidjourneyTagged } from '$lib/utils/supabase'
	import { allDocs } from '$lib/utils/localpulls'
	import { CodeHTML, CodesFiltered } from '$lib/utils/supabase'
	export let data
	let codes:any
	let fake:boolean = false
	let codeContents:any
	let confirmDelete:boolean = false
	let theid:any
	let area:boolean[] = Array(9).fill(false)
	area[1] = true
	let allimagesbool:boolean = true
	let lightbox:boolean[] = Array(400).fill(false)
	let showdropdown:boolean = false

	function toggleDrop(){
		showdropdown = !showdropdown
	}

	function toggleArea(index:number) {
		area[index] = !area[index]
		for ( let i = 0; i < area.length; i ++ ) {
			if ( i !== index && area[i] === true ) {
				area[i] = false
			}
		}
	}

	function toggleAllBool(){
		allimagesbool = !allimagesbool
	}

	function setnewFilter(newFilter:any){
		imageTag = newFilter
		if ( allimagesbool === true ) {
			allimagesbool = false
		}
	}

	$: if (imageTag) {
			(async() => {
				taggedimages = await MidjourneyTagged(imageTag)
			})()
		}

	function toggleLightbox(index:number){
		lightbox[index] = !lightbox[index]
		for ( let i = 0; i < lightbox.length; i ++ ) {
			if ( i !== index && lightbox[i] === true ) {
				lightbox[i] = false
			}
		}
	}

	let notes:any
	let codes2:any
	let gens:any
	let ccss:any
	let cjs:any
	let chtml:any
	let docs:any
	let images:any
	let quills:any
	let imageTag:any = ''
	let taggedimages:any
	let lang:any

	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		confirmDelete = false
		codes = await CodesFiltered(lang)
		notes = await allNotes()
		codes2 = await allCodes()
		gens = await allOthers()
		ccss = await CodeCSS()
		cjs = await CodeJS()
		chtml = await CodeHTML()
		docs = await allDocs()
		quills = await quillNotes()
		images = await MidjourneyImages()
		taggedimages = await MidjourneyTagged(imageTag)
		hljs.highlightAll()
	})

</script>

<Header>
		<div class="pgcnt" on:click={() => toggleArea(1)} on:keydown={fauxfake} class:selectedarea={area[1]}>all</div>
		<div class="pgcnt" on:click={() => toggleArea(2)} on:keydown={fauxfake}>code</div>
		<div class="pgcnt" on:click={() => toggleArea(3)} on:keydown={fauxfake}>general</div>
		<div class="pgcnt" on:click={() => toggleArea(4)} on:keydown={fauxfake}>html</div>
		<div class="pgcnt" on:click={() => toggleArea(5)} on:keydown={fauxfake}>js</div>
		<div class="pgcnt" on:click={() => toggleArea(6)} on:keydown={fauxfake}>styling</div>
		<div class="pgcnt" on:click={() => toggleArea(7)} on:keydown={fauxfake}>docs</div>
		<div class="pgcnt" on:click={() => toggleArea(8)} on:keydown={fauxfake}>quills</div>
		<div class="pgcnt" on:click={() => toggleArea(9)} on:keydown={fauxfake} on:mouseenter={toggleDrop} on:mouseleave={toggleDrop}>gallery
			{#if showdropdown}
				<DropDown>
					<div class="dropdownitem" style="color: white" on:click={toggleAllBool} on:keydown={fauxfake}>All</div>
					<div class="dropdownitem" style="color: white" on:click={() => setnewFilter('abstract')} on:keydown={fauxfake}>Abstract</div>
					<div class="dropdownitem" style="color: white" on:click={() => setnewFilter('culture aesthetic')} on:keydown={fauxfake}>Culture Aesthetic</div>
					<div class="dropdownitem" style="color: white" on:click={() => setnewFilter('dharmascapes')} on:keydown={fauxfake}>Dharmascapes</div>
					<div class="dropdownitem" style="color: white" on:click={() => setnewFilter('mandalas')} on:keydown={fauxfake}>Maṇḍalas</div>
					<div class="dropdownitem" style="color: white" on:click={() => setnewFilter('misc')} on:keydown={fauxfake}>Misc</div>
					<div class="dropdownitem" style="color: white" on:click={() => setnewFilter('sci-fi')} on:keydown={fauxfake}>Sci-fi</div>
					<div class="dropdownitem" style="color: white" on:click={() => setnewFilter('the once was')} on:keydown={fauxfake}>The Once Was</div>
				</DropDown>
			{/if}
		</div>
</Header>
<div class="pagecontainer x00">
	<h1>
		{data.title}
	</h1>
	<div class="gridof2">
		<div class="columnleft">
			<h6>{data.type} <span> | </span> {data.tags}</h6>
			<div class="boxc" id="docsinside">
				<svelte:component this={data.content}/>
			</div>	
		</div>
		<div class="columnright" class:secondcolumnright={area[9]}>
			{#if area[1]}
			{#if notes && notes.length > 0}
				{#each notes as item, i}
					<TinyCard i={i}>
						<small class="tinycardcat" slot="category">{item.type}</small>
						<p slot="title">
							<a href="/notes/{item.id}" target="_self">
								{item.title}
							</a>
						</p>
							<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
								{#if item.lang && item.lang.length > 0}
									{item.lang}
								{/if}
							</small>	
						<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
					</TinyCard>
				{/each}
			{/if}
			{/if}
			{#if area[2]}
			{#if codes && codes.length > 0}
				{#each codes as item, i}
					<TinyCard2 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.id}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
					</TinyCard2>
				{/each}
			{/if}
			{/if}
			{#if area[3]}
			{#if gens && gens.length > 0}
				{#each gens as item, i}
					<TinyCard3 i={i}>
						<small class="tinycardcat" slot="category">{item.type}</small>
							<p slot="title">
								<a href="/notes/{item.id}" target="_self">
									{item.title}
								</a>
							</p>
								<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
									{#if item.lang && item.lang.length > 0}
										{item.lang}
									{/if}
								</small>	
						<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
					</TinyCard3>
				{/each}
			{/if}
			{/if}
			{#if area[4]}
			{#if chtml && chtml.length > 0}
			{#each chtml as item, i}
				<TinyCard4 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.id}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard4>			
			{/each}
			{/if}
			{/if}
			{#if area[5]}
			{#if cjs && cjs.length > 0}
			{#each cjs as item, i}
				<TinyCard5 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.id}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard5>
			{/each}
			{/if}
			{/if}
			{#if area[6]}
			{#if ccss && ccss.length > 0}
			{#each ccss as item, i}
				<TinyCard6 i={i}>
					<small class="tinycardcat" slot="category">{item.type}</small>
					<p slot="title">
						<a href="/notes/{item.id}" target="_self">
							{item.title}
						</a>
					</p>
						<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">
							{#if item.lang && item.lang.length > 0}
								{item.lang}
							{/if}
						</small>	
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
				</TinyCard6>
			{/each}
			{/if}
			{/if}
			{#if area[7]}
			{#if docs && docs.length > 0}
				{#each docs as item, i}
					<TinyCard7 i={i}>
					<small class="tinycardcat" slot="category">{item.meta.type}</small>
					<p slot="title">
						<a href="{item.path}" target="_self">
							{item.meta.title}
						</a>
					</p>
					<small style="font-size: 10px; color: #676767;" slot="tags">{item.meta.tags}</small>
					</TinyCard7>
				{/each}
			{/if}
			{/if}
			{#if area[9]}
				{#if allimagesbool}
				{#if images && images.length > 0}
				{#each images as item, i}
					<div id="imagebox" class="boxc">
					<img src="{item.link}" alt={item.id} on:click={() => toggleLightbox(i)} on:keydown={fauxfake}/>
					{#if lightbox[i]}
						<div class="modallightbox" on:click={() => toggleLightbox(i)} on:keydown={fauxfake}>
							<img src="{item.link}" alt={item.id}/>
						</div>
					{/if}
					</div>
				{/each}
				{/if}		
				{:else}
				{#if taggedimages && taggedimages.length > 0}
				{#each taggedimages as item, i}
				<div id="imagebox" class="boxc">
					<img src="{item.link}" alt={item.id} on:click={() => toggleLightbox(i)} on:keydown={fauxfake}/>
					{#if lightbox[i]}
						<div class="modallightbox" on:click={() => toggleLightbox(i)} on:keydown={fauxfake}>
							<img src="{item.link}" alt={item.id}/>
						</div>
					{/if}
				</div>
				{/each}
			{/if}
			{/if}
			{/if}		
		</div>
	</div>
</div>

<style lang="sass">

h1
	text-transform: uppercase
	margin: 0
	font-family: 'Spline Sans', sans-serif
	border-bottom: 1px solid #313131
	padding-bottom: 12px
	font-weight: 600

h6
	margin: 12px 0 16px 0
	text-transform: uppercase
	color: #10C56D
	font-size: 16px
	font-weight: 400


#imagebox
	img
		object-fit: cover
		height: 100%
		width: 100%

#imagebox
	height: 144px
	@media screen and (max-width: 1023px)
		height: 88px

.gridof2
	@media screen and (min-width: 1024px)
		grid-template-columns: 64% 36%
		grid-template-areas: "columnleft columnright"
		column-gap: 0
		padding-top: 32px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "columnleft" "columnright"
		row-gap: 0

.columnleft
	display: flex
	flex-direction: column
	row-gap: 32px
	background: #171717
	border: 1px solid #272727
	border-radius: 4px
	padding: 64px
	box-shadow: 3px 5px 18px rgba(0,0,0,0.7) inset, -3px -5px 12px rgba(0,0,0,0.3) inset
	@media screen and (max-width: 1023px)
		padding: 0 0 24px 0
		align-items: center

.columnright
	display: grid
	grid-template-row: auto
	grid-auto-flow: row
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: ". . ."
		gap: 16px 32px
		align-items: start
		align-content: start
		margin-left: 32px
		padding-top: 0
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: ". . ."
		gap: 16px
		padding-top: 32px

.columnright.secondcolumnright
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."

</style>