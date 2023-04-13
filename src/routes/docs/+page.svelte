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
	import { allNotes, allCodes, allOthers, CodeCSS, CodeJS, CodeHTML, quillNotes, MidjourneyImages, MidjourneyTagged } from '$lib/utils/supabase'
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


<div class="x22">
	{#if showposts && showposts.length > 0}
		{#each showposts as item, i}
			<TinyCard i={i} linkvar={item.path}>
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
			<TinyCard i={i} linkvar="/notes/{item.counting}">
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
			</TinyCard>
		{/each}
	{/if}	
</div>

<style lang="sass">

.x22
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	align-content: start
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr
		grid-template-areas: ". . . . ."
		gap: 24px
		padding: 32px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		gap: 16px
		padding: 16px

</style>