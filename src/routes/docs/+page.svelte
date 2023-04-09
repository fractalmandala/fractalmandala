<script lang="ts">

	import { onMount } from 'svelte'
	import { allDocs, selectedTag } from '$lib/utils/localpulls'
	import { tableTags } from '$lib/utils/supabase'
	import { fly } from 'svelte/transition'

	let docs:any
	let selectag:any = 'star'
	let showposts:any
	let tableposts:any
	let fake:boolean = false
	let viewport:number
	let showondesk:boolean = true
	let showonmobile:boolean = false
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

	function toggleMobileShow(){
		showonmobile = !showonmobile
	}

	function closeMobileShow(){
		if ( showonmobile === true ) {
			showonmobile = false
		}
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

	$: if (viewport <= 1023) {
		showondesk = showonmobile
	} else {
		showondesk = true
	}

	onMount(async() => {
		selectag = 'star'
		docs = await allDocs()
		showposts = await selectedTag(selectag)
		tableposts = await tableTags(selectag)
	})

</script>

<svelte:window bind:innerWidth={viewport}/>

<div class="toptray" on:click={toggleMobileShow} on:keydown={fakefaux}>
	<div class="mobilemenuicon">
		<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.515625 0.876953H5.51562V5.87695H0.515625V0.876953Z" fill="#FFFFFF"/>
			<path d="M0.515625 8.37695H5.51562V13.377H0.515625V8.37695Z" fill="#FFFFFF"/>
			<path d="M5.51562 15.877H0.515625V20.877H5.51562V15.877Z" fill="#FFFFFF"/>
			<path d="M8.01562 0.876953H13.0156V5.87695H8.01562V0.876953Z" fill="#FFFFFF"/>
			<path d="M13.0156 8.37695H8.01562V13.377H13.0156V8.37695Z" fill="#FFFFFF"/>
			<path d="M8.01562 15.877H13.0156V20.877H8.01562V15.877Z" fill="#FFFFFF"/>
			<path d="M20.5156 0.876953H15.5156V5.87695H20.5156V0.876953Z" fill="#FFFFFF"/>
			<path d="M15.5156 8.37695H20.5156V13.377H15.5156V8.37695Z" fill="#FFFFFF"/>
			<path d="M20.5156 15.877H15.5156V20.877H20.5156V15.877Z" fill="#FFFFFF"/>
		</svg>
	</div>
	{#if showondesk}
	<div class="svgfilter" on:click={() => tagChosen('star')} on:keydown={fakefaux} in:fly={{ delay: 20, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}}>
		<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.5508 16.4301L16.7308 20.3564L15.0908 12.9564L20.5508 7.9775L13.3608 7.33539L10.5508 0.356445L7.74078 7.33539L0.550781 7.9775L6.01078 12.9564L4.37078 20.3564L10.5508 16.4301Z" fill="#10D56C"/>
		</svg>
	</div>
	<div class="afilter" on:click={() => tagChosen('sveltecode')} on:keydown={fakefaux} in:fly={{ delay: 40, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter1}>Sveltecode</div>
	<div class="afilter" on:click={() => tagChosen('scroll')} on:keydown={fakefaux} in:fly={{ delay: 60, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter2}>scroll</div>
	<div class="afilter" on:click={() => tagChosen('supabase')} on:keydown={fakefaux} in:fly={{ delay: 80, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter3}>supabase</div>
	<div class="afilter" on:click={() => tagChosen('setup')} on:keydown={fakefaux} in:fly={{ delay: 100, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter4}>setups</div>
	<div class="afilter" on:click={() => tagChosen('animation')} on:keydown={fakefaux} in:fly={{ delay: 120, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter5}>animations</div>
	<div class="afilter" on:click={() => tagChosen('gpt')} on:keydown={fakefaux} in:fly={{ delay: 140, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter6}>gpt</div>
	<div class="afilter" on:click={() => tagChosen('fetch')} on:keydown={fakefaux} in:fly={{ delay: 160, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter7}>fetch</div>
	<div class="afilter" on:click={() => tagChosen('error')} on:keydown={fakefaux} in:fly={{ delay: 180, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter8}>errors</div>
	<div class="afilter" on:click={() => tagChosen('template')} on:keydown={fakefaux} in:fly={{ delay: 200, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter9}>templates</div>
	<div class="afilter" on:click={() => tagChosen('record')} on:keydown={fakefaux} in:fly={{ delay: 220, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter10}>Records</div>
	<div class="afilter" on:click={() => tagChosen('auth')} on:keydown={fakefaux} in:fly={{ delay: 240, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter11}>Auth</div>
	<div class="afilter" on:click={() => tagChosen('json')} on:keydown={fakefaux} in:fly={{ delay: 260, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter12}>Json</div>
	<div class="afilter" on:click={() => tagChosen('backup')} on:keydown={fakefaux} in:fly={{ delay: 280, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter13}>Backups</div>
	<div class="afilter" on:click={() => tagChosen('typescript')} on:keydown={fakefaux} in:fly={{ delay: 300, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter14}>Typescript</div>
	<div class="afilter" on:click={() => tagChosen('saved')} on:keydown={fakefaux} in:fly={{ delay: 320, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter15}>Saved</div>
	<div class="afilter" on:click={() => tagChosen('conllu')} on:keydown={fakefaux} in:fly={{ delay: 340, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter16}>conllu</div>
	<div class="afilter" on:click={() => tagChosen('gradients')} on:keydown={fakefaux} in:fly={{ delay: 360, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter17}>gradients</div>
	<div class="afilter" on:click={() => tagChosen('sql')} on:keydown={fakefaux} in:fly={{ delay: 380, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter18}>sql</div>
	<div class="afilter" on:click={() => tagChosen('typography')} on:keydown={fakefaux} in:fly={{ delay: 400, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:forselectedfilter={forfilter19}>typography</div>
	{/if}
</div>
<div class="pagecontainer">
	{#if showposts && showposts.length > 0}
		{#each showposts as item, i}
			<div class="doc-card" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<a href="{item.path}" target="_self">
				<h6>DOCS</h6>
				<p>
					<a href="{item.path}" target="_self">
						{item.meta.title}
					</a>
				</p>
				<div class="boxr" style="gap: 16px">
					<small style="text-transform: uppercase; color: #10D56C">{item.meta.type}</small>
					<small style="color: #474747">{item.meta.tags}</small>
				</div>
				</a>
			</div>
		{/each}
	{/if}
	{#if tableposts && tableposts.length > 0}
		{#each tableposts as item, i}
			<div class="doc-card" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<a href="/notes/{item.id}" target="_self">
				<h6>SUPA</h6>
				<p>
					<a href="/notes/{item.id}" target="_self">
						{item.title}
					</a>
				</p>
				<div class="boxr" style="gap: 16px">
					<small style="text-transform: uppercase; color: #10D56C">{item.type}</small>
					<small style="color: #474747">{item.tags}</small>
				</div>
				</a>
			</div>
		{/each}
	{/if}	
</div>

<style lang="sass">

.mobilemenuicon
	@media screen and (min-width: 1024px)
		display: none
	@media screen and (max-width: 1023px)
		display: flex
		flex-direction: column
		width: 32px
		height: 32px
		align-items: center
		justify-content: center
		margin-bottom: 16px

.toptray
	gap: 2px
	.afilter
		text-transform: uppercase
		padding: 4px
		cursor: pointer
		font-size: 12px
		&:hover
			background: #10D56C
			color: white
	.svgfilter
		padding: 4px 8px
		cursor: pointer
		transform-origin: center center
		&:hover
			transform: scale(1.2)
			svg path
				fill: white

.toptray
	.afilter.forselectedfilter
		background: #171717
		border: 1px solid white

.toptray
	display: flex
	@media screen and (min-width: 1024px)
		flex-direction: row
		height: 48px
		align-items: center
		justify-content: flex-start
		padding: 64px 32px 0 32px
	@media screen and (max-width: 1023px)
		flex-direction: column
		height: 100%
		align-items: flex-start
		justify-content: flex-start
		padding: 64px 32px 0 16px
		.afilter
			font-size: 18px
		

.doc-card
	transition: all 0.23s ease
	height: max-content
	border-radius: 4px
	&:hover
		box-shadow: 4px 8px 14px #000000

.pagecontainer
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	align-content: start
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 16px
		.doc-card
			border: 1px solid #272727
			padding: 8px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "."
		gap: 16px 16px
		.doc-card
			border: 1px solid #272727
			padding: 8px 16px
			row-gap: 0

</style>