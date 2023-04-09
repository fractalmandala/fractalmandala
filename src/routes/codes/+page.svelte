<script lang="ts">

	import { onMount } from 'svelte'
	import { allCodes, filteredCode } from '$lib/utils/supabase'
	import { fly } from 'svelte/transition'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	
	let snips:any
	let codeFilter:any = 'html'
	let codas:any
	let fake:boolean = false
	let viewport:number
	let showondesk:boolean = true
	let showonmobile:boolean = false
	let fordifference:number
	let forfilter1:boolean = false
	let forfilter2:boolean = false
	let forfilter3:boolean = false
	let forfilter4:boolean = false

	$: if (codeFilter === 'javascript') {
		forfilter2 = true
	} else {
		forfilter2 = false
	}

	$: if (codeFilter === 'html') {
		forfilter1 = true
	} else {
		forfilter1 = false
	}

	$: if (codeFilter === 'css') {
		forfilter3 = true
	} else {
		forfilter3 = false
	}

	$: if (codeFilter === 'sql') {
		forfilter4 = true
	} else {
		forfilter4 = false
	}

	function codeChosen(newCode:any){
		codeFilter = newCode
	}

	function fakefaux(){
		fake = !fake
	}

	function toggleMobileShow(){
		showonmobile = !showonmobile
	}

	$: if (codeFilter) {
			(async() => {
				codas = await filteredCode(codeFilter)
			})()
		}

	$: if (viewport <= 1023) {
		showondesk = showonmobile
	} else {
		showondesk = true
	}

	onMount(async() => {
		codeFilter = 'html'
		snips = await allCodes()
		codas = await filteredCode(codeFilter)
		Prism.highlightAll();
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
		<div class="afilter" on:click={() => codeChosen('javascript')} on:keydown={fakefaux} in:fly={{ delay: 40, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:selectedfilterofcode={forfilter2}>Javascript</div>
		<div class="afilter" on:click={() => codeChosen('html')} on:keydown={fakefaux} in:fly={{ delay: 40, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:selectedfilterofcode={forfilter1}>HTML</div>
		<div class="afilter" on:click={() => codeChosen('css')} on:keydown={fakefaux} in:fly={{ delay: 40, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:selectedfilterofcode={forfilter3}>CSS</div>
		<div class="afilter" on:click={() => codeChosen('sql')} on:keydown={fakefaux} in:fly={{ delay: 40, x: -128, y: 0, duration: 200 }} out:fly={{ delay: 0, x: -128, y: 0, duration: 200}} class:selectedfilterofcode={forfilter4}>SQL</div>
	{/if}
</div>

<div class="pagecontainer">
	{#if codas && codas.length > 0}
		{#each codas as item, i}
			<div class="snip-card" in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: 0, x: 0, y: -48}}>
				<a href="/notes/{item.id}" target="_self">
				<p>{item.title}</p>
				<div class="boxr">
					<small class="typetype">{item.type}</small>
					<small style="color: #474747">{item.lang}</small>
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
	.afilter.selectedfilterofcode
		background: #171717
		border: 1px solid white
		cursor: none
		


.toptray
	.afilter
		text-transform: uppercase
		padding: 4px 8px
		cursor: pointer
		font-size: 15px
		&:hover
			background: #10D56C
			color: white

.toptray
	display: flex
	@media screen and (min-width: 1024px)
		flex-direction: row
		height: 48px
		align-items: center
		padding: 64px 32px 0 32px
	@media screen and (max-width: 1023px)
		flex-direction: column
		height: 100%
		align-items: flex-start
		justify-content: flex-start
		padding: 64px 32px 0 16px
		.afilter
			font-size: 18px

.typetype
	color: #10D56c
	text-transform: uppercase
	font-size: 12px

.snip-card
	.boxr
		gap: 16px

.snip-card
	transition: all 0.23s ease
	display: flex
	flex-direction: column
	&:hover
		box-shadow: 4px 8px 14px #000000
	small
		margin: 0


.pagecontainer
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	align-content: start
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . ."
		gap: 16px
		.snip-card
			border: 1px solid #272727
			padding: 16px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-areas: "."
		gap: 8px 16px
		.snip-card
			border: 1px solid #272727
			padding: 8px 16px

.snip-card
	border-radius: 4px

</style>