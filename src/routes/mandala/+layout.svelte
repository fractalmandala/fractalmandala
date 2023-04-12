<script lang="ts">

	import { onMount } from 'svelte'

	import hljs from 'highlight.js'
	import { allDocs, selectedTag } from '$lib/utils/localpulls'
	import { tableTags } from '$lib/utils/supabase'
	import { fly } from 'svelte/transition'
	import TinyCard from '$lib/components/TinyCard.svelte'
	import TinyCard2 from '$lib/components/TinyCard.svelte'

	import '$lib/styles/highlight.css'
	let selectag:any = 'star'
	let fake:boolean = false
	let showposts:any
	let tableposts:any
	let forfilter1:boolean = false
	let forfilter2:boolean = false
	let forfilter3:boolean = false
	let forfilter4:boolean = false
	let forfilter5:boolean = false
	let forfilter6:boolean = false
	let forfilter7:boolean = false
	let forfilter8:boolean = false
	let forfilter9:boolean = false
	let forfilter10:boolean = false
	let forfilter11:boolean = false
	let forfilter12:boolean = false
	let forfilter13:boolean = false
	let forfilter14:boolean = false
	let forfilter15:boolean = false
	let forfilter16:boolean = false
	let forfilter17:boolean = false
	let forfilter18:boolean = false
	let forfilter19:boolean = false
	let showAll:boolean = false

	function toggleShowAll(){
		showAll = !showAll
	}

	$: if ( selectag === 'sveltecode') {
		forfilter1 = true
	} else {
		forfilter1 = false
	}

	$: if ( selectag === 'scroll') {
		forfilter2 = true
	} else {
		forfilter2 = false
	}

	$: if ( selectag === 'supabase') {
		forfilter3 = true
	} else {
		forfilter3 = false
	}

	$: if ( selectag === 'setup') {
		forfilter4 = true
	} else {
		forfilter4 = false
	}

	$: if ( selectag === 'animation') {
		forfilter5 = true
	} else {
		forfilter5 = false
	}

	$: if ( selectag === 'gpt') {
		forfilter6 = true
	} else {
		forfilter6 = false
	}

	$: if ( selectag === 'fetch') {
		forfilter7 = true
	} else {
		forfilter7 = false
	}

	$: if ( selectag === 'error') {
		forfilter8 = true
	} else {
		forfilter8 = false
	}

	$: if ( selectag === 'template') {
		forfilter9 = true
	} else {
		forfilter9 = false
	}

	$: if ( selectag === 'record') {
		forfilter10 = true
	} else {
		forfilter10 = false
	}

	$: if ( selectag === 'auth') {
		forfilter11 = true
	} else {
		forfilter11 = false
	}

	$: if ( selectag === 'json') {
		forfilter12 = true
	} else {
		forfilter12 = false
	}

	$: if ( selectag === 'backup') {
		forfilter13 = true
	} else {
		forfilter13 = false
	}

	$: if ( selectag === 'typescript') {
		forfilter14 = true
	} else {
		forfilter14 = false
	}

	$: if ( selectag === 'saved') {
		forfilter15 = true
	} else {
		forfilter15 = false
	}

	$: if ( selectag === 'conllu') {
		forfilter16 = true
	} else {
		forfilter16 = false
	}

	$: if ( selectag === 'gradients') {
		forfilter17 = true
	} else {
		forfilter17 = false
	}

	$: if ( selectag === 'sql') {
		forfilter18 = true
	} else {
		forfilter18 = false
	}

	$: if ( selectag === 'typography') {
		forfilter19 = true
	} else {
		forfilter19 = false
	}


	function tagChosen(newTag:any){
		selectag = newTag
	}


	function fakefaux(){
		fake = !fake
	}

	$: if (selectag) {
			(async() => {
				showposts = await selectedTag(selectag)
			})(),
			(async() => {
				tableposts = await tableTags(selectag)
			})()
		}

	onMount(async() => {
		hljs.highlightAll()
		selectag = 'star'
		showposts = await selectedTag(selectag)
		tableposts = await tableTags(selectag)
	})

</script>

<div class="pagecontainer">
	<div class="sidehelp">
	{#if showposts && showposts.length > 0}
		{#each showposts as item, i}
			<TinyCard i={i}>
				<small class="tinycardcat" slot="category">{item.meta.type}</small>
				<p slot="title">
					<a href="{item.path}" target="_self">
						{item.meta.title}
					</a>
				</p>
				<small style="font-size: 10px; color: #676767; text-transform: uppercase" slot="lang">{item.meta.tags}</small>
			</TinyCard>
		{/each}
	{/if}
	{#if tableposts && tableposts.length > 0}
		{#each tableposts as item, i}
			<TinyCard2 i={i}>
				<small class="tinycardcat" slot="category">{item.type}</small>
				<p slot="title">
					<a href="/notes/{item.counting}" target="_self">
						{item.title}
					</a>
				</p>
				<small style="font-size: 10px; color: #676767; text-transform: uppercase"  slot="lang">
					{#if item.lang && item.lang.length >0}
						{item.lang}
					{/if}
				</small>
				<small style="font-size: 10px; color: #676767;" slot="tags">{item.tags}</small>
			</TinyCard2>
		{/each}
	{/if}			
	</div>
	<div class="blogsection">
		<slot></slot>
		<div class="bottomend">
			<p style="color: #10D56C">NEXT:</p>
			<h5>
				<a href="/mandala/generalutilities">
					Simple Toggle in Sveltekit
				</a>
			</h5>
		</div>
	</div>
</div>


<style lang="sass">

.bottomend
	h5
		font-size: 20px
		margin: 0
		color: #878787
		&:hover
			color: white
	p
		font-size: 12px
		margin: 0
	text-align: right

.bottomend
	height: 80px
	width: 100%
	border-top: 1px solid #272727
	display: flex
	flex-direction: row
	align-items: center
	justify-content: flex-end
	column-gap: 8px

.try
	display: flex
	flex-direction: row
	align-items: center
	@media screen and (max-width: 1023px)
		flex-direction: column

.pagecontainer
	box-sizing: border-box
	width: 100vw
	overflow-x: hidden
	height: 100%
	@media screen and (min-width: 1024px)
		display: grid
		grid-auto-flow: row
		grid-template-rows: auto
		grid-template-columns: 280px 1fr
		grid-template-areas: "sidehelp blogsection"
		gap: 0 32px
		.sidehelp
			grid-area: sidehelp
			box-sizing: border-box
			width: 280px
		.blogsection
			grid-area: blogsection
			box-sizing: border-box
	@media screen and (max-width: 1023px)
		display: grid
		grid-auto-flow: row
		grid-template-rows: auto auto
		grid-template-columns: 1fr
		grid-template-areas: "blogsection" "sidehelp"
		gap: 32px
		.blogsection
			grid-area: blogsection
		.sidehelp
			grid-area: sidehelp

.sidehelp
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	grid-template-columns: 1fr
	grid-template-areas: "."
	gap: 16px 16px
	@media screen and (min-width: 1024px)
		align-items: start
		align-content: start
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px 16px
	
.afilter
	text-transform: uppercase
	padding: 4px
	cursor: pointer
	font-size: 12px
	display: flex
	flex-direction: row
	align-items: center
	color: #474747
	&:hover
		color: white
	@media screen and (max-width: 1023px)
		font-size: 20px
		text-align: center
		justify-content: center
		color: white

.svgfilter
	padding: 4px 16px
	cursor: pointer
	transform-origin: center center
	&:hover
		transform: scale(1.2)
		svg path
			fill: white

.afilter.forselectedfilter
	background: #171717
	border: 1px solid #272727


</style>

