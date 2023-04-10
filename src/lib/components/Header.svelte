<script lang="ts">

	import { onMount } from 'svelte'
	import { scale, fly } from 'svelte/transition'
	import LogoFM from '$lib/components/LogoFM.svelte'
	import MandalaIcon from '$lib/components/MandalaIcon.svelte'
	import MandalaIcon2 from '$lib/components/MandalaIcon.svelte'
	import IconBallDown from '$lib/components/IconBallDown.svelte'
	import IconBallLeft from '$lib/components/IconBallLeft.svelte'
	import IconBallRight from '$lib/components/IconBallRight.svelte'
	import IconBallUp from '$lib/components/IconBallUp.svelte'

	let y:number
	let isInvisible:boolean = false
	let height:number
	let thewidth:number
	let mouseY:number
	let latestScrollY:number
	let leftball:boolean = false
	let topball:boolean = false
	let botball:boolean = false
	let rightball:boolean = false
	let expandedMenu:boolean = false
	let fake:boolean = false

	function fakefaux(){
		fake = !fake
	}

	function toggleMenu(){
		if ( thewidth <= 1023 ) {
			expandedMenu = !expandedMenu
		} else {
			expandedMenu = true
		}
	}

	function toggleleft(){
		leftball = !leftball
	}
	
	function toggleUp(){
		topball = !topball
	}

	function toggleBot(){
		botball = !botball
	}

	function toggleLast(){
		rightball = !rightball
	}

	onMount(() => {
		height = document.body.scrollHeight
	})

	$: {
		if ( y > 100 && y > latestScrollY ) {
			isInvisible = true
		} else {
			isInvisible = false
		}

		latestScrollY = y
	}

	$: if ( thewidth <= 1023 ) {
		expandedMenu = false
	} else {
		expandedMenu = true
	}

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={thewidth}/>

