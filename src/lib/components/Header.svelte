<script lang="ts">

	import { get, writable } from 'svelte/store'
	import { crossfade, fly } from 'svelte/transition'
	import { quintIn } from 'svelte/easing'
	import { clickOutsideAction } from 'svelte-legos'
	import supabase from '$lib/utils/supabase'
	
	let y:number
	let x:number = 200
	let loadingStore:boolean
	let showResults:boolean
	let searchinput
	let fauxtoggler:boolean = false

	function toggleFaux(){
		fauxtoggler = !fauxtoggler
	}

	function closeSearch(){
		if ( showResults === true) {
			showResults = false
		}
	}

	const searchStore = writable('')
	const resultsStore = writable([])

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
	input = ''
}

	$: if ( y > 500) {
				x = y
			} else {
				x = 200
			}

</script>

<svelte:window bind:scrollY={y}/>
<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Aboreto&display=swap" rel="stylesheet">
</svelte:head>

<div class="boxr head">
	<div class="boxr logo">
		<a href="/" target="_self">
			<svg id="manda" width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
	<div class="icons boxr">
		<div class="search boxr">
			<input type="text"
			bind:this={searchinput}
			on:input={(e) => searchStore.set(e.target.value)} 
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					searchWord();
				}
			}}
			/>
			<svg id="searcher" width="16" height="16" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={searchWord} on:keydown={toggleFaux}>
				<path d="M47.9482 41.7487L38.6014 32.4019C38.1795 31.98 37.6076 31.7456 37.0076 31.7456H35.4795C38.067 28.4362 39.6045 24.2737 39.6045 19.7456C39.6045 8.97373 30.8764 0.245605 20.1045 0.245605C9.33262 0.245605 0.604492 8.97373 0.604492 19.7456C0.604492 30.5175 9.33262 39.2456 20.1045 39.2456C24.6326 39.2456 28.7951 37.7081 32.1045 35.1206V36.6487C32.1045 37.2487 32.3389 37.8206 32.7607 38.2425L42.1076 47.5894C42.9889 48.4706 44.4139 48.4706 45.2857 47.5894L47.9389 44.9362C48.8201 44.055 48.8201 42.63 47.9482 41.7487ZM20.1045 31.7456C13.4764 31.7456 8.10449 26.3831 8.10449 19.7456C8.10449 13.1175 13.467 7.74561 20.1045 7.74561C26.7326 7.74561 32.1045 13.1081 32.1045 19.7456C32.1045 26.3737 26.742 31.7456 20.1045 31.7456Z" fill="#272727"/>
			</svg>
		</div>
		<svg width="16" height="16" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path id="iconpath" d="M20.5216 0.0751953L14.3867 0.075197L14.5262 13.8787L0.722656 13.7393V19.8742L14.5262 19.7348L14.3867 33.5383H20.5216L20.3822 19.7348L34.1857 19.8742V13.7393L20.3822 13.8787L20.5216 0.0751953Z" fill="#FFFFFF"/>
		</svg>
	</div>
</div>

{#if loadingStore}
	<div class="notepad">
		<p>loading...</p>
	</div>
{/if}

{#if showResults}
	<div class="results" use:clickOutsideAction on:clickoutside={closeSearch}>
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
{/if}

<style lang="sass">

#manda
	cursor: pointer
	transform-origin: center center
	&:hover
		animation: startrotating 2s ease infinite
		path
			fill: #10D56C

@keyframes startrotating
	0%
		transform: rotate(0deg)
	50%
		transform: rotate(360deg)
	100%
		transform: rotate(0deg)

.boxr.head
	border-bottom: 1px solid #212121
	width: 100vw
	height: 48px
	backdrop-filter: blur(12px)
	position: sticky
	top: 0
	z-index: 999
	padding: 0 16px
	align-items: center
	justify-content: space-between

.boxr.logo a
	display: flex
	flex-direction: row

#searcher
	transition: var(--snap)
	cursor: pointer
	&:hover
		path
			fill: #10D56C

.icons
	height: 16px
	cursor: pointer
	column-gap: 16px

#iconpath
	&:hover
		fill: #10D56C


.search
	column-gap: 16px
	input[type=text]
		height: 20px
		background: none
		border: 1px solid #272727
		outline: none
		color: white

.results
	display: flex
	flex-direction: column
	position: fixed
	right: 40px
	top: 64px
	text-align: right
	padding: 24px
	border: 1px solid #272727
	backdrop-filter: blur(10px)
	background-color: hsla(141,2%,4%,1)
	background-image: radial-gradient(at 84% 29%, hsla(130,85%,11%,1) 0px, transparent 50%), radial-gradient(at 25% 80%, hsla(85,3%,4%,1) 0px, transparent 50%)
	

</style>