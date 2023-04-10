<script lang="ts">
	
	import { onMount } from 'svelte'
	import Header from '$lib/components/Header.svelte'
	import { allNotes, allCodes, allOthers, CodeCSS, CodeJS, quillNotes, MidjourneyImages, MidjourneyTagged } from '$lib/utils/supabase'
	import { allDocs } from '$lib/utils/localpulls'
	import { alertAction } from 'svelte-legos'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	import supabase from '$lib/utils/supabase'
	import { CodeHTML, CodesFiltered } from '$lib/utils/supabase'
	import PopupHTML from '$lib/components/PopupHTML.svelte'
	import { fly } from 'svelte/transition'
	export let data
	let lang:any = data.lang
	let codes:any
	let showothers:boolean = false
	let fake:boolean = false
	let codeContents:any
	let deletionID:any
	let confirmDelete:boolean = false
	let theid:any
	let area:boolean[] = Array(9).fill(false)
	area[1] = true

	let notes:any
	let codes2:any
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

	function onClose(){
		confirmDelete = false
	}

	function onOk(){
		confirmDelete = true
	}


	function toggleShow(){
		showothers = !showothers
	}

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
		Prism.highlightAll();
	})
</script>



<Header>
		<h5 class="pgcnt" on:click={() => toggleArea(1)} on:keydown={fauxfake} class:selectedarea={area[1]}>all</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(2)} on:keydown={fauxfake}>code</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(3)} on:keydown={fauxfake}>general</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(4)} on:keydown={fauxfake}>html</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(5)} on:keydown={fauxfake}>js</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(6)} on:keydown={fauxfake}>styling</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(7)} on:keydown={fauxfake}>docs</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(8)} on:keydown={fauxfake}>quills</h5>
		<h5 class="pgcnt" on:click={() => toggleArea(9)} on:keydown={fauxfake}>gallery</h5>
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
				<p class="notepara">{data.note}</p>
			{/if}
				<div class="surroundcode">
				<pre>
					<code class="language-{data.lang}" bind:this={codeContents}>
						{data.codesnippet}
					</code>
				</pre>
				</div>
			</div>
		<div class="columnright">
			{#if area[1]}
				{#if notes && notes.length > 0}
					{#each notes as item, i}
						<div class="boxc type1" in:fly={{ duration: 300, delay: i * 15, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
								<p style="padding-top: 4px; padding-bottom: 8px">
									<a href="/notes/{item.id}">
										{item.title}
									</a>
								</p>
							<small style="font-size: 10px; color: #575757">{item.tags}</small>
						</div>
					{/each}
				{/if}
			{/if}
			{#if area[2]}
				{#if codes && codes.length > 0}
				{#each codes as item, i}
				<div class="type1 boxc" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
				{/each}
				{/if}
			{/if}
	{#if area[3]}
		{#if gens && gens.length > 0}

			{#each gens as item, i}
				<div class="boxc type1" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}

		{/if}
	{/if}
	{#if area[4]}
		{#if chtml && chtml.length > 0}

			{#each chtml as item, i}
				<div class="boxc type1" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}

		{/if}
	{/if}
	{#if area[5]}
		{#if cjs && cjs.length > 0}

			{#each cjs as item, i}
				<div class="boxc type1" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}

		{/if}
	{/if}
	{#if area[6]}
		{#if ccss && ccss.length > 0}

			{#each ccss as item, i}
				<div class="boxc type1" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}

		{/if}
	{/if}
	{#if area[7]}
		{#if docs && docs.length > 0}

			{#each docs as item, i}
				<div class="boxc type1" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="{item.path}">
						{item.meta.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}

		{/if}
	{/if}
	{#if area[8]}
		{#if quills && quills.length > 0}

			{#each quills as item, i}
				<div class="boxc type1" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<p>
					<a href="/blog/{item.id}">
						{item.title}
					</a>
				</p>
				<small>{item.tags}</small>
				</div>
			{/each}

		{/if}
	{/if}
		</div>
	</div>
</div>

<style lang="sass">

.type1
	background-color: hsla(0,2%,2%,1)
	background-image: radial-gradient(at 80% 80%, hsla(101,3%,2%,1) 0px, transparent 50%), radial-gradient(at 40% 0%, hsla(126,75%,7%,1) 0px, transparent 50%)
	display: flex
	flex-direction: column
	text-align: right
	padding: 8px
	border: 1px solid #272727
	transition: var(--snap)
	cursor: pointer
	opacity: 0.5
	transform-origin: center center
	p
		font-family: 'Spline Sans', sans-serif
		text-transform: capitalize
		font-size: 12px
		color: white
	&:hover
		opacity: 1
		border: 1px solid #10D56C
		transform: scale(1.1)


.columnright
	display: grid
	grid-template-row: auto
	grid-auto-flow: row
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: ". . ."
		gap: 16px 16px
		align-items: start
		align-content: start

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
	pre
		white-space: pre-line

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