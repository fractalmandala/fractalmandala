<script lang="ts">

	import { onMount } from 'svelte'
	import Header from '$lib/components/Header.svelte'
	import { crossfade, fly, scale } from 'svelte/transition'
	import { allNotes, allCodes, allOthers, CodeCSS, CodeJS, CodeHTML, quillNotes, MidjourneyImages, MidjourneyTagged } from '$lib/utils/supabase'
	import { allDocs } from '$lib/utils/localpulls'
	
	let notes:any
	let codes:any
	let gens:any
	let ccss:any
	let cjs:any
	let chtml:any
	let docs:any
	let images:any
	let quills:any
	let faux:boolean = false
	let allimagesbool:boolean = true
	let imageTag:any = ''
	let taggedimages:any
	let lightbox:boolean[] = Array(400).fill(false)
	let imagetaginput:boolean[] = Array(1000).fill(false)
	let area:boolean[] = Array(9).fill(false)
	area[1] = true

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


	function toggleArea(index:number) {
		area[index] = !area[index]
		for ( let i = 0; i < area.length; i ++ ) {
			if ( i !== index && area[i] === true ) {
				area[i] = false
			}
		}
	}

	function toggleLightbox(index:number){
		lightbox[index] = !lightbox[index]
		for ( let i = 0; i < lightbox.length; i ++ ) {
			if ( i !== index && lightbox[i] === true ) {
				lightbox[i] = false
			}
		}
	}

	function toggleFaux(){
		faux = !faux
	}

	const [send, receive] = crossfade({
		duration: 300
	})

	onMount(async() => {
		notes = await allNotes()
		codes = await allCodes()
		gens = await allOthers()
		ccss = await CodeCSS()
		cjs = await CodeJS()
		chtml = await CodeHTML()
		docs = await allDocs()
		quills = await quillNotes()
		images = await MidjourneyImages()
		taggedimages = await MidjourneyTagged(imageTag)
	})
</script>

<Header>
		<h5 class="pgcnt" on:click={() => toggleArea(1)} on:keydown={toggleFaux} class:selectedarea={area[1]}>all</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(2)} on:keydown={toggleFaux}>code</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(3)} on:keydown={toggleFaux}>general</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(4)} on:keydown={toggleFaux}>html</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(5)} on:keydown={toggleFaux}>js</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(6)} on:keydown={toggleFaux}>styling</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(7)} on:keydown={toggleFaux}>docs</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(8)} on:keydown={toggleFaux}>quills</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(9)} on:keydown={toggleFaux}>gallery</h5>
