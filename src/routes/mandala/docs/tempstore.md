---
title: temporary store
tags: temp
type: code
---

on layout
```html
<script>	
	export let data
	import { fly, crossfade } from 'svelte/transition'
	import { expoOut, expoInOut } from 'svelte/easing'
	import PrismModal from '$lib/components/PrismModal.svelte'
	import { onMount, afterUpdate } from 'svelte'
	import Cursor from '$lib/components/CustomCursor.svelte'
	import { allDocs, docCodes, docDocs } from '$lib/utils/allfetches'
	import { Codes, Others, CodeHTML, CodeCSS, CodeJS, CodeSQL } from '$lib/utils/supabasepulls'
	import { get, writable } from 'svelte/store'
	import supabase from '$lib/db'
	const searchStore = writable('')
	let searchinput
	const resultsStore = writable([])
	let showResults = false
	let loadingStore = false;
	let wantSearch = false
	let htms
	let csss
	let jss
	let codes22
	let docus
	let sqls
	let input
	let bigMenu = false
	let selectedArea = Array(4).fill(false)
	selectedArea[1] = true
	import '$lib/styles/globals.sass'
	import '$lib/styles/prism.css'
	import '$lib/utils/prism-toolbar'
	import '$lib/utils/prismtoclipboard'
	import '$lib/utils/prism.js'
	let bigItems = Array(5).fill(false)
	bigItems[1] = true
	let modalIt = [false, false, false, false ]

	function toggleModal(index){
		modalIt[index] = !modalIt[index]
		for ( let i = 0; i < modalIt.length; i ++ ) {
			if ( i !== index && modalIt[i] === true ) {
				modalIt[i] = false
			}
		}
	}

	const [ send, receive ] = crossfade({
		duration: 2000,
		fallback: fly,
	})

	function toggleWant(){
		wantSearch = !wantSearch
	}

	function toggleBig(index){
		bigItems[index] = !bigItems[index]
		for ( let i = 0; i < bigItems.length; i ++ ) {
			if ( i !== index && bigItems[i] === true ) {
				bigItems[i] = false
			}
		}
	}

	function toggleSelect(index){
		selectedArea[index] = !selectedArea[index]
		for ( let i = 0; i < selectedArea.length; i ++ ) {
			if ( i !== index && selectedArea[i] === true ) {
				selectedArea[i] = false
			}
		}
	}

	let docs
	let codas
	let oths

	function toggleBigmenu(){
		bigMenu = !bigMenu
	}

	function closeResults(){
		if ( showResults === true) {
			showResults = false
		}
	}

	const searchWord = async() => {
	loadingStore = true
	showResults = true
	const searchTerm = get(searchStore)
	let results = []
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

	onMount(async() => {
		docs = await allDocs()
		codas = await Codes()
		oths = await Others()
		htms = await CodeHTML()
		csss = await CodeCSS()
		jss = await CodeJS()
		sqls = await CodeSQL()
		codes22 = await docCodes()
		docus = await docDocs()
		Prism.highlightAll();
	})

</script>


<div class="appcontainer">
	<div class="header">
		<svg id="fractala" width="100%" height="100%" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={toggleBigmenu} on:keydown={toggleBigmenu}>
			<g id="Abstract/circles-seven" clip-path="url(#clip0_175_53)">
			<g id="fills">
				<path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M10 5C11.1046 5 12 4.10455 12 3C12 1.89543 11.1046 1 10 1C8.89545 1 8 1.89543 8 3C8 4.10455 8.89545 5 10 5Z" fill="#1C1B1E"/>
				<path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M10 13C11.1046 13 12 12.1046 12 11C12 9.89545 11.1046 9 10 9C8.89545 9 8 9.89545 8 11C8 12.1046 8.89545 13 10 13Z" fill="#1C1B1E"/>
				<path id="Vector_3" fill-rule="evenodd" clip-rule="evenodd" d="M15.196 8.00034C15.7483 8.95694 16.9715 9.28469 17.9281 8.73239C18.8847 8.18009 19.2124 6.95694 18.6601 6.00034C18.1078 5.04374 16.8847 4.71599 15.9281 5.26829C14.9715 5.82059 14.6437 7.04374 15.196 8.00034Z" fill="#1C1B1E"/>
				<path id="Vector_4" fill-rule="evenodd" clip-rule="evenodd" d="M15.196 14.0003C14.6437 14.9569 14.9715 16.1801 15.9281 16.7324C16.8847 17.2847 18.1078 16.9569 18.6601 16.0003C19.2124 15.0437 18.8847 13.8206 17.9281 13.2683C16.9715 12.716 15.7483 13.0437 15.196 14.0003Z" fill="#1C1B1E"/>
				<path id="Vector_5" fill-rule="evenodd" clip-rule="evenodd" d="M10 17C8.89545 17 8 17.8954 8 19C8 20.1046 8.89545 21 10 21C11.1046 21 12 20.1046 12 19C12 17.8954 11.1046 17 10 17Z" fill="#1C1B1E"/>
				<path id="Vector_6" fill-rule="evenodd" clip-rule="evenodd" d="M4.80368 14.0003C4.25138 13.0437 3.02823 12.716 2.07162 13.2683C1.11504 13.8206 0.787287 15.0437 1.33957 16.0003C1.89186 16.9569 3.11503 17.2847 4.07163 16.7324C5.02823 16.1801 5.35598 14.9569 4.80368 14.0003Z" fill="#1C1B1E"/>
				<path id="Vector_7" fill-rule="evenodd" clip-rule="evenodd" d="M4.80368 8.00034C5.35598 7.04374 5.02823 5.82059 4.07163 5.26829C3.11503 4.71599 1.89186 5.04374 1.33957 6.00034C0.787287 6.95694 1.11504 8.18009 2.07162 8.73239C3.02823 9.28469 4.25138 8.95694 4.80368 8.00034Z" fill="#1C1B1E"/>
			</g>
			<g id="strokes">
				<path id="Vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M7.25 3C7.25 1.48121 8.48124 0.25 10 0.25C11.5188 0.25 12.75 1.48121 12.75 3C12.75 4.51876 11.5188 5.75 10 5.75C8.48124 5.75 7.25 4.51876 7.25 3ZM10 1.75C9.30966 1.75 8.75 2.30965 8.75 3C8.75 3.69034 9.30966 4.25 10 4.25C10.6903 4.25 11.25 3.69034 11.25 3C11.25 2.30965 10.6903 1.75 10 1.75Z" fill="#1C1B1E"/>
				<path id="Vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd" d="M7.25 11C7.25 9.48124 8.48124 8.25 10 8.25C11.5188 8.25 12.75 9.48124 12.75 11C12.75 12.5188 11.5188 13.75 10 13.75C8.48124 13.75 7.25 12.5188 7.25 11ZM10 9.75C9.30966 9.75 8.75 10.3097 8.75 11C8.75 11.6903 9.30966 12.25 10 12.25C10.6903 12.25 11.25 11.6903 11.25 11C11.25 10.3097 10.6903 9.75 10 9.75Z" fill="#1C1B1E"/>
				<path id="Vector (Stroke)_3" fill-rule="evenodd" clip-rule="evenodd" d="M15.5532 4.6189C16.8685 3.85949 18.5504 4.31016 19.3098 5.62547C20.0692 6.94079 19.6185 8.62263 18.3032 9.38204C16.9879 10.1414 15.306 9.69078 14.5466 8.37547C13.7872 7.06015 14.2379 5.37831 15.5532 4.6189ZM18.0107 6.37547C17.6655 5.77758 16.9011 5.57275 16.3032 5.91794C15.7053 6.26313 15.5005 7.02759 15.8457 7.62547C16.1909 8.22336 16.9553 8.42819 17.5532 8.083C18.1511 7.73781 18.3559 6.97335 18.0107 6.37547Z" fill="#1C1B1E"/>
				<path id="Vector (Stroke)_4" fill-rule="evenodd" clip-rule="evenodd" d="M14.5466 13.6255C15.306 12.3102 16.9879 11.8595 18.3032 12.6189C19.6185 13.3783 20.0692 15.0601 19.3098 16.3755C18.5504 17.6908 16.8685 18.1414 15.5532 17.382C14.2379 16.6226 13.7872 14.9408 14.5466 13.6255ZM17.5532 13.9179C16.9553 13.5727 16.1909 13.7776 15.8457 14.3755C15.5005 14.9733 15.7053 15.7378 16.3032 16.083C16.9011 16.4282 17.6655 16.2234 18.0107 15.6255C18.3559 15.0276 18.1511 14.2631 17.5532 13.9179Z" fill="#1C1B1E"/>
				<path id="Vector (Stroke)_5" fill-rule="evenodd" clip-rule="evenodd" d="M7.25 19C7.25 17.4812 8.48124 16.25 10 16.25C11.5188 16.25 12.75 17.4812 12.75 19C12.75 20.5188 11.5188 21.75 10 21.75C8.48124 21.75 7.25 20.5188 7.25 19ZM10 17.75C9.30966 17.75 8.75 18.3097 8.75 19C8.75 19.6903 9.30966 20.25 10 20.25C10.6903 20.25 11.25 19.6903 11.25 19C11.25 18.3097 10.6903 17.75 10 17.75Z" fill="#1C1B1E"/>
				<path id="Vector (Stroke)_6" fill-rule="evenodd" clip-rule="evenodd" d="M1.69675 12.6189C3.01208 11.8595 4.69392 12.3102 5.45332 13.6255C6.21273 14.9408 5.76207 16.6226 4.44676 17.382C3.13144 18.1414 1.44957 17.6908 0.690176 16.3755C-0.0692136 15.0601 0.381449 13.3783 1.69674 12.6189L1.69675 12.6189ZM2.44675 13.9179C1.84888 14.2631 1.64404 15.0276 1.98922 15.6255C2.3344 16.2233 3.09887 16.4282 3.69675 16.083C4.29464 15.7378 4.49947 14.9733 4.15429 14.3755C3.80909 13.7776 3.04464 13.5727 2.44676 13.9179" fill="#1C1B1E"/>
				<path id="Vector (Stroke)_7" fill-rule="evenodd" clip-rule="evenodd" d="M0.690176 5.62547C1.44957 4.31015 3.13144 3.85949 4.44676 4.6189C5.76207 5.37831 6.21273 7.06014 5.45332 8.37547C4.69392 9.69078 3.01208 10.1414 1.69675 9.38204L1.69674 9.38203C0.381449 8.62263 -0.0692136 6.94079 0.690176 5.62547ZM3.69675 5.91794C3.09887 5.57275 2.3344 5.77759 1.98922 6.37546C1.64404 6.97334 1.84888 7.73781 2.44676 8.083L2.07175 8.73252L2.44676 8.083C3.04464 8.42819 3.80909 8.22335 4.15429 7.62547C4.49947 7.02759 4.29464 6.26313 3.69675 5.91794ZM2.07175 8.73252L2.07031 8.735L2.07175 8.73252Z" fill="#1C1B1E"/>
			</g>
			</g>
			<defs>
			<clipPath id="clip0_175_53">
			<rect width="20" height="22" fill="white"/>
			</clipPath>
			</defs>
		</svg>
		<a href="/" target="_self">
		<svg id="logoa" width="100%" height="100%" viewBox="0 0 479 51" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path id="firstf" d="M23.9766 39.0003V1.19629H0.0565605L0.0305595 7.54029H20.7006L16.7226 3.66629V19.7863L20.6746 17.1603H2.08456L2.11056 23.3743H18.8286L16.7226 21.3203V39.0003H23.9766Z" fill="white"/>
			<path d="M51.4899 39.0003L43.5079 23.8423H38.8279L37.1119 23.4523L37.8659 18.7463V17.9143H43.5599C44.9812 17.9143 46.1252 17.6803 46.9919 17.2123C47.8759 16.727 48.5172 16.051 48.9159 15.1843C49.3319 14.3176 49.5399 13.3036 49.5399 12.1423C49.5399 10.7556 49.2799 9.69829 48.7599 8.97029C48.2399 8.24229 47.5465 7.73096 46.6799 7.43629C45.8132 7.14162 44.8339 6.99429 43.7419 6.99429L39.2959 6.96829L38.1519 4.60229L37.0859 1.19629C37.7965 1.19629 38.5245 1.19629 39.2699 1.19629C40.0152 1.19629 40.7952 1.19629 41.6099 1.19629C42.4245 1.19629 43.2912 1.19629 44.2099 1.19629C48.1445 1.19629 51.2039 2.08896 53.3879 3.87429C55.5892 5.65962 56.6899 8.41562 56.6899 12.1423C56.6899 13.373 56.5079 14.595 56.1439 15.8083C55.7972 17.0216 55.2339 18.1483 54.4539 19.1883C53.6739 20.211 52.6512 21.0603 51.3859 21.7363C50.1379 22.4123 48.6299 22.8283 46.8619 22.9843L47.2779 22.4123C48.0405 22.4123 48.6905 22.473 49.2279 22.5943C49.7652 22.7156 50.2419 22.9583 50.6579 23.3223C51.0912 23.669 51.4899 24.189 51.8539 24.8823L59.2379 39.0003H51.4899ZM32.1719 39.0003V1.19629H39.3739V39.0003H32.1719Z" fill="white"/>
			<path d="M60.1797 39.0003L70.7097 1.19629H81.3957L91.8997 39.0003H84.2557L81.2657 27.1703L85.3477 30.1603H68.0057L68.9677 24.2583H83.6837L81.2397 27.0923L78.1717 14.3263L76.2477 6.24029H75.8317L73.9337 14.3263L67.8237 39.0003H60.1797Z" fill="white"/>
			<path d="M108.493 39.7541C105.564 39.7541 103.068 38.9568 101.005 37.3621C98.9596 35.7675 97.3996 33.4968 96.3249 30.5501C95.2502 27.5861 94.7129 24.0588 94.7129 19.9681C94.7129 15.8428 95.2676 12.3328 96.3769 9.43814C97.4862 6.52614 99.1069 4.30747 101.239 2.78214C103.371 1.25681 105.962 0.494141 109.013 0.494141C111.509 0.494141 113.658 1.04881 115.461 2.15814C117.281 3.26747 118.668 4.90547 119.621 7.07214C120.592 9.22147 121.051 11.8561 120.999 14.9761H114.031C113.944 13.2775 113.71 11.8561 113.329 10.7121C112.965 9.55081 112.41 8.68414 111.665 8.11214C110.937 7.52281 109.958 7.22814 108.727 7.22814C107.254 7.22814 106.014 7.67881 105.009 8.58014C104.004 9.46414 103.25 10.8508 102.747 12.7401C102.244 14.6295 102.002 17.0735 102.019 20.0721C102.036 24.2148 102.6 27.4128 103.709 29.6661C104.836 31.9021 106.456 33.0201 108.571 33.0201C109.819 33.0201 110.807 32.8208 111.535 32.4221C112.28 32.0235 112.818 31.4428 113.147 30.6801C113.494 29.9001 113.684 28.9555 113.719 27.8461H120.895C120.86 29.7875 120.522 31.5035 119.881 32.9941C119.257 34.4675 118.382 35.7068 117.255 36.7121C116.146 37.7175 114.846 38.4801 113.355 39.0001C111.864 39.5028 110.244 39.7541 108.493 39.7541Z" fill="white"/>
			<path d="M136.839 38.9998V10.4518C136.839 9.6718 137.004 9.03914 137.333 8.5538C137.68 8.06847 138.208 7.76514 138.919 7.6438H127.089V1.1958H153.869V7.6438H144.119V38.9998H136.839Z" fill="white"/>
			<path d="M156.839 39.0003L167.369 1.19629H178.055L188.559 39.0003H180.915L177.925 27.1703L182.007 30.1603H164.665L165.627 24.2583H180.343L177.899 27.0923L174.831 14.3263L172.907 6.24029H172.491L170.593 14.3263L164.483 39.0003H156.839Z" fill="white"/>
			<path id="long" d="M194.284 39.0003V1.19629H201.642V36.4523L197.534 32.4743H217.424V39.0003H194.284Z" fill="white"/>
			<path id="mand" d="M255.032 39.0003L255.942 1.19629H265.718L268.656 17.0823L269.306 21.8143H269.462L270.06 17.0823L272.972 1.19629H282.774L283.684 39.0003H277.496L277.366 23.2963L277.6 6.00629H277.184L275.208 15.1583L272.088 29.4063H266.628L263.456 15.1583L261.506 6.00629H261.064L261.376 23.2963L261.22 39.0003H255.032Z" fill="white"/>
			<path d="M285.718 39.0003L296.248 1.19629H306.934L317.438 39.0003H309.794L306.804 27.1703L310.886 30.1603H293.544L294.506 24.2583H309.222L306.778 27.0923L303.71 14.3263L301.786 6.24029H301.37L299.472 14.3263L293.362 39.0003H285.718Z" fill="white"/>
			<path id="then" d="M346.641 39.0003V1.19629H337.671L329.663 22.9323L326.725 31.7723H326.543L327.817 20.6703V1.19629H320.953V39.0003H329.975L337.931 17.3683L340.739 8.99629H340.973L339.777 20.0203V39.0003H346.641Z" fill="white"/>
			<path d="M360.609 39.0003L358.789 32.3963H363.131C365.177 32.3963 366.91 31.9803 368.331 31.1483C369.77 30.299 370.862 28.947 371.607 27.0923C372.37 25.2376 372.751 22.811 372.751 19.8123C372.751 16.779 372.405 14.387 371.711 12.6363C371.018 10.8856 369.943 9.64629 368.487 8.91829C367.031 8.19029 365.142 7.82629 362.819 7.82629H358.607L360.609 1.19629H363.287C368.747 1.19629 372.925 2.71296 375.819 5.74629C381.431 11.6268 381.499 23.2409 378.081 30.2903C376.695 33.1503 374.736 35.317 372.205 36.7903C369.692 38.2636 366.719 39.0003 363.287 39.0003H360.609ZM353.407 39.0003V1.19629H360.609V39.0003H353.407Z" fill="white"/>
			<path d="M382.377 39.0003L392.907 1.19629H403.593L414.097 39.0003H406.453L403.463 27.1703L407.545 30.1603H390.203L391.165 24.2583H405.881L403.437 27.0923L400.369 14.3263L398.445 6.24029H398.029L396.131 14.3263L390.021 39.0003H382.377Z" fill="white"/>
			<path id="thel" d="M419.822 39.0003V1.19629H427.18V36.4523L423.072 32.4743H442.962V39.0003H419.822Z" fill="white"/>
			<path d="M446.815 39.0003L457.345 1.19629H468.031L478.535 39.0003H470.891L467.901 27.1703L471.983 30.1603H454.641L455.603 24.2583H470.319L467.875 27.0923L464.807 14.3263L462.883 6.24029H462.467L460.569 14.3263L454.459 39.0003H446.815Z" fill="white"/>
			<circle id="circle1" cx="334" cy="48" r="3" fill="#10D56C"/>
			<circle id="circle2" cx="364" cy="48" r="3" fill="#10D56C"/>
		</svg>
		</a>
		<svg id="searcha" width="100%" height="100%" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={toggleWant} on:keydown={toggleWant}>
			<path d="M18.2061 0.827637C8.28074 0.827637 0.206055 8.90232 0.206055 18.8276C0.206055 28.7529 8.28074 36.8276 18.2061 36.8276C28.1314 36.8276 36.2061 28.7529 36.2061 18.8276C36.2061 8.90232 28.1314 0.827637 18.2061 0.827637ZM26.7664 27.3879C26.4851 27.669 26.1037 27.8269 25.7061 27.8269C25.3084 27.8269 24.927 27.669 24.6457 27.3879L20.6295 23.3726C18.9328 24.5402 16.861 25.0315 14.8206 24.7502C12.7803 24.4689 10.9188 23.4352 9.6013 21.8521C8.28384 20.2689 7.60558 18.2506 7.69962 16.1931C7.79365 14.1356 8.65319 12.1875 10.1096 10.7312C11.5659 9.27478 13.514 8.41523 15.5715 8.3212C17.629 8.22716 19.6473 8.90542 21.2305 10.2229C22.8136 11.5403 23.8473 13.4019 24.1286 15.4422C24.4099 17.4825 23.9186 19.5543 22.7511 21.2511L26.7664 25.2673C27.0475 25.5486 27.2054 25.93 27.2054 26.3276C27.2054 26.7253 27.0475 27.1067 26.7664 27.3879Z" fill="#272727"/>
			<path d="M15.9561 21.8276C18.8555 21.8276 21.2061 19.4771 21.2061 16.5776C21.2061 13.6781 18.8555 11.3276 15.9561 11.3276C13.0566 11.3276 10.7061 13.6781 10.7061 16.5776C10.7061 19.4771 13.0566 21.8276 15.9561 21.8276Z" fill="#272727"/>
		</svg>
		{#if wantSearch}
			<div class="inputter" in:fly={{duration: 700, x: 129, y: 0, easing: expoInOut}}>
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
					<button on:click={searchWord}>Search</button>
				</form>
			</div>
		{/if}
	</div>	
	<div class="body">
		<slot></slot>
	</div>
	<div class="footer">
	<div class="textfooter">
		<h6 class="grey w400">All Rights Reserved | 2023 | Amritanshu Pandey</h6>
	</div>
	<div class="boxr"><a href="https://github.com/fractalmandala" target="_blank" rel="noreferrer">
		<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path id="githubicon" d="M24 0.593994C10.74 0.593994 0 11.34 0 24.594C0 35.2 6.876 44.194 16.41 47.364C17.61 47.59 18.05 46.848 18.05 46.21C18.05 45.64 18.03 44.13 18.02 42.13C11.344 43.578 9.936 38.91 9.936 38.91C8.844 36.14 7.266 35.4 7.266 35.4C5.092 33.912 7.434 33.942 7.434 33.942C9.844 34.11 11.11 36.414 11.11 36.414C13.25 40.084 16.728 39.024 18.1 38.41C18.316 36.858 18.934 35.8 19.62 35.2C14.29 34.6 8.688 32.536 8.688 23.34C8.688 20.72 9.618 18.58 11.158 16.9C10.888 16.294 10.078 13.854 11.368 10.548C11.368 10.548 13.378 9.90399 17.968 13.008C19.888 12.474 21.928 12.21 23.968 12.198C26.008 12.21 28.048 12.474 29.968 13.008C34.528 9.90399 36.538 10.548 36.538 10.548C37.828 13.854 37.018 16.294 36.778 16.9C38.308 18.58 39.238 20.72 39.238 23.34C39.238 32.56 33.628 34.59 28.288 35.18C29.128 35.9 29.908 37.372 29.908 39.62C29.908 42.832 29.878 45.412 29.878 46.192C29.878 46.822 30.298 47.572 31.528 47.332C41.13 44.184 48 35.184 48 24.594C48 11.34 37.254 0.593994 24 0.593994Z" fill="url(#paint0_linear_347_8)"/>
			<defs>
			<linearGradient id="paint0_linear_347_8" x1="24" y1="0.593994" x2="24" y2="47.4055" gradientUnits="userSpaceOnUse">
			<stop stop-color="#53DD6C"/>
			<stop offset="1" stop-color="#10C56E"/>
			</linearGradient>
			</defs>
		</svg></a>
		<a href="https://twitter.com/saamaanyafreaky" target="_blank" rel="noreferrer">
		<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path id="twittericon" d="M24 0C10.7464 0 0 10.7464 0 24C0 37.2536 10.7464 48 24 48C37.2536 48 48 37.2536 48 24C48 10.7464 37.2536 0 24 0ZM35.5339 18.0911C35.55 18.3429 35.55 18.6054 35.55 18.8625C35.55 26.7268 29.5607 35.7857 18.6161 35.7857C15.2411 35.7857 12.1125 34.8054 9.47679 33.1179C9.95893 33.1714 10.4196 33.1929 10.9125 33.1929C13.6982 33.1929 16.2589 32.25 18.3 30.6536C15.6857 30.6 13.4893 28.8857 12.7393 26.5286C13.6554 26.6625 14.4804 26.6625 15.4232 26.4214C14.0771 26.1479 12.8672 25.4169 11.999 24.3524C11.1308 23.2879 10.658 21.9557 10.6607 20.5821V20.5071C11.4482 20.9518 12.375 21.225 13.3446 21.2625C12.5295 20.7193 11.861 19.9833 11.3985 19.1198C10.9359 18.2563 10.6935 17.2921 10.6929 16.3125C10.6929 15.2036 10.9821 14.1911 11.5018 13.3125C12.9959 15.1518 14.8603 16.6561 16.9739 17.7277C19.0875 18.7992 21.4029 19.414 23.7696 19.5321C22.9286 15.4875 25.95 12.2143 29.5821 12.2143C31.2964 12.2143 32.8393 12.9321 33.9268 14.0893C35.2714 13.8375 36.5571 13.3339 37.7036 12.6589C37.2589 14.0357 36.3268 15.1982 35.0893 15.9321C36.2893 15.8036 37.4464 15.4714 38.5179 15.0054C37.7089 16.1946 36.6964 17.25 35.5339 18.0911Z" fill="url(#paint0_linear_347_10)"/>
			<defs>
			<linearGradient id="paint0_linear_347_10" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
			<stop stop-color="#10C56E"/>
			<stop offset="1" stop-color="#53DD6C"/>
			</linearGradient>
			</defs>
		</svg></a>
	</div>
	</div>
</div>
{#if loadingStore}
<div class="searchresultsbox" class:openedbox={loadingStore}>
	<p>Loading...</p>
</div>
{/if}
{#if showResults}
<div class="searchresultsbox" class:openedbox={showResults} on:click={closeResults} on:keydown={closeResults} on:click={toggleWant} on:keydown={toggleWant}>
	{#if $resultsStore.length>0}
		{#each $resultsStore as item, i}
			<p in:fly={{ duration: 200, delay: i*100, x: 128}}><a href="/{item.id}">{item.title}</a></p>
		{/each}
	{/if}
</div>
{/if}
{#if bigMenu}
<div class="body2" on:click={toggleBigmenu} on:keydown={toggleBigmenu} in:receive={{ key: 'a', easing: expoInOut}} out:send={{ key: 'a', easing: expoOut}}>
  <div class="stripper">
		<div class="stripfilt" on:click={() => toggleBig(1)} on:keydown={() => toggleBig(1)} class:selected={bigItems[1]}>
			all code
		</div>
		<div class="stripfilt" on:click={() => toggleBig(2)} on:keydown={() => toggleBig(2)} class:selected={bigItems[2]}>
			documentations
		</div>
		<div class="stripfilt">
			svelte
		</div>
		<div class="stripfilt">
			animations
		</div>
		<div class="stripfilt">
			setups
		</div>
		<div class="stripfilt">
			all notes
		</div>
	</div>
	<div class="layer">
	{#if bigItems[1]}
	<div class="sixboxes">
  	<div class="box11 filt">
		<h4>HTML</h4>
		{#if htms && htms.length>0}
			{#each htms as item, i}
				<h5><a href="/{item.id}">{item.title}</a></h5>
			{/each}
		{/if}
		</div>
  	<div class="box12 filt">
		<h4>JS</h4>
		{#if jss && jss.length>0}
			{#each jss as item}
				<h5><a href="/{item.id}">{item.title}</a></h5>
			{/each}
		{/if}
		<h4>Key</h4>
		{#if codes22 && codes22.length>0}
			{#each codes22 as item}
				<h5><a href={item.path}>{item.meta.title}</a></h5>
			{/each}
		{/if}
		</div>
  	<div class="box13 filt">
		<h4>SQL</h4>
		{#if sqls && sqls.length>0}
			{#each sqls as item}
				<h5><a href="/{item.id}">{item.title}</a></h5>
			{/each}
		{/if}
		<h4>CSS</h4>
		{#if csss && csss.length>0}
			{#each csss as item}
				<h5><a href="/{item.id}">{item.title}</a></h5>
			{/each}
		{/if}
		</div>
  	<div class="box14 filt">
		</div>
  	<div class="box15 filt">
		</div>
  	<div class="box16"></div>
	</div>
	{/if}
	{#if bigItems[2]}
	<div class="columner">
		{#if docus && docus.length > 0}
		{#each docus as item}
		<div class="boxc">
		<h5><a href={item.path}>{item.meta.title}</a></h5>
		<pre class="language-javascript"><code>{item.content}</code></pre>
		</div>
		{/each}
		{/if}
	</div>
	{/if}
	</div>
</div>
{/if}

<style lang="sass">

.filt
	.boxr
		align-items: center


.searchresultsbox
	flex-direction: column
	gap: 0
	display: none

.searchresultsbox.openedbox
	position: absolute
	display: flex
	top: 64px
	height: max-content
	width: 400px
	padding: 16px
	left: 40vw
	background: #171717
	border: 1px solid #272727
	p
		margin: 0
		font-size: 20px
		color: #474747
		&:hover
			color: white

.inputter
	input
		outline: none
	input:focus
		border: 1px solid #474747
	button
		background: var(--dark)
		border: none
		color: white
		cursor: pointer
		padding: 4px

#notes
	p
		margin: 0
		color: #272727
		text-transform: uppercase
		font-size: 12px
	h5
		font-size: 32px
		padding: 0
		margin: 0
	.boxc
		&:hover
			p
				color: #10D56C
	grid-template-columns: 1fr

#searcha
	width: 24px
	cursor: pointer
	&:hover
		path
			fill: #10D56C

.bigmenu
	background: #171717
	position: fixed
	top: 64px
	left: 0
	height: calc(100vh - 64px)
	overflow: hidden
	width: 100vw
	z-index: 900
	display: flex
	flex-direction: column
	gap: 0
	padding: 64px
	font-family: 'Barlow', sans-serif
	.topstrip
		display: flex
		flex-direction: row
		align-items: center
		gap: 32px
		padding-bottom: 32px
		.filter
			text-transform: uppercase
			color: #272727
			font-size: 24px
			font-weight: bold	
			padding-left: 20px
			padding-right: 20px
			cursor: pointer
			&:hover
				color: #10D56C
		.filter.selectedfilter
			background: #26a84d
			color: white
	@media screen and (max-width: 1023px)
		height: calc(100vh - 64px)
		overflow-y: hidden
		padding: 16px
		.topstrip
			gap: 8px
			.filter
				padding-left: 8px
				padding-right: 8px
				font-size: 18px
		.mainstrip
			overflow-y: scroll

.simplegrid::-webkit-scrollbar
	width: 1px

.simplegrid::-webkit-scrollbar-track
	background: #171717

.bigmenu::-webkit-scrollbar
	width: 0px
		
.mainstrip
	display: grid
	grid-auto-flow: row
	grid-template-columns: 1fr
	grid-template-rows: 1fr
	grid-template-areas: "simplegrid"
	background: #171717
	gap: 0 64px
	width: 100%
	height: 100%
	padding-top: 16px
	padding-bottom: 64px
	overflow-y: scroll
	.simplegrid
		grid-area: simplegrid

.simplegrid
	background: #171717
	width: 100%
	height: 100%
	display: grid
	grid-auto-flow: row
	grid-template-columns: 1fr 1fr
	grid-template-rows: auto auto auto
	align-items: start
	align-content: start
	grid-template-areas: "col1 col2" "col1 col3" "col1 col4"
	gap: 24px 48px
	.col1
		grid-area: col1
	.col2
		grid-area: col2
	.col3
		grid-area: col3
	.col4
		grid-area: col4
	h5
		margin: 0
		font-size: 16px
		text-transform: uppercase
		padding: 6px 0
		color: #272727
		transition: all 0.08s var(--cnew)
		border-bottom: 1px solid #212121
		cursor: pointer
		&:hover
			color: white
			padding-left: 4px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr
		grid-template-rows: auto auto auto auto
		grid-template-areas: "col1" "col2" "col3" "col4"
		gap: 16px 0
		overflow-y: scroll

.mainstrip::-webkit-scrollbar
	width: 1px
	background: #10D56C
.mainstrip::-webkit-scrollbar-track
	background: transparent
.mainstrip::-webkit-scrollbar-thumb
	background: #10D56C
	border-top: 400px solid #171717
	border-bottom: 400px solid #171717

#fractala.openedicon
	#strokes
		path
			fill: white

#fractala
	height: 24px
	width: 24px
	margin-left: 12px
	cursor: pointer
	#fills
		path
			fill: transparent
	#strokes
		path
			fill: #272727
	&:hover
		#Vector
			animation: rising 0.04s var(--cnew) forwards
		#Vector_2
			animation: rising 0.04s var(--cnew) 0.03s forwards
		#Vector_3
			animation: rising 0.04s var(--cnew) 0.06s forwards
		#Vector_4
			animation: rising 0.04s var(--cnew) 0.09s forwards
		#Vector_5
			animation: rising 0.04s var(--cnew) 0.12s forwards
		#Vector_6
			animation: rising 0.04s var(--cnew) 0.15s forwards
		#Vector_7
			animation: rising 0.04s var(--cnew) 0.18s forwards
		#strokes
			path
				animation: rising 0.04s var(--cnew) 0.21s forwards
				

@keyframes rising
	0%
		fill: transparent
	100%
		fill: #10C56D
	

.footer
	display: flex
	flex-direction: row
	align-items: center
	padding-left: 48px
	padding-right: 48px
	justify-content: space-between
	h6
		margin: 0
		color: #272727
		font-family: 'Barlow', sans-serif
		font-weight: 600
		letter-spacing: 1px
	.boxr
		align-items: center
		svg
			path
				fill: #272727
			&:hover
				path
					fill: #10D56C


.appcontainer
	display: grid
	grid-auto-flow: row
	grid-template-columns: 1fr
	grid-template-rows: 64px 1fr 1fr 64px
	grid-template-areas: "header" "body" "body2" "footer"
	gap: 0 0
	height: 100%
	@media screen and (min-width: 900px)
		.header
			grid-area: header
			display: flex
			flex-direction: row
			align-items: center
			justify-content: center
			height: 64px
			border-bottom: 1px solid #202020
			background: #151515
			position: sticky
			gap: 16px
			top: 0
			z-index: 999
			padding: 0 48px
			&::after
				position: absolute
				bottom: 0
				left: 0
				height: 2px
				width: 2px
				content: ''
				background: #10D56C
				box-shadow: 0 0 5px #10D56C, 0 0 10px #78FF38, 0 0 20px #10D56C, 0 0 30px #78FF38
				animation: spin 30s var(--cnew) infinite alternate-reverse
	.body
		grid-area: body
		height: 100%
		min-height: calc(100vh - 128px)
		display: grid
		grid-auto-flow: row
		grid-template-columns: 1fr
		grid-template-areas: "."
		grid-template-rows: 1fr
		padding-left: 0
		padding-right: 0
		padding-bottom: 64px
		@media screen and (min-width: 900px)
			grid-template-columns: 1fr
			grid-template-rows: auto
			grid-template-areas: "."
	.footer
		grid-area: footer
		height: 64px
		border-top: 1px solid #272727
	.body2
		grid-area: body2
		z-index: 900
		height: 100vh
		width: 100vw
		background: #151515

@keyframes selectiongrowth
	0%
		width: 0
	100%
		width: 100%

@keyframes verticaler
	0%
		height: 0
		margin-top: 50%
	100%
		height: 100%
		margin-top: 0%

#circle1
	animation: firstguy 8s ease infinite

#circle2
	animation: secondguy 8s ease infinite

@keyframes secondguy
	0%
		opacity: 0
	50%
		opacity: 1
	100%
		opacity: 0

@keyframes firstguy
	0%
		opacity: 1
	50%
		opacity: 0
	100%
		opacity: 1

@keyframes spin
	0%
		width: 4px
		margin-left: 0%
	30%
		width: 6px
		margin-left: 70%
	60%
		width: 1px
		margin-left: 40%
	100%
		width: 3px
		margin-left: calc(100% - 3px)

@keyframes wavering
	0%
		transform: translate(0, 0)
	35%
		transform: translate(2px, 2px)
	45%
		transform: translate(3px, -1px)
	60%
		transform: translate(0, 2px)
	70%
		transform: translate(2px, -2px)
	80%
		transform: translate(-2px, 2px)
	100%
		transform: translate(0, 0)

@keyframes rotating
	0%
		transform: translateZ(0px) perspective(0px)
	100%
		transform: translateZ(10px) perspective(200px) scale(0.5)


.header
	grid-area: header
	display: flex
	flex-direction: row
	align-items: center
	justify-content: center
	border-bottom: 1px solid #202020
	background: #151515
	position: sticky
	top: 0
	gap: 8px
	z-index: 999
	@media screen and (max-width: 899px)
		padding: 0 16px

#logoa
	svg
		object-fit: cover
		height: 24px
		path
			fill: #272727
	object-fit: cover
	height: 27px
	margin-top: 8px
	#long
		transform-origin: center center
	&:hover
		#mand
			animation: wavering 0.5s var(--cubez) infinite alternate
		#long
			animation: rotating 2s ease infinite alternate-reverse
	path
		fill: #272727
		transition: all 0.8s var(--cnew)
	&:hover
		path
			fill: #10D56C
		#firstf
			transform: scaleX(-1) translateX(-24px) translate3D(0, 12px, 0)
			transform-origin: left center
		#thel
			transform: scaleY(-1) translateY(-40px)
			fill: white

</style>
```
