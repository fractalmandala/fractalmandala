<script lang="ts">

	import { onMount } from 'svelte'
	import { get, writable } from 'svelte/store'
	import { beforeUpdate } from 'svelte'
	import '$lib/styles/global.sass'
	import { fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import { quintIn } from 'svelte/easing'
	import supabase from '$lib/utils/supabase'

	export let data
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
	let searchinput: any
	const resultsStore = writable([])
	let showResults = false
	let loadingStore = false;
	let inputNote:boolean = false

	let title:string 
	let type:string
	let tags:string
	let lang:string
	let url:string
	let note:string
	let codesnippet:string
	let showrest:boolean = true
	let hideonmobile:boolean = false

	$: pathnamekey = data.pathname

	$: if ( screenWidth <= 1023 ) {
		mobileView = true
		mobileViewEnable = false
	} else {
		mobileView = false
		mobileViewEnable = true
	}

	$: if ( y <= 100 ) {
		appearance = 50
	} else {
		appearance = y
	}

	$: if ( screenWidth <= 1023 ) {
		showrest = !startsearch
	} else {
		showrest = true
	}

	function toggleSearchStart(){
		startsearch = !startsearch
	}

	const searchWord = async() => {
	loadingStore = true
	showResults = true
	const searchTerm = get(searchStore)
	let results: any[] = []
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.textSearch('title', searchTerm)
		.order('id')
		if (error) throw new Error(error.message)
		results = results.concat(data)
	// @ts-ignore
	resultsStore.set(data)
	loadingStore = false
	input.value = ''
}

	function closeSearch(){
		if ( showResults === true ) {
			showResults = false
		}
		if ( showModal === true ) {
			showModal = false
		}
	}

	function mobileExpand(){
		mobileViewEnable = !mobileViewEnable
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


</script>

<svelte:window bind:scrollY={y} bind:innerWidth={screenWidth}/>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Akshar:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="themer" class:light={light}>
	<div class="theheader">
		<div style="display: flex; flex-direction: row; gap: 16px; height: 22px">
		<div class="thelogo">
			<a href="/" target="_self">
			<svg id="manda" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate({y/4}deg)">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99995 4.25C10.4142 4.25 10.75 4.58579 10.75 5V10.567L15.6249 13.3815C15.9836 13.5886 16.1065 14.0473 15.8994 14.406C15.6923 14.7648 15.2336 14.8877 14.8749 14.6806L9.99995 11.866L5.125 14.6806C4.76628 14.8877 4.30759 14.7648 4.10048 14.406C3.89337 14.0473 4.01628 13.5886 4.375 13.3815L9.24995 10.567V5C9.24995 4.58579 9.58574 4.25 9.99995 4.25Z" fill="white"/>
			<path d="M5 7C5 8.10455 4.10455 9 3 9C1.89543 9 1 8.10455 1 7C1 5.89545 1.89543 5 3 5C4.10455 5 5 5.89545 5 7Z" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M3 5.75C2.30965 5.75 1.75 6.30966 1.75 7C1.75 7.69034 2.30965 8.25 3 8.25C3.69034 8.25 4.25 7.69034 4.25 7C4.25 6.30966 3.69034 5.75 3 5.75ZM0.25 7C0.25 5.48124 1.48121 4.25 3 4.25C4.51876 4.25 5.75 5.48124 5.75 7C5.75 8.51876 4.51876 9.75 3 9.75C1.48121 9.75 0.25 8.51876 0.25 7Z" fill="white"/>
			<path d="M5 15C5 16.1046 4.10455 17 3 17C1.89543 17 1 16.1046 1 15C1 13.8954 1.89543 13 3 13C4.10455 13 5 13.8954 5 15Z" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M3 13.75C2.30965 13.75 1.75 14.3097 1.75 15C1.75 15.6903 2.30965 16.25 3 16.25C3.69034 16.25 4.25 15.6903 4.25 15C4.25 14.3097 3.69034 13.75 3 13.75ZM0.25 15C0.25 13.4812 1.48121 12.25 3 12.25C4.51876 12.25 5.75 13.4812 5.75 15C5.75 16.5188 4.51876 17.75 3 17.75C1.48121 17.75 0.25 16.5188 0.25 15Z" fill="white"/>
			<path d="M12 19C12 20.1046 11.1046 21 10 21C8.89545 21 8 20.1046 8 19C8 17.8954 8.89545 17 10 17C11.1046 17 12 17.8954 12 19Z" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M10 17.75C9.30966 17.75 8.75 18.3097 8.75 19C8.75 19.6903 9.30966 20.25 10 20.25C10.6903 20.25 11.25 19.6903 11.25 19C11.25 18.3097 10.6903 17.75 10 17.75ZM7.25 19C7.25 17.4812 8.48124 16.25 10 16.25C11.5188 16.25 12.75 17.4812 12.75 19C12.75 20.5188 11.5188 21.75 10 21.75C8.48124 21.75 7.25 20.5188 7.25 19Z" fill="white"/>
			<path d="M19 15C19 16.1046 18.1046 17 17 17C15.8954 17 15 16.1046 15 15C15 13.8954 15.8954 13 17 13C18.1046 13 19 13.8954 19 15Z" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M17 13.75C16.3097 13.75 15.75 14.3097 15.75 15C15.75 15.6903 16.3097 16.25 17 16.25C17.6903 16.25 18.25 15.6903 18.25 15C18.25 14.3097 17.6903 13.75 17 13.75ZM14.25 15C14.25 13.4812 15.4812 12.25 17 12.25C18.5188 12.25 19.75 13.4812 19.75 15C19.75 16.5188 18.5188 17.75 17 17.75C15.4812 17.75 14.25 16.5188 14.25 15Z" fill="white"/>
			<path d="M19 7C19 8.10455 18.1046 9 17 9C15.8954 9 15 8.10455 15 7C15 5.89545 15.8954 5 17 5C18.1046 5 19 5.89545 19 7Z" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M17 5.75C16.3097 5.75 15.75 6.30966 15.75 7C15.75 7.69034 16.3097 8.25 17 8.25C17.6903 8.25 18.25 7.69034 18.25 7C18.25 6.30966 17.6903 5.75 17 5.75ZM14.25 7C14.25 5.48124 15.4812 4.25 17 4.25C18.5188 4.25 19.75 5.48124 19.75 7C19.75 8.51876 18.5188 9.75 17 9.75C15.4812 9.75 14.25 8.51876 14.25 7Z" fill="white"/>
			<path d="M12 3C12 4.10455 11.1046 5 10 5C8.89545 5 8 4.10455 8 3C8 1.89543 8.89545 1 10 1C11.1046 1 12 1.89543 12 3Z" fill="white"/>
			<path fill-rule="evenodd" clip-rule="evenodd" d="M10 1.75C9.30966 1.75 8.75 2.30965 8.75 3C8.75 3.69034 9.30961 4.25 9.99995 4.25C10.6903 4.25 11.25 3.69034 11.25 3C11.25 2.30965 10.6903 1.75 10 1.75ZM7.25 3C7.25 1.48121 8.48124 0.25 10 0.25C11.5188 0.25 12.75 1.48121 12.75 3C12.75 4.51876 11.5188 5.75 10 5.75C8.48124 5.75 7.25 4.51876 7.25 3Z" fill="white"/>
			</svg>
			</a>
		</div>
		<div class="thetextlogo" style="opacity: {appearance/300}">
			<LogoFM></LogoFM>
		</div>
		</div>
		<div class="thelinks">
			{#if showrest}
			<div class="gotocodes forsizing" style="height: 16px; opacity: {appearance/300}">
				<a href="/codes" target="_self">
				<svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M16.1998 0.433105H1.47984C1.12584 0.433105 0.839844 0.719105 0.839844 1.07311V15.7931C0.839844 16.1471 1.12584 16.4331 1.47984 16.4331H16.1998C16.5538 16.4331 16.8398 16.1471 16.8398 15.7931V1.07311C16.8398 0.719105 16.5538 0.433105 16.1998 0.433105ZM8.86184 8.5551L5.02184 11.7751C4.91784 11.8631 4.75984 11.7891 4.75984 11.6531V10.3991C4.75984 10.3531 4.78184 10.3071 4.81784 10.2771L7.01384 8.43311L4.81784 6.58911C4.79946 6.57459 4.78467 6.55603 4.77461 6.53487C4.76455 6.51372 4.7595 6.49053 4.75984 6.46711V5.21311C4.75984 5.07711 4.91784 5.00311 5.02184 5.09111L8.86184 8.30911C8.93984 8.37311 8.93984 8.4911 8.86184 8.5551ZM12.9198 11.6531C12.9198 11.7411 12.8518 11.8131 12.7698 11.8131H9.06984C8.98784 11.8131 8.91984 11.7411 8.91984 11.6531V10.6931C8.91984 10.6051 8.98784 10.5331 9.06984 10.5331H12.7698C12.8518 10.5331 12.9198 10.6051 12.9198 10.6931V11.6531Z" fill="white"/>
				</svg>
				</a>
			</div>
			<div class="gotodocs forsizing" style="height: 16px; opacity: {appearance/300}">
				<a href="/docs" target="_self">
				<svg width="20" height="20" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.35714 0.346071V5.57143C7.35714 5.60932 7.37219 5.64565 7.39898 5.67244C7.42578 5.69923 7.46211 5.71429 7.5 5.71429H12.7254C12.7395 5.7143 12.7533 5.71013 12.765 5.7023C12.7768 5.69448 12.7859 5.68335 12.7914 5.67032C12.7968 5.65729 12.7982 5.64294 12.7955 5.62909C12.7928 5.61524 12.786 5.60251 12.7761 5.5925L7.47893 0.295357C7.46892 0.285407 7.45619 0.278645 7.44234 0.275925C7.42849 0.273205 7.41414 0.274649 7.40111 0.280075C7.38808 0.285501 7.37695 0.294665 7.36913 0.306411C7.3613 0.318156 7.35713 0.331957 7.35714 0.346071Z" fill="white"/>
					<path d="M6.5 6.85714C6.42422 6.85714 6.35155 6.82704 6.29797 6.77346C6.24439 6.71988 6.21429 6.6472 6.21429 6.57143V0H0.928571C0.814907 0 0.705898 0.0451529 0.625526 0.125526C0.545153 0.205898 0.5 0.314907 0.5 0.428571V15.5714C0.5 15.6851 0.545153 15.7941 0.625526 15.8745C0.705898 15.9548 0.814907 16 0.928571 16H12.6429C12.7565 16 12.8655 15.9548 12.9459 15.8745C13.0263 15.7941 13.0714 15.6851 13.0714 15.5714V6.85714H6.5ZM10.2143 12.5714H3.35714V11.4286H10.2143V12.5714ZM10.2143 9.71429H3.35714V8.57143H10.2143V9.71429Z" fill="white"/>
				</svg>
				</a>
			</div>
			<div class="addnote forsizing" on:click={toggleInputNote} on:keydown={fauxfake} style="opacity: {appearance/300}">
				<svg width="20" height="20" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path id="iconpath" d="M20.5216 0.0751953L14.3867 0.075197L14.5262 13.8787L0.722656 13.7393V19.8742L14.5262 19.7348L14.3867 33.5383H20.5216L20.3822 19.7348L34.1857 19.8742V13.7393L20.3822 13.8787L20.5216 0.0751953Z" fill="#FFFFFF"/>
				</svg>
			</div>
			<div class="openpad forsizing" style="opacity: {appearance/300}">
				<a href="/pad" target="_self">
					<svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15.0605 0.658696L15.4946 1.09278C16.0927 1.69167 16.0022 2.75334 15.2908 3.46406L6.33907 12.4158L3.4388 13.4767C3.07461 13.6106 2.71998 13.437 2.64788 13.0904C2.62351 12.9647 2.63498 12.8347 2.68099 12.7152L3.76252 9.78993L12.6892 0.862495C13.4007 0.151774 14.4623 0.0598066 15.0605 0.658696ZM5.94839 1.54894C6.04501 1.54894 6.14068 1.56797 6.22995 1.60494C6.31921 1.64192 6.40032 1.69611 6.46864 1.76443C6.53696 1.83275 6.59115 1.91386 6.62813 2.00312C6.6651 2.09238 6.68413 2.18806 6.68413 2.28467C6.68413 2.38129 6.6651 2.47696 6.62813 2.56623C6.59115 2.65549 6.53696 2.7366 6.46864 2.80492C6.40032 2.87324 6.31921 2.92743 6.22995 2.96441C6.14068 3.00138 6.04501 3.02041 5.94839 3.02041H3.00545C2.61519 3.02041 2.24091 3.17544 1.96496 3.4514C1.689 3.72735 1.53397 4.10163 1.53397 4.49188V13.3207C1.53397 13.711 1.689 14.0853 1.96496 14.3612C2.24091 14.6372 2.61519 14.7922 3.00545 14.7922H11.8343C12.2245 14.7922 12.5988 14.6372 12.8748 14.3612C13.1507 14.0853 13.3058 13.711 13.3058 13.3207V10.3778C13.3058 10.1826 13.3833 9.99551 13.5213 9.85753C13.6592 9.71956 13.8464 9.64204 14.0415 9.64204C14.2366 9.64204 14.4238 9.71956 14.5617 9.85753C14.6997 9.99551 14.7772 10.1826 14.7772 10.3778V13.3207C14.7772 14.1012 14.4672 14.8498 13.9153 15.4017C13.3634 15.9536 12.6148 16.2637 11.8343 16.2637H3.00545C2.22493 16.2637 1.47638 15.9536 0.924469 15.4017C0.37256 14.8498 0.0625 14.1012 0.0625 13.3207V4.49188C0.0625 3.71137 0.37256 2.96282 0.924469 2.41091C1.47638 1.859 2.22493 1.54894 3.00545 1.54894H5.94839Z" fill="white"/>
					</svg>
				</a>
			</div>
			{/if}
			<div class="opensearch forsizing" on:click={toggleSearchStart} on:keydown={fauxfake} style="opacity: {appearance/300}">
				<svg id="searcher" width="20" height="20" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M47.9482 41.7487L38.6014 32.4019C38.1795 31.98 37.6076 31.7456 37.0076 31.7456H35.4795C38.067 28.4362 39.6045 24.2737 39.6045 19.7456C39.6045 8.97373 30.8764 0.245605 20.1045 0.245605C9.33262 0.245605 0.604492 8.97373 0.604492 19.7456C0.604492 30.5175 9.33262 39.2456 20.1045 39.2456C24.6326 39.2456 28.7951 37.7081 32.1045 35.1206V36.6487C32.1045 37.2487 32.3389 37.8206 32.7607 38.2425L42.1076 47.5894C42.9889 48.4706 44.4139 48.4706 45.2857 47.5894L47.9389 44.9362C48.8201 44.055 48.8201 42.63 47.9482 41.7487ZM20.1045 31.7456C13.4764 31.7456 8.10449 26.3831 8.10449 19.7456C8.10449 13.1175 13.467 7.74561 20.1045 7.74561C26.7326 7.74561 32.1045 13.1081 32.1045 19.7456C32.1045 26.3737 26.742 31.7456 20.1045 31.7456Z" fill="#272727"/>
				</svg>
			</div>
			{#if startsearch}
				<div class="boxr" id="searchboxform" in:fly={{ duration: 200, x: 128, y: 0}} out:fly={{ duration: 200, x: 128, y: 0}}>
				<form>
					<input type="text"
						bind:this={searchinput}
						on:input={(e) => searchStore.set(e.target.value)} 
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								searchWord();
							}
						}}
						/>
					<button class="gobutton" on:click={searchWord}>GO</button>
				</form>
				</div>
			{/if}
		</div>
	</div>
	{#key pathnamekey}
		<div in:fly={{ delay: 400, duration: 500, x: 0, y: -800, easing: quintOut}} out:fly={{ delay: 0, duration: 250, x: 0, y: -800, easing: quintOut}}>
			<slot></slot>
		</div>
	{/key}
	<div class="foot">
		<p on:click={toggleTheme} on:keydown={fauxfake}>Light Mode</p>
		<div class="rightside">
			<small>2023 | Amritanshu Pandey</small>
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

.forsizing
	height: 20px
	display: flex
	flex-direction: row
	align-items: center
	justify-content: center
	svg
		object-fit: cover
		height: 20px
	@media screen and (max-width: 1023px)
		svg
			height: 16px

.forsizing a
	height: 20px
	display: flex
	flex-direction: row
	align-items: center
	justify-content: center
	svg
		object-fit: cover
		height: 20px
	@media screen and (max-width: 1023px)
		svg
			height: 16px

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

.thetextlogo
	height: 22px

#searchboxform
	gap: 16px

.gobutton
	background: #10c56d
	width: 32px
	height: 20px
	text-align: center
	border: none
	cursor: pointer
	transform-origin: center center
	color: white
	font-size: 12px
	&:hover
		transform: scale(0.9)

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

.theheader
	display: flex
	flex-direction: row
	height: 64px
	border-bottom: 1px solid #272727
	padding: 0 16px
	align-items: center
	justify-content: space-between
	position: sticky
	top: 0
	z-index: 999
	backdrop-filter: blur(20px)
	&:hover
		.thelogo
			animation: rotation 4s infinite


.thelogo
	display: blog
	height: 20px
	width: 20px
	&:hover
		svg path
			fill: #10C56D

.thelinks
	display: flex
	flex-direction: row
	align-items: center
	gap: 24px
	.addnote
		cursor: pointer
		svg path
			fill: white
		&:hover
			svg path
				fill: #10D56C
	.openpad
		cursor: pointer
		svg path
			fill: white
		&:hover
			svg path
				fill: #10D56C
	.opensearch
		cursor: pointer
		svg path
			fill: white
		&:hover
			svg path
				fill: #10D56C
	.gotodocs a
		cursor: pointer
		svg path
			fill: white
		&:hover
			svg path
				fill: #10D56C
	.gotocodes a
		cursor: pointer
		svg path
			fill: white
		&:hover
			svg path
				fill: #10D56C
	@media screen and (max-width: 1023px)
		gap: 16px

@keyframes rotation
	0%
		transform: rotate(0deg)
	50%
		transform: rotate(360deg)
	100%
		transform: rotate(0deg)

.themer
	background-color: hsla(0,2%,2%,1)
	background-image: radial-gradient(at 80% 80%, hsla(101,79%,9%,1) 0px, transparent 50%), radial-gradient(at 40% 0%, hsla(126,75%,7%,1) 0px, transparent 50%)
	color: white

.themer.light
	background: white
	color: #474747

.foot
	display: flex
	flex-direction: row
	align-items: center
	height: 48px
	border-top: 1px solid #272727
	padding: 0 16px
	background: #171717
	justify-content: space-between
	p
		font-size: 12px
		text-transform: uppercase
		margin: 0
		color: #474747
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

</style>