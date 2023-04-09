<script lang="ts">

	import { onMount } from 'svelte'
	import { crossfade, fly, scale } from 'svelte/transition'
	import { allNotes, allCodes, allOthers, CodeCSS, CodeJS, CodeHTML, quillNotes, MidjourneyImages, MidjourneyLight } from '$lib/utils/supabase'
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
	let lightboxx:any
	let lightbox:boolean[] = Array(400).fill(false)
	let imagenumber:number 
	let area:boolean[] = Array(9).fill(false)
	area[1] = true

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
	})
</script>
<div class="pagecontainer">
	<div class="boxr">
		<h5 on:click={() => toggleArea(1)} on:keydown={toggleFaux} class:selectedarea={area[1]}>all</h5>
		<h5 on:click={() => toggleArea(2)} on:keydown={toggleFaux}>code</h5>
		<h5 on:click={() => toggleArea(3)} on:keydown={toggleFaux}>general</h5>
		<h5 on:click={() => toggleArea(4)} on:keydown={toggleFaux}>html</h5>
		<h5 on:click={() => toggleArea(5)} on:keydown={toggleFaux}>js</h5>
		<h5 on:click={() => toggleArea(6)} on:keydown={toggleFaux}>styling</h5>
		<h5 on:click={() => toggleArea(7)} on:keydown={toggleFaux}>docs</h5>
		<h5 on:click={() => toggleArea(8)} on:keydown={toggleFaux}>quills</h5>
		<h5 on:click={() => toggleArea(9)} on:keydown={toggleFaux}>gallery</h5>
	</div>
	{#if area[1]}
		{#if notes && notes.length > 0}
		<div class="gridof6">
			{#each notes as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
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
	{#if area[2]}
		{#if codes && codes.length > 0}
			<div class="gridof6">
			{#each codes as item, i}
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
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
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
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
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
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
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
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
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
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
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
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
				<div class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
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
		{#if images && images.length > 0}
			<div class="gridof8">
			{#each images as item, i}
				<div id="imagebox" class="boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}} on:click={() => toggleLightbox(i)} on:keydown={toggleFaux}>
					<img src="{item.link}" alt={item.id}/>
					{#if lightbox[i]}
						<div class="modallightbox" in:scale={{ delay: 50}} out:scale={{ duration: 50, delay: 0}}>
							<img src="{item.link}" alt={item.id}/>
						</div>
					{/if}
				</div>
			{/each}
			</div>
		{/if}
	{/if}
</div>

<style lang="sass">

p
	margin: 4px 0
	text-transform: uppercase
	color: white
	font-size: 1.12rem
	line-height: 1.1
	font-weight: 400
	&:hover
		color: #10D56C

small
	color: #474747

.pagecontainer
	.boxr
		justify-content: flex-start
		border-bottom: 1px solid #272727
		margin-bottom: 32px
		padding-left: 16px
		padding-right: 16px
		row-gap: 32px
		h5
			font-weight: 400
			text-transform: uppercase
			font-size: 16px
			margin: 4px 0
			padding: 4px 8px
			cursor: pointer
			&:hover
				background: #10D56C
				color: white
		h5.selectedarea
			color: #10D56C
			&:hover
				background: #272727
				color: white
	@media screen and (max-width: 1023px)
		.boxr
			justify-content: center

.gridof6
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	.boxc
		background: #171717
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . . . ."
		gap: 16px 24px
		.boxc
			border: 1px solid #272727
			padding: 8px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px 24px
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
			border: 1px solid #272727
			padding: 8px
			transition: 0.35s ease
			&:hover
				padding: 0
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 8px 8px
		.boxc
			border: 1px solid #272727
			padding: 8px
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
		height: 120px

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