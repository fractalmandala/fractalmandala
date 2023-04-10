<script lang="ts">

	import { onMount } from 'svelte'
	import Lenis from '@studio-freight/lenis'
	import { get, writable } from 'svelte/store'
	import { page } from '$app/stores'
	import '$lib/styles/global.sass'
	import { fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import { quintIn } from 'svelte/easing'
	import supabase from '$lib/utils/supabase'

	let light:boolean = false
	let fake:boolean = false
	let y:number
	let mobileView:boolean = false
	let mobileViewEnable:boolean = true
	let screenWidth:number
	let startsearch:boolean = false
	let showModal = false
	let appearance:number = 50
	const searchStore = writable('')
	const resultsStore = writable([])
	let showResults = false
	let loadingStore = false;
	let inputNote:boolean = false
	let linksonmobile:boolean = true
	let pageurl:any	
	let pageurlcut:any

	let title:string 
	let type:string
	let tags:string
	let lang:string
	let url:string
	let note:string
	let codesnippet:string
	let showrest:boolean = true
	let mandalaview:boolean = true
	let foralign:boolean = false

	$: if ( pageurlcut === '/mandala') {
		mandalaview = false
		foralign = true
	} else {
		mandalaview = true
		foralign = false
	}


	$: if ( screenWidth <= 1023 ) {
		mobileView = true
		mobileViewEnable = false
	} else {
		mobileView = false
		mobileViewEnable = true
	}

	$: if ( y <= 20 ) {
		appearance = 50
	} else {
		appearance = y
	}

	$: if ( screenWidth <= 1023 ) {
		showrest = !startsearch
		linksonmobile = true
	} else {
		showrest = true
		linksonmobile = false
	}




	function closeSearch(){
		if ( showResults === true ) {
			showResults = false
		}
		if ( showModal === true ) {
			showModal = false
		}
	}


	function toggleInputNote(){
		inputNote = !inputNote
	}

	function fauxfake(){
		fake = !fake
	}

	function toggleTheme(){
		light = !light
	}

	export async function inputNoteArea(){
		try {
			const { data, error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, type: type, lang: lang, tags: tags, url: url, note: note, codesnippet: codesnippet})
			if (error) throw new Error(error.message)
			title = ''
			type = ''
			lang = ''
			tags = ''
			url = ''
			note = ''
			codesnippet = ''
		} finally {
				showModal = true
				setTimeout(() => {
					showModal = false
				}, 8000)
			}
	}

	onMount(() => {
		pageurl = $page.url.pathname
		pageurlcut = pageurl.substr(0,8)
		const lenis = new Lenis({
			duration: 1.2,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			smooth: true,
			wheelMultiplier: 0.7,
			smoothWheel: false,
			touchMultiplier: 1,
			infinite: false,
		})
		function raf(time: any){
		lenis.raf(time)
		requestAnimationFrame(raf)
		}
		requestAnimationFrame(raf)	
		})


</script>

