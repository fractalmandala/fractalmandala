<script lang="ts">

	import { onMount } from 'svelte'
	import { invalidate } from '$app/navigation'
	import type { LayoutData } from './$types'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
	import Lenis from '@studio-freight/lenis'
	import { page } from '$app/stores'
	import '$lib/styles/tokens.sass'
	import '$lib/styles/animations.sass'
	import '$lib/styles/saved.sass'

	let y:number
	let mobileView:boolean = false
	let mobileViewEnable:boolean = true
	let screenWidth:number
	let startsearch:boolean = false
	let appearance:number = 50
	let linksonmobile:boolean = true
	let pageurl:any	
	let isHover:any
	let pageurlcut:any

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

	$: ({ supabase, session } = data)

	onMount(async() => {
		pageurl = $page.url.pathname
		isHover = pageurl
		pageurlcut = pageurl.substr(0,8)
		const lenis = new Lenis({
			duration: 1.2,
			orientation: 'vertical',
			gestureOrientation: 'vertical',
			wheelMultiplier: 0.8,
			smoothWheel: true,
			touchMultiplier: 1,
			infinite: false,
		})
		function raf(time: any){
		lenis.raf(time)
		requestAnimationFrame(raf)
		}
		requestAnimationFrame(raf)	
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})
		return () => data.subscription.unsubscribe()
		})


	export let data: LayoutData

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={screenWidth}/>

<svelte:head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1JFGGCTBC9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1JFGGCTBC9');
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Spline+Sans+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Spline+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>





<Header>
</Header>
	<slot></slot>
<Footer></Footer>


