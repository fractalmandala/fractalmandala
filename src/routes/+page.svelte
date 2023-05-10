<script lang="ts">

	import { onMount, afterUpdate } from 'svelte'
	import Logo from '$lib/assets/FMLogo.svelte'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	import '$lib/styles/prismtoolbar.css'
	import { browser } from '$app/environment'
	import LogoFMMotif from '$lib/components/LogoFMMotif.svelte'
	import '$lib/styles/themes.sass'
	import '$lib/styles/tokens.sass'
	import { limitNotes, onlyStarred, blogPosts, allCodes, allGenerals, allDocums, TagsFiltered, MidjourneyImages, chatswithGPT } from '$lib/utils/supabase'
	let codas:any
	let notes:any
	let gens:any
	let chats:any
	let docus:any
	let starred:any
	let sveltecodes:any
	let images:any
	let supas:any
	let posts:any
	let limit = 24
	let fake = false
	let gridalign = false
	let imagesLow = 0
	let imagesHigh = 11
	let low = 0
	let high = 11
	let width = "50%"
	let expand:boolean[] = Array(20).fill(false)
	expand[8] = true 
	let openThis:boolean[] = Array(200).fill(false)
	let nulled:boolean[] = Array(200).fill(false)

	function fauxfake(){
		fake = !fake
	}

	function nextTwelve(newLow:number,newHigh:number){
		low = newLow,
		high = newHigh
	}

	function togglePostItem(index:number){
		expand[index] = !expand[index]
			for (let i = 0; i < expand.length; i++) {
			if (i !== index && expand[i] === true) {
			expand[i] = false;
			}
		}
	}


	function toggleOpenItem(index:number){
		openThis[index] = !openThis[index]
			for (let i = 0; i < openThis.length; i++) {
			if (i !== index && openThis[i] === true) {
			openThis[i] = false;
			nulled[i] = true
			}
		}
		if ( gridalign === false) {
			gridalign = true
		}
	}

$:	if (browser && openThis) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}

	onMount(() => {
		Prism.highlightAll();

		(async () => {
			starred = await onlyStarred()
			posts = await blogPosts()
			notes = await limitNotes(limit)
			sveltecodes = await TagsFiltered('sveltecode')
			docus = await allDocums()
			supas = await TagsFiltered('supabase')
			codas = await allCodes()
			chats = await chatswithGPT()
			gens = await allGenerals()
			images = await MidjourneyImages(imagesLow,imagesHigh)
		})();
	})
</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
	<script src="./src/lib/utils/prismextras.ts"></script>
</svelte:head>


<div class="rta-column" id="panelone">
	<img src="/images/mands.webp" alt="mandala"/>
	<Logo width={width}></Logo>
	<p class="bord-top p-top-32">
		is a digital garden to chronicle what I learn and build. I develop web products, create historical fiction worlds, dabble in psytrance production and write essays on Indian history and civilizational consciousness.
	</p>
	<p>
		Beginning 2023, I have been scaffolding my way in web-dev using a range of online tutorials, and a healthy usage of chatGPT. I'm loving Sveltekit, and that's my select framework for this site. I haven't really tried SCSS, but I use original SASS because I like not having to use curly braces.
	</p>
	<!--
	<p>
		Some places I learn from:
	</p>
	<div class="rta-grid grid3">
		<div class="rta-column">
			<h6>Web Dev Stuff:</h6>
			<ul>
				<li>
					Joy of Code
				</li>
			</ul>
		</div>
		<div class="rta-column">
			<h6>Tech, AI, Cool New Things:</h6>
		</div>
		<div class="rta-column">
			<h6>History, Religion, Philosophy:</h6>
		</div>
	</div>
	-->
	<p>Read my essays on Indian civilizational consciousness here.</p>
	<p>My amateur forays in psytrance production can be grooved to here.</p>
	<p>Experiments with Midjourney-based storytelling, and the full gallery.</p>
	<p>For the rest, the sidebar on left (menu on mobile) should help.</p>
	<LogoFMMotif/>
</div>

<style lang="sass">

#panelone
	position: relative
	z-index: 0
	img
		position: absolute
		right: 0
		top: 0
		filter: saturate(0.01)
		z-index: -1
		opacity: 0.05
		animation: mandaling 16s ease-in infinite 
		@media screen and (min-width: 1024px)
			object-fit: cover
			height: 280px
	@media screen and (min-width: 1024px)
		padding-right: 280px

@keyframes mandaling
	0%
		filter: saturate(0.01)
		opacity: 0.05
	50%
		filter: saturate(1)
		opacity: 1
	100%
		filter: saturate(0.01)
		opacity: 0.05

</style>