<svelte:window bind:scrollY={y} bind:innerWidth={screenWidth}/>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Spline+Sans+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="themer" class:light={light}>
	<div class="bodybody" style="min-height: 100vh">
		<slot></slot>
	</div>
	<div class="foot">
		<p on:click={toggleTheme} on:keydown={fauxfake}>Light Mode</p>
		<div class="rightside">
			<small><a href="/" target="_self">2023 | Amritanshu Pandey</a></small>
			<div class="twittericon" style="height: 16px">
				<a href="https://twitter.com/saamaanyafreaky" target="_blank" rel="noreferrer">
					<svg width="21" height="16" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M20.3242 2.77328C19.5739 3.09926 18.7802 3.31402 17.9679 3.41077C18.8215 2.91093 19.4635 2.11685 19.7733 1.17745C18.9663 1.64936 18.0848 1.98047 17.1667 2.15661C16.78 1.75142 16.3151 1.42907 15.8 1.20917C15.2849 0.989275 14.7305 0.876413 14.1704 0.877448C11.9029 0.877448 10.0679 2.68578 10.0679 4.91494C10.0663 5.225 10.1019 5.53415 10.1738 5.83577C8.54781 5.75954 6.95567 5.34476 5.4992 4.61796C4.04272 3.89116 2.754 2.86834 1.71546 1.61495C1.35112 2.22916 1.15844 2.92996 1.15755 3.64411C1.15755 5.0441 1.88796 6.2816 2.99088 7.0066C2.33743 6.99109 1.69738 6.81814 1.12505 6.50243V6.55243C1.12505 8.51076 2.54171 10.1399 4.41671 10.5108C4.06412 10.6047 3.70078 10.6524 3.33588 10.6524C3.07695 10.6529 2.81862 10.6277 2.56463 10.5774C3.08588 12.1816 4.60296 13.3482 6.40003 13.3816C4.93978 14.507 3.14697 15.1152 1.30338 15.1107C0.976141 15.1103 0.649203 15.0908 0.324219 15.0524C2.1997 16.25 4.37981 16.8835 6.60503 16.8774C14.1617 16.8774 18.29 10.7233 18.29 5.38577C18.29 5.21077 18.2854 5.03577 18.2771 4.86494C19.0784 4.29496 19.7716 3.58665 20.3242 2.77328Z" fill="#474747"/>
					</svg>
				</a>
			</div>
			<div class="twittericon" style="height: 16px">
				<a href="https://github.com/fractalmandala" target="_blank" rel="noreferrer">
					<svg width="14" height="16" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9.5899 1.77283C8.15473 1.43939 6.66213 1.43939 5.22696 1.77284C4.39803 1.26403 3.76463 1.03054 3.30428 0.932171C3.054 0.878681 2.85562 0.865317 2.70641 0.86931C2.63195 0.871295 2.57032 0.877589 2.52124 0.885151C2.49672 0.888921 2.47542 0.892996 2.45728 0.896965C2.44822 0.89895 2.43995 0.900911 2.43249 0.902801L2.4219 0.905561L2.41706 0.906888L2.41475 0.907534L2.41252 0.908168C2.41252 0.908156 2.41251 0.908168 2.41252 0.908168C2.41201 0.908391 2.41449 0.915061 2.57382 1.47219L2.41252 0.908168C2.24573 0.955857 2.10857 1.07487 2.03784 1.23326C1.84037 1.67543 1.73252 2.15236 1.72052 2.63647C1.7116 2.99624 1.75574 3.35466 1.85096 3.70031C1.60072 4.00342 1.39682 4.34284 1.24658 4.70756C1.04939 5.18628 0.948517 5.69918 0.949738 6.21693C0.949891 8.0401 1.48777 9.26595 2.40442 10.0536C3.04665 10.6055 3.82739 10.8991 4.60914 11.0673C4.48005 11.426 4.44655 11.8054 4.47267 12.1921V12.8945C3.99432 12.9952 3.66401 12.9634 3.42852 12.8856C3.13262 12.7879 2.90577 12.5916 2.68938 12.3094C2.57978 12.1666 2.47881 12.0097 2.37278 11.838L2.30548 11.7285C2.22245 11.5928 2.13283 11.4466 2.0424 11.3132C1.81833 10.9828 1.48775 10.5698 0.952051 10.4292L0.384142 10.2801L0.0859375 11.4159L0.653847 11.565C0.747146 11.5895 0.869955 11.6765 1.07047 11.9722C1.14415 12.0809 1.21443 12.1956 1.29468 12.3265C1.31988 12.3676 1.34613 12.4105 1.37371 12.4552C1.48393 12.6336 1.61035 12.8322 1.75764 13.0242C2.05501 13.4118 2.45989 13.8025 3.06049 14.0007C3.47316 14.137 3.93959 14.1696 4.47267 14.0878V16.2815C4.47267 16.6057 4.73556 16.8687 5.05983 16.8687H9.75708C10.0814 16.8687 10.3442 16.6057 10.3442 16.2815V12.098C10.3442 11.7272 10.3281 11.3881 10.2237 11.0718C11.0015 10.9076 11.7761 10.6137 12.4141 10.0614C13.3304 9.26819 13.8672 8.03131 13.8672 6.19709V6.1952C13.8643 5.28068 13.5433 4.39977 12.9659 3.70033C13.0611 3.35467 13.1053 2.99625 13.0964 2.63647C13.0844 2.15236 12.9766 1.67543 12.7791 1.23326C12.7083 1.07483 12.5711 0.955798 12.4042 0.908121L12.243 1.47268C12.4042 0.908121 12.4026 0.907651 12.402 0.907487L12.3998 0.906841L12.3948 0.905526L12.3843 0.902766C12.3769 0.900887 12.3685 0.898926 12.3595 0.896942C12.3414 0.892972 12.3202 0.888909 12.2956 0.88514C12.2465 0.877589 12.1849 0.871295 12.1104 0.86931C11.9612 0.865317 11.7627 0.878681 11.5123 0.932159C11.0519 1.03054 10.4186 1.26402 9.5899 1.77283Z" fill="#474747"/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>

