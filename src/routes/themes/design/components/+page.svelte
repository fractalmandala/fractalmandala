<script lang="ts">

	import { ChevronDown, ChevronUp, ChevronRight, X, Search } from 'lucide-svelte'
	import { fly } from 'svelte/transition'
	import { quadIn } from 'svelte/easing'
	import autoAnimate from '@formkit/auto-animate'
	let openItem = Array(3).fill(false)
	let fake = false
	let alertOn = false
	let iW:number
	let breakPoint:boolean
	let expandDrawer = false


	function fauxfake(){
		fake = !fake
	}

	function toggleDrawer(){
		expandDrawer = !expandDrawer
	}

	function toggleAlert(){
		alertOn = !alertOn
	}

	function toggleAccordionItem(index:number){
		openItem[index] = !openItem[index]
		for ( let i = 0; i < openItem.length; i++) {
			if ( i !==  index && openItem[i] === true) {
				openItem[i] = false
			}
		}
	}

	$: if ( iW <= 1023) {
		breakPoint = true
	} else {
		breakPoint = false
	}


</script>

<div class="rta-column">
	<h3 class="bord-bot p-bot-16">Components Library</h3>
	<p>
		Building my own UI components library is a long-term project I've taken on. Plan, roadmap and maybe even tools will change as I go along, but for now I'm building on Sveltekit, and am aiming for lowest dependency-model. This means no third-party libraries, despite how wonderfully convenient libraries like <a href="https://sveltelegos.com/" target="_blank" rel="noreferrer">Svelte Legos</a> and <a href="https://auto-animate.formkit.com/" target="_blank" rel="noreferrer">Auto Animate</a> are.
	</p>
</div>

<style lang="sass">

a
	position: relative
	color: var(--opposite)
	&::after
		position: absolute
		content: ''
		bottom: 0
		left: 0
		height: 1px
		width: 0%
		background: var(--opposite)
		transition: 0.2s
	&:hover
		color: var(--green)
		&::after
			width: 100%

</style>