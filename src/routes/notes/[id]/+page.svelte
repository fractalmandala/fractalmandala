<script lang="ts">
	
	import { onMount } from 'svelte'
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
	import { alertAction } from 'svelte-legos'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import { CodeHTML, CodesFiltered } from '$lib/utils/supabase'
	export let data
	let lang:any = data.lang
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


	function fauxfake(){
		fake = !fake
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



	onMount(async() => {
		confirmDelete = false
		lang = data.lang
		codes = await CodesFiltered(lang)
		theid = data.id
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
	<div class="metaoptions">
		<div class="metadelete"
			use:alertAction={{
					title: 'This will delete the note!',
					description: 'Are you sure? Click OK to Delete.',
				}}
			>
			<svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path id="gowhite" d="M8.43243 8.43235H22.7027V16.2161H8.43243V8.43235Z" fill="#fe4a49"/>
				<path id="gored" d="M8.21598 0.407227H26.9814C27.3254 0.407227 27.6554 0.543906 27.8987 0.787196C28.142 1.03049 28.2787 1.36046 28.2787 1.70452V22.4613C28.2787 22.8053 28.142 23.1353 27.8987 23.3786C27.6554 23.6219 27.3254 23.7586 26.9814 23.7586H8.21598C8.00245 23.7586 7.79222 23.7059 7.60394 23.6052C7.41565 23.5045 7.25513 23.3589 7.13663 23.1813L0.21814 12.8029C0.0759057 12.5897 0 12.3392 0 12.0829C0 11.8266 0.0759057 11.5761 0.21814 11.3629L7.13663 0.984524C7.25513 0.806903 7.41565 0.661279 7.60394 0.560574C7.79222 0.459868 8.00245 0.407195 8.21598 0.407227ZM20.4949 10.7856H11.4138V13.3802H20.4949V10.7856Z" fill="#474747"/>
			</svg>
		</div>
	</div>
	<h1>
		{data.title}
	</h1>
	<div class="gridof2">
		<div class="columnleft">
			{#if data.note && data.note.length > 0}
				<div class="notebox">
					<p class="notepara">{data.note}</p>
				</div>
			{/if}
			<div class="surroundcode">
				<pre>
					<code class="language-{data.lang}" bind:this={codeContents}>
						{data.codesnippet}
					</code>
				</pre>
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

#imagebox
	img
		object-fit: cover
		height: 100%
		width: 100%

#imagebox
	height: 144px
	@media screen and (max-width: 1023px)
		height: 88px

.columnleft
	display: flex
	flex-direction: column
	row-gap: 32px

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
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: ". . ."
		gap: 16px
		padding-top: 32px

.columnright.secondcolumnright
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."

.metadelete
	cursor: pointer
	svg
		object-fit: contain
		height: 15px
	&:hover
		#gored
			fill: #fe4a49
		#gowhite
			fill: white
		

.metaoptions
	display: none
	flex-direction: row
	margin-bottom: 8px

.surroundcode
	padding: 24px
	border: 1px solid #272727
	border-radius: 4px
	box-shadow: 3px 5px 18px rgba(0,0,0,0.7), -3px -5px 12px rgba(0,0,0,0.3)
	transition: all 1s
	background: #141414
	&:hover
		animation: tinydance 1s cubic-bezier(0.000, 0.760, 0.645, 1.650) forwards
	pre
		white-space: pre-line

@keyframes tinydance
	0%
		box-shadow: 3px 5px 18px rgba(0,0,0,0.7), -3px -5px 12px rgba(0,0,0,0.3)
	100%
		box-shadow: 3px 5px 18px rgba(0,0,0,0.7) inset, -3px -5px 12px rgba(0,0,0,0.3) inset

.notepara
	line-height: 1.8

h1
	text-transform: uppercase
	margin: 0
	font-family: 'Spline Sans', sans-serif
	border-bottom: 1px solid #313131
	padding-bottom: 12px
	font-weight: 600

</style>