{#if inputNote}
<div class="modaltextinput" in:fly={{ delay: 50, duration: 400, x: 0, y: -900}} out:fly={{ duration: 50, x: 0, y: -900}}>
	<div class="boxc notes">
		<div class="notesection boxc">
			<input type="text" placeholder="title" bind:value={title}/>
			<input type="text" placeholder="type" bind:value={type}/>
			<input type="text" placeholder="tags" bind:value={tags}/>
			<input type="text" placeholder="lang" bind:value={lang}/>
			<small>Note:</small>
			<textarea bind:value={note}/>
			<small>Code:</small>
			<textarea bind:value={codesnippet}/>
			<div class="boxr" style="gap: 16px">
				<button class="neon" on:click={inputNoteArea} on:keydown={fauxfake}>Submit</button>
				<button class="neon" on:click={toggleInputNote} on:keydown={fauxfake}>Close</button>
			</div>
		</div>
	</div>
</div>
{/if}
{#if loadingStore}
<p>...</p>
{/if}
{#if showResults}
<div class="modaltextinput" in:fly={{ delay: 100, duration: 400, x: 1200, y: 0, easing: quintOut}} out:fly={{ duration: 50, x: 1200, y: 0, easing: quintOut}} on:click={closeSearch} on:keydown={fauxfake}>
	<div class="results">
		{#if $resultsStore.length>0}
			{#each $resultsStore as item, i}
			<p style="margin: 0" in:fly={{ duration: 250, delay: i*50, y: 32, x: 0, easing: quintIn}}>
				<a href="/notes/{item.id}">
					{item.title}
				</a>
			</p>
			{/each}
		{/if}
	</div>
</div>
{/if}
{#if showModal}
	<div class="sidemodal" in:fly={{ duration: 300, x: 160, y: 0}} out:fly={{ duration: 100, x: 160, y: 0}}>
		<p>Submitted!</p>
	</div>
{/if}


<style lang="sass">




.sidemodal
	display: flex
	flex-direction: column
	height: 64px
	width: 128px
	position: fixed
	bottom: 64px
	right: 32px
	z-index: 1000
	background: #10C56D
	justify-content: center
	align-items: center
	p
		color: white


.modaltextinput
	display: flex
	flex-direction: column
	position: fixed
	top: 64px
	left: 0
	height: calc(100vh - 64px)
	width: 100vw
	background: #171717
	z-index: 1000
	.notes
		align-items: center
		justify-content: center
		padding-top: 32px
		.notesection
			width: 50%
			input[type="text"]
				padding: 8px
				margin-bottom: 16px
			textarea
				height: 160px
				margin-bottom: 16px
				padding: 8px
	@media screen and (max-width: 1023px)
		.notes
			.notesection
				width: 90%
				textarea
					height: 100px

.themer
	background-color: hsla(0,2%,2%,1)
	background-image: radial-gradient(at 80% 80%, hsla(101,3%,2%,1) 0px, transparent 50%), radial-gradient(at 40% 0%, hsla(126,75%,7%,1) 0px, transparent 50%)
	color: white
	box-sizing: border-box
	overflow-x: hidden
	display: flex
	flex-direction: column

.themer.light
	background: white
	color: #474747
	p
		color: #272727
	

.foot
	display: flex
	flex-direction: row
	align-items: center
	height: 48px
	border-top: 1px solid #272727
	padding: 0 40px
	background-color: hsla(0,2%,2%,1)
	background-image: radial-gradient(at 80% 80%, hsla(101,3%,2%,1) 0px, transparent 50%), radial-gradient(at 40% 0%, hsla(126,75%,7%,1) 0px, transparent 50%)
	justify-content: space-between
	p
		font-size: 12px
		text-transform: uppercase
		margin: 0
		color: #272727
		cursor: pointer
		&:hover
			color: #10D56C

.rightside
	display: flex
	flex-direction: row
	gap: 16px
	align-items: center
	justify-content: flex-end
	small
		font-size: 12px
		text-transform: uppercase
		color: #373737
	
.twittericon
	&:hover
		svg path
			fill: #10D56C

.results
	padding: 32px
	p
		color: white
		text-align: right
		text-transform: uppercase
		font-size: 20px
		&:hover
			color: #10D56C

.bodybody
	padding-top: 120px

</style>