</Header>
<div class="pagecontainer">
	{#if area[1]}
		{#if notes && notes.length > 0}
		<div class="gridof6">
			{#each notes as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 15, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<small style="text-transform: uppercase; color: #10D56C; font-size: 10px">{item.type}</small>
				<p style="padding-top: 4px">
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
		</div>
		{/if}
	{/if}
	{#if area[2]}
		{#if codes && codes.length > 0}
			<div class="gridof6">
			{#each codes as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[3]}
		{#if gens && gens.length > 0}
			<div class="gridof6">
			{#each gens as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[4]}
		{#if chtml && chtml.length > 0}
			<div class="gridof6">
			{#each chtml as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[5]}
		{#if cjs && cjs.length > 0}
			<div class="gridof6">
			{#each cjs as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[6]}
		{#if ccss && ccss.length > 0}
			<div class="gridof6">
			{#each ccss as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[7]}
		{#if docs && docs.length > 0}
			<div class="gridof6">
			{#each docs as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="{item.path}">
						{item.meta.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[8]}
		{#if quills && quills.length > 0}
			<div class="gridof6">
			{#each quills as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/blog/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[9]}
		<div class="imagefilters">
			<div on:click={toggleAllBool} on:keydown={toggleFaux}>All</div>
			<div on:click={() => setnewFilter('abstract')} on:keydown={toggleFaux}>Abstract</div>
			<div on:click={() => setnewFilter('culture aesthetic')} on:keydown={toggleFaux}>Culture Aesthetic</div>
			<div on:click={() => setnewFilter('dharmascapes')} on:keydown={toggleFaux}>Dharmascapes</div>
			<div on:click={() => setnewFilter('mandalas')} on:keydown={toggleFaux}>Maṇḍalas</div>
			<div on:click={() => setnewFilter('misc')} on:keydown={toggleFaux}>Misc</div>
			<div on:click={() => setnewFilter('sci-fi')} on:keydown={toggleFaux}>Sci-fi</div>
			<div on:click={() => setnewFilter('the once was')} on:keydown={toggleFaux}>The Once Was</div>
		</div>
		{#if allimagesbool}
		{#if images && images.length > 0}
			<div class="gridof8">
			{#each images as item, i}
				<div id="imagebox" class="boxc" in:fly={{ duration: 100, delay: i * 10, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
					<img src="{item.link}" alt={item.id} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}/>
					{#if lightbox[i]}
						<div class="modallightbox" in:scale={{ delay: 50}} out:scale={{ duration: 50, delay: 0}} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}>
							<img src="{item.link}" alt={item.id}/>
						</div>
					{/if}
				</div>
			{/each}
			</div>
		{/if}		
		{:else}
		{#if taggedimages && taggedimages.length > 0}
			<div class="gridof8">
			{#each taggedimages as item, i}
				<div id="imagebox" class="boxc" in:fly={{ duration: 100, delay: i * 10, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
					<img src="{item.link}" alt={item.id} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}/>
					{#if lightbox[i]}
						<div class="modallightbox" in:scale={{ delay: 50}} out:scale={{ duration: 50, delay: 0}} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}>
							<img src="{item.link}" alt={item.id}/>
						</div>
					{/if}
				</div>
			{/each}
			</div>
		{/if}
		{/if}
	{/if}
</div>

<style lang="sass">

.imagefilters
	display: flex
	flex-direction: row
	gap: 16px
	padding-left: 16px
	margin-bottom: 24px
	div
		text-transform: uppercase
		font-size: 14px
		color: #676767
		padding: 6px
		transition: var(--snap)
		border: 1px solid transparent
		cursor: pointer
		&:hover
			background: #070707
			color: white
			border: 1px solid white


#imagebox
	position: relative


p
	margin: 4px 0
	text-transform: capitalize
	color: white
	font-size: 1rem
	line-height: 1.1
	font-weight: 400
	&:hover
		color: #10D56C
	@media screen and (max-width: 1023px)
		font-size: 16px

small
	color: #474747

.pagecontainer
	min-width: 100vw

.gridof6
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	.boxc
		background: #171717
		cursor: pointer
		border-radius: 4px
		&:hover
			box-shadow: 3px 5px 8px rgba(0,0,0,0.7)
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . . . ."
		gap: 16px
		.boxc
			border: 1px solid #272727
			padding: 8px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px
		.boxc
			border: 1px solid #272727
			padding: 8px

.gridof8
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . . . . . ."
		gap: 16px 16px
		.boxc
			padding: 0
			transition: 0.35s ease
			&:hover
				padding: 0
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 8px 8px
		.boxc
			border: 1px solid #272727
			padding: 0px
			transition: 0.35s ease
			&:hover
				padding: 0

.boxc
	img
		object-fit: cover
		height: 100%
		width: 100%

#imagebox
	height: 144px
	@media screen and (max-width: 1023px)
		height: 88px

.modallightbox
	display: flex
	flex-direction: row
	justify-content: center
	align-items: center
	position: fixed
	backdrop-filter: blur(40px)
	top: 0
	padding-top: 128px
	padding-bottom: 128px
	left: 0
	z-index: 1000
	img
		object-fit: cover
		width: 70%
		height: 50%

</style>