<div class="headerouter" class:hiddenheader={isInvisible}>
	<div class="topcol">
		<LogoFM></LogoFM>
	</div>
	<div class="botcol">
		<div class="lefticon" style="transform: rotate({y/4}deg)">
			<a href="/" target="_self">
				<MandalaIcon></MandalaIcon>
			</a>
		</div>
		<div class="midlinks">
		<div class="leftballs">
			<a href="/pad" target="_self" on:mouseenter={toggleleft} on:mouseleave={toggleleft}>
				<div id="ibl">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate({y/4}deg)">
						<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M1.19249e-07 10C1.52179e-07 12.7615 1.11935 15.2615 2.9289 17.0711C4.73855 18.8807 7.23855 20 10 20C12.7614 20 15.2614 18.8807 17.0711 17.0711C18.8807 15.2615 20 12.7615 20 10C20 7.2386 18.8807 4.7386 17.0711 2.92894C15.2614 1.11929 12.7614 8.63194e-08 10 1.19249e-07C7.23855 1.52179e-07 4.73855 1.11929 2.9289 2.92894C1.11935 4.7386 8.63194e-08 7.2386 1.19249e-07 10Z" fill="#272727"/>
						<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M5.58057 4.51991C5.87347 4.8128 5.87348 5.28767 5.58059 5.58057C4.44877 6.71243 3.75 8.27391 3.75 10C3.75 11.7261 4.44877 13.2876 5.58059 14.4194C5.87348 14.7123 5.87347 15.1872 5.58057 15.4801C5.28767 15.773 4.8128 15.773 4.51991 15.4801C3.11833 14.0784 2.25 12.1399 2.25 10C2.25 7.86009 3.11832 5.92157 4.51991 4.51993C4.8128 4.22703 5.28767 4.22702 5.58057 4.51991Z" fill="#10D56C"/>
					</svg>
					{#if leftball}
						<p in:scale out:scale>PAD</p>
					{/if}
				</div>
			</a>
			<div id="ibu" on:mouseenter={toggleUp} on:mouseleave={toggleUp}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate({-y/4}deg)">
					<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M10 8.74228e-07C7.23855 1.11564e-06 4.73855 1.11935 2.9289 2.9289C1.11935 4.73855 -1.11564e-06 7.23855 -8.74228e-07 10C-6.32819e-07 12.7614 1.11935 15.2614 2.9289 17.0711C4.73855 18.8807 7.23855 20 10 20C12.7614 20 15.2614 18.8807 17.0711 17.0711C18.8807 15.2614 20 12.7614 20 10C20 7.23855 18.8807 4.73855 17.0711 2.9289C15.2614 1.11935 12.7614 6.32819e-07 10 8.74228e-07Z" fill="#272727"/>
					<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M15.4801 5.58057C15.1872 5.87347 14.7123 5.87348 14.4194 5.58059C13.2876 4.44877 11.7261 3.75 10 3.75C8.27391 3.75 6.71243 4.44877 5.58057 5.58059C5.28767 5.87348 4.81279 5.87347 4.51991 5.58057C4.22702 5.28767 4.22703 4.8128 4.51993 4.51991C5.92157 3.11833 7.86009 2.25 10 2.25C12.1399 2.25 14.0784 3.11833 15.4801 4.51991C15.773 4.8128 15.773 5.28767 15.4801 5.58057Z" fill="#10D56C"/>
				</svg>
				{#if topball}
					<p in:scale out:scale>NOTE</p>
				{/if}
			</div>
		</div>
		<div class="istheslot">
			<svg class:rotatedsvg={expandedMenu} width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={toggleMenu} on:keydown={fakefaux}>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M9.99995 12.5L4 6.5H7.99995V1H12V6.5H16L9.99995 12.5Z" fill="white"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M7.24995 1C7.24995 0.585786 7.58574 0.25 7.99995 0.25H12C12.4142 0.25 12.75 0.585786 12.75 1V5.75H16C16.3033 5.75 16.5768 5.93274 16.6929 6.21299C16.8089 6.49325 16.7448 6.81584 16.5303 7.03033L10.5303 13.0303C10.3896 13.171 10.1989 13.25 9.99995 13.25C9.80104 13.25 9.61027 13.171 9.46962 13.0303L3.46967 7.03033C3.25517 6.81583 3.191 6.49325 3.30709 6.21299C3.42318 5.93274 3.69665 5.75 4 5.75H7.24995V1ZM8.74995 1.75V6.5C8.74995 6.91422 8.41416 7.25 7.99995 7.25H5.81065L9.99995 11.4393L14.1893 7.25H12C11.5857 7.25 11.25 6.91422 11.25 6.5V1.75H8.74995Z" fill="white"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 16.5C0.25 16.0858 0.585786 15.75 1 15.75H19C19.4142 15.75 19.75 16.0858 19.75 16.5C19.75 16.9142 19.4142 17.25 19 17.25H1C0.585786 17.25 0.25 16.9142 0.25 16.5Z" fill="white"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M4.25 20C4.25 19.5858 4.58579 19.25 5 19.25H15C15.4142 19.25 15.75 19.5858 15.75 20C15.75 20.4142 15.4142 20.75 15 20.75H5C4.58579 20.75 4.25 20.4142 4.25 20Z" fill="white"/>
			</svg>
		</div>
		{#if expandedMenu}
			<div class="istherealslot" in:fly={{ duration: 400, x: 0, y: -800}} out:fly={{ duration: 200, x: 0, y: -800}} on:click={toggleMenu} on:keydown={fakefaux}>
				<slot></slot>
			</div>
		{/if}
		<div class="rightballs">
			<div id="ibr" on:mouseenter={toggleBot} on:mouseleave={toggleBot}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate({y/2}deg)">
					<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M10 20C12.7615 20 15.2615 18.8807 17.0711 17.0711C18.8807 15.2615 20 12.7615 20 10C20 7.2386 18.8807 4.7386 17.0711 2.92894C15.2615 1.11929 12.7615 0 10 0C7.2386 0 4.7386 1.11929 2.92894 2.92894C1.11929 4.7386 0 7.2386 0 10C0 12.7615 1.11929 15.2615 2.92894 17.0711C4.7386 18.8807 7.2386 20 10 20Z" fill="#272727"/>
					<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M4.51991 14.4194C4.8128 14.1265 5.28767 14.1265 5.58057 14.4194C6.71243 15.5512 8.27391 16.25 10 16.25C11.7261 16.25 13.2876 15.5512 14.4194 14.4194C14.7123 14.1265 15.1872 14.1265 15.4801 14.4194C15.773 14.7123 15.773 15.1872 15.4801 15.4801C14.0784 16.8817 12.1399 17.75 10 17.75C7.86009 17.75 5.92157 16.8817 4.51993 15.4801C4.22703 15.1872 4.22702 14.7123 4.51991 14.4194Z" fill="#10D56C"/>
				</svg>
				{#if botball}
					<p in:scale out:scale>DOCS</p>
				{/if}
			</div>
			<div id="ibd" on:mouseenter={toggleLast} on:mouseleave={toggleLast}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate({-y/2}deg)">
					<path class="gogreen" fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 7.23855 18.8806 4.73855 17.0711 2.9289C15.2614 1.11935 12.7614 -5.57821e-07 10 -4.37114e-07C7.2386 -3.16409e-07 4.7386 1.11935 2.92893 2.9289C1.11929 4.73855 -5.57821e-07 7.23855 -4.37114e-07 10C-3.16409e-07 12.7614 1.11929 15.2614 2.92893 17.0711C4.7386 18.8807 7.2386 20 10 20C12.7615 20 15.2615 18.8807 17.0711 17.0711C18.8807 15.2614 20 12.7614 20 10Z" fill="#272727"/>
					<path class="gogrey" fill-rule="evenodd" clip-rule="evenodd" d="M14.4194 15.4801C14.1265 15.1872 14.1265 14.7123 14.4194 14.4194C15.5512 13.2876 16.25 11.7261 16.25 10C16.25 8.27391 15.5512 6.71243 14.4194 5.58057C14.1265 5.28767 14.1265 4.8128 14.4194 4.51991C14.7123 4.22702 15.1872 4.22703 15.4801 4.51993C16.8817 5.92157 17.75 7.86009 17.75 10C17.75 12.1399 16.8817 14.0784 15.4801 15.4801C15.1872 15.773 14.7123 15.773 14.4194 15.4801Z" fill="#10D56C"/>
				</svg>
				{#if rightball}
					<p in:scale out:scale>SEARCH</p>
				{/if}
			</div>
		</div>
		</div>
		<div class="righticon" style="transform: rotate({-y/4}deg)">
			<a href="/mandala" target="_self">
				<MandalaIcon2></MandalaIcon2>
			</a>
		</div>
	</div>
</div>


<style lang="sass">



#ibl svg, #ibu svg, #ibr svg, #ibd svg
	object-fit: contain
	height: 20px
	width: 20px
	path
		transition: var(--snap)

.leftballs, .rightballs
	display: flex
	flex-direction: row
	align-items: center
	gap: 16px
	@media screen and (max-width: 1023px)
		gap: 40px

.leftballs a
	height: 20px

#ibl, #ibu, #ibr, #ibd
	height: 20px
	cursor: pointer

#ibl, #ibu, #ibr, #ibd
	position: relative
	p
		position: absolute
		top: 0
		right: 0
		margin: 0
		padding: 0

#ibl, #ibu, #ibr, #ibd
	&:hover
		animation: outermove 0.5s ease forwards
		svg
			animation: justshrinks 0.5s ease forwards
		.gogreen
			animation: goesgreen 0.5s ease forwards
		.gogrey
			animation: goesgrey 0.5s ease forwards

@keyframes outermove
	0%
		transform: translateX(0px)
		width: 21px
	100%
		transform: translateX(0px)
		width: 64px

@keyframes goesgreen
	0%
		fill: #272727
	100%
		fill: #10C56D

@keyframes goesgrey
	0%
		fill: #10C56D
	100%
		fill: #272727

@keyframes justshrinks
	0%
		transform: scale(1.0)
	100%
		transform: scale(0.4)

.headerouter
	height: 112px
	border-bottom: 1px solid #272727
	width: 100%
	display: flex
	flex-direction: column
	gap: 0
	position: fixed
	top: 0
	background-color: hsla(0,2%,2%,1)
	background-image: radial-gradient(at 80% 80%, hsla(101,3%,2%,1) 0px, transparent 5%), radial-gradient(at 40% 100%, hsla(126,75%,7%,1) 0px, transparent 50%)
	padding-left: 40px
	padding-right: 40px
	transition: 0.34s ease
	z-index: 999

.hiddenheader
	transform: translateY(-56px)

.topcol
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	height: 56px
	border-bottom: 1px solid #212121
	position: relative
	&::after
		position: absolute
		bottom: 0
		left: 0
		height: 1px
		width: 0%
		content: ''
		background: #10D56C
		animation: greenstreak 30s ease infinite alternate-reverse

.botcol
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center
	height: 56px

.lefticon
	display: flex
	flex-direction: row
	align-items: center
	height: 100%

@keyframes greenstreak
	0%
		width: 0
	30%
		width: 6px
		margin-left: 48%
	50%
		width: 3px
		margin-left: 70%
	100%
		width: 5px
		margin-left: calc(100% - 5px)

.midlinks
	display: flex
	overflow: visible
	@media screen and (min-width: 1024px)
		flex-direction: row
		gap: 12px
		align-items: center
		justify-content: center


.istherealslot
	display: flex
	transition: 0.3s ease
	@media screen and (min-width: 1024px)
		flex-direction: row
		display: flex
	@media screen and (max-width: 1023px)
		flex-direction: column
		position: absolute
		top: 56px
		left: 0
		background: #171717
		width: 100%
		height: calc(100vh - 56px)
		text-align: center
		padding-top: 32px
		border: 1px solid #272727


.istheslot svg
	@media screen and (min-width: 1024px)
		display: none
	@media screen and (max-width: 1023px)
		object-fit: contain
		height: 20px
		width: 20px

.botcol
	@media screen and (max-width: 1023px)
		position: relative

.istheslot
	@media screen and (min-width: 1024px)
		display: none
	@media screen and (max-width: 1023px)
		padding-left: 32px
		padding-right: 32px

.rotatedsvg
	animation: rotattor 0.4s ease forwards

@keyframes rotattor
	0%
		transform: rotate(0deg)
	100%
		transform: rotate(180deg)

</style>