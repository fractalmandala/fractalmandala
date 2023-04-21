---
title: dhatu page save
type: documentation
tags: current
---

```html
<script lang="ts">

	import { onMount } from 'svelte'
	import { writable, get } from 'svelte/store'
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { dbDhatus } from '$lib/utils/synaptic'
	import { count } from '$lib/utils/stores'
 	import { tooltipAction } from 'svelte-legos'
	import FiveLevels from '$lib/components/FiveLevels.svelte'
	import SimpleTipper from '$lib/components/SimpleTipper.svelte'
	import IconClose from '$lib/icons/IconClose.svelte'
	import { scale, fly } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'
	import { page } from '$app/stores'
	import { dhatuReference } from '$lib/utils/synaptic'
	let fake = false
	let dhatuitems:any
	let firsthover = Array(200).fill(false)
	let url:any
	let limit = 25
	let alignGrid = false
	let expand:any = Array(300).fill(false)
	let prayogas:any
	let levelnext = false
	let level3 = false
	let idx:any
	let idy:any
	let countValue:number = 1
	let toggleStep = Array(5).fill(false)
	let tracking:number
	let mini:number
	let show = false
	let show2 = false
	let show3 = false
	let show4 = false
	let level = 0
	let levelthird = false

	function toggleFirstHover(index:number){
		firsthover[index] = !firsthover[index]
		for ( let i = 0; i < firsthover.length; i++) {
			if ( i !== index && firsthover[i] === true) {
				firsthover[i] = false
			}
		}
	}

	function toggleTooltip(){
		show = !show
	}

	function toggleTool4(){
		show4 = !show4
	}

	function toggleTool3(){
		show3 = !show3
	}

	function toggleTool2(){
		show2 = !show2
	}
	
		const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function setNewLevel(newLevel:number){
		level = newLevel
	}

	$: tracking = Math.max(countValue)
	$: mini = Math.min(countValue)
	$: perce = level/5
	$: if ( level >= 1 ) {
		levelnext = true
	}	else {
		levelnext = false
	}
	$: if ( level >= 2 ) {
			levelthird = true
		} else {
			levelthird = false
		}

	function increment(){
			count.update(n => n + 1)
	}

	function decrement(){
			count.update(n => n - 1)
	}

	const unsubscribe = count.subscribe(value => {
		countValue = value;
	});

	function toggleField(index:number){
		expand[index] = !expand[index]
		for ( let i = 0; i < expand.length; i++) {
			if ( i !== index && expand[i] === true) {
				expand[i] = false
			}
		}
		countValue = 1
		if ( alignGrid === false ) {
			alignGrid = true
		}
		if ( levelnext === true ) {
			levelnext = false
		}
	}


	$: if ( idx && idy ){
		(async() => {
			prayogas = await dhatuReference(idx,idy)
		})()
	}
	
	function toggleGrid(){
		alignGrid = !alignGrid
	}
	
	function fauxfake(){
		fake = !fake
	}

	onMount(async() => {
		url = $page.url.pathname
		dhatuitems = await dbDhatus(limit)
		prayogas = await dhatuReference(idx,idy)
	})

</script>

<div class="gridof5 type" class:calibrated={alignGrid} class:leveltwo={levelnext} class:levelthree={levelthird}>
	{#if dhatuitems && dhatuitems.length > 0}
		{#each dhatuitems as item, i}
			{#if expand[i]}
				<div class="dhatubox opentab" in:scale={{ duration: 400, delay: 200, easing: backOut }} out:scale={{ duration: 200, delay: 200, easing: backOut }}>
					<div class="boxr">
						<small>{item.xaxis}.{item.yaxis} | {#if item.karma === 'A'} Akarmaka {:else} Sakarmaka {/if}</small>
						<div on:click={() => toggleField(i)} on:keydown={fauxfake}>
							<IconClose/>
						</div>
					</div>
					<div class="boxr">
						<div class="box">
							<h4 class="dev">√{item.dhatu}</h4>
							<h5>√{item.dhatuiast}</h5>
							<h6>{item.arthaiast} - <br><span style="font-weight: 400">{item.artha_english}</span></h6>
							<progress value={perce}></progress>
							{level}
						</div>
						<div class="boxr goggbox">
							<span class="tools" class:show={show}>Discovery Phase 1!</span>
							<span class="tools" class:show={show2}>Discovery Phase 2!</span>					
							<span class="tools" class:show={show3}>Discovery Phase 3!</span>
							<span class="tools" class:show={show4}>You get the drift!</span>
							<div class="goggles gog1" on:mouseenter={toggleTooltip} on:mouseleave={toggleTooltip} on:click={() => setNewLevel(1)} on:keydown={fauxfake}>1</div>
							{#if levelnext}
								<div class="goggles gog2" on:mouseenter={toggleTool2} on:mouseleave={toggleTool2} on:click={() => setNewLevel(2)} on:keydown={fauxfake}>2</div>
									{#if levelthird}
										<div class="goggles gog3" on:mouseenter={toggleTool3} on:mouseleave={toggleTool3} on:click={() => setNewLevel(3)} on:keydown={fauxfake}>3</div>
										<div class="goggles gog4" on:mouseenter={toggleTool4} on:mouseleave={toggleTool4} on:click={() => setNewLevel(4)} on:keydown={fauxfake}>4</div>
									{/if}
								{/if}
						</div>
					</div>
				</div>
				{#if levelnext}
					<div class="level2tab" in:scale={{ duration: 400, delay: 200, easing: backOut }} out:scale={{ duration: 200, delay: 200, easing: backOut }}>
							<p>the spread of <span style="text-transform: uppercase">√{item.dhatuiast}</span></p>
							<p>the root √{item.dhatuiast} lends itself to words found in:</p>
							{#if prayogas && prayogas.length > 0}
								{#each prayogas as item}
									<h6>{item.referenceiast}</h6>
								{/each}
							{/if}
					</div>
				{/if}
				{#if levelthird}
					<div class="boxone" in:scale={{ duration: 150, delay: 50, easing: backOut }} out:scale={{ duration: 50, delay: 0, easing: backOut }}>
						<h6>Laṭ Lakāra - the Present and Present Indicative</h6>
						<p>vartamānaḥ</p>
					</div>
					<div class="boxtwo" in:scale={{ duration: 150, delay: 100, easing: backOut }} out:scale={{ duration: 50, delay: 0, easing: backOut }}>
						<h6>Laṅg and Luṅg Lakāra - the Undated Past and Recent Past</h6>
						<p>anatyadana bhūta ca bhūta</p>
					</div>
					<div class="boxthree" in:scale={{ duration: 150, delay: 150, easing: backOut }} out:scale={{ duration: 50, delay: 0, easing: backOut }}>
						<h6>Lṛṭ and Lṛṅg Lakāra - Not Yet Occured, and Might Occur</h6>
						<p>bhaviṣyan, saṅketan</p>
					</div>
					<div class="boxfour" in:scale={{ duration: 150, delay: 200, easing: backOut }} out:scale={{ duration: 50, delay: 0, easing: backOut }}>
						<h6>Liṭ and Luṭ Lakāra - Historical Past, Distant Future</h6>
						<p>parokṣe bhūta, anadyanate bhaviṣyan</p>
					</div>
					<div class="boxfive" in:scale={{ duration: 150, delay: 250, easing: backOut }} out:scale={{ duration: 50, delay: 0, easing: backOut }}>
						<h6>Loṭ and Āśīrliṅg - Imperative and Benedictive</h6>
						<p>ājña and āśīḥ</p>
					</div>
					<div class="boxsix" in:scale={{ duration: 150, delay: 300, easing: backOut }} out:scale={{ duration: 50, delay: 0, easing: backOut }}>
						<h6>Vidhiliṅg - Optative, Might Happen</h6>
						<p>vidhiḥ</p>
					</div>
				{/if}
			{:else}
			<div class="dhatubox" on:click={() => toggleField(i)} on:keydown={fauxfake} in:scale={{ duration: 200, delay: 200, easing: backIn}} out:scale={{ duration: 200, delay: 0, easing: backIn}} on:mouseenter={() => toggleFirstHover(i)} on:mouseleave={() => toggleFirstHover(i)} class:col={firsthover[i]}>
				<div class="boxr">
					<cite>{item.xaxis}.{item.yaxis}</cite>
					<h6 class="dev">√{item.dhatu}</h6>
					<p>√{item.dhatuiast}</p>
				</div>
				{#if firsthover[i]}
				<div class="para" in:fly={{ duration: 340, x: 0, y: 88, easing: backIn}} out:fly={{ duration: 200, y: 88}}>
					<p><strong>{item.arthaiast} - </strong>{item.artha_english}</p>
				</div>
				{/if}
				<div class="bottomstrip">
					<div class="ball atm"></div>
						{#if item.pada === 'A'}
						<small>ātmanepada</small>
						{:else if item.pada === 'P'}
						<small>parasmaipada</small>
						{:else}
							<small>{item.pada}</small>
						{/if}
					<div class="ball par"></div>
				</div>
			</div>
			{/if}
		{/each}
	{/if}
</div>

<style lang="sass">

.goggbox
	position: relative
	height: max-content
	align-self: end
	.tools
		position: absolute
		top: 0
		left: 0
		font-size: 14px
	.tools
		transform: translateY(-64px)
		opacity: 0
		transition: 0.2s var(--cubec)
	.tools.show
		transform: translateY(-32px)
		opacity: 1


.goggles
	width: 28px
	height: 28px
	background: #b7b7b7
	border-radius: 16px
	display: flex
	align-items: center
	justify-content: center
	color: white
	font-weight: bold
	cursor: pointer
	margin-left: 8px
	align-self: end
	transition: 0.32s var(--cubeb)
	transform-origin: center centr
	&:hover
		transform: scale(0.8)
		background: var(--yellow)

.dhatubox.opentab
	progress
		-webkit-appearance: none
		border: 1px solid #ececec
		border-radius: 14px
		height: 24px
		width: 240px
		color: white
		position: relative
		p
			position: absolute
			top: 0
			left: 0
			z-index: 10
	progress[value]::-webkit-progress-bar
		background: white
		border-radius: 13px
		color: white
	progress[value]::-webkit-progress-value
		background: var(--yellow)
		border-radius: 13px
		color: white
		

.level2tab
	h6
		font-weight: 400
		font-size: 20px
		padding: 8px 0
		text-transform: capitalize
		border-bottom: 1px solid #ececec


.type
	@media screen and (min-width: 1024px)
		padding-left: 48px
		padding-right: 48px
		padding-top: 120px
		padding-bottom: 48px

.gridof5.calibrated
	@media screen and (min-width: 1024px)
		grid-template-areas: "opentab opentab opentab opentab opentab" ". . . . ."
		grid-template-rows: auto auto
		.dhatubox.opentab
			grid-area: opentab
			small
				text-transform: uppercase
				font-size: 12px
			.boxr
				justify-content: space-between

.gridof5.calibrated.leveltwo
	@media screen and (min-width: 1024px)
		grid-template-areas: "opentab opentab opentab opentab opentab" "level2tab level2tab . . ." "level2tab level2tab . . ." ". . . . ."
		grid-template-rows: auto auto auto
		.dhatubox.opentab
			grid-area: opentab
			small
				text-transform: uppercase
				font-size: 12px
			.boxr
				justify-content: space-between
		.level2tab
			grid-area: level2tab

.gridof5.calibrated.leveltwo.levelthree
	@media screen and (min-width: 1024px)
		grid-template-areas: "opentab opentab opentab opentab opentab" "level2tab level2tab boxone boxtwo boxthree" "level2tab level2tab boxfour boxfive boxsix" ". . . . ."
		grid-template-rows: auto auto auto auto
		.dhatubox.opentab
			grid-area: opentab
			small
				text-transform: uppercase
				font-size: 12px
			.boxr
				justify-content: space-between
		.level2tab
			grid-area: level2tab
		.boxone
			grid-area: boxone
		.boxtwo
			grid-area: boxtwo
		.boxthree
			grid-area: boxthree
		.boxfour
			grid-area: boxfour
		.boxfive
			grid-area: boxfive
		.boxsix
			grid-area: boxsix

.level2tab
	display: flex
	flex-direction: column
	background: #f3f3f3
	padding: 24px
	

.dhatubox
	box-sizing: border-box
	padding: 20px 12px
	border-radius: 4px
	transition: all 0.13s var(--cubec)
	display: flex
	flex-direction: column
	row-gap: 12px
	position: relative
	overflow: hidden
	border-bottom: 1px solid #ececec
	.boxr
		gap: 12px
	h6
		font-weight: 800
		padding-bottom: 8px
		font-size: 21px
		transform-origin: left top
		transition: all 0.23s var(--cubea)
	p
		color: #878787
		font-weight: 400
		transition: all 0.14s var(--cubea)
	h5, h6, p
		margin: 0
	cite
		font-style: normal
		background: var(--yellow)
		color: white
		padding: 3px
		border-radius: 8px
		height: 18px
	&:hover
		box-shadow: 0px 0px 0px #FFFFFF, 0px 0px 0px #FFFFFF
		h6
			transform: scale(1.2)
		>p
			transform: translateX(16px) scale(1.2)
		cite
			color: var(--yellow)
			background: transparent

.bottomstrip
	display: flex
	flex-direction: row
	align-items: center
	column-gap: 2px
	position: absolute
	bottom: 4px
	right: 4px
	transition: all 0.32s ease
	.ball
		background: var(--yellow)
		width: 8px
		height: 8px
		border-radius: 4px
	.par
		transform-origin: center center
		transform: scale(0)
		transition: 0.32s var(--cubec)
	.atm
		opacity: 0
	small
		margin: 0
		padding: 0
		color: #878787
		transform: translateX(64px)
		opacity: 0
		transition: 0.32s var(--cubec)
		width: 0

.dhatubox
	transition: 0.32s ease
	&:hover
		.par
			transform: scale(1.0)
		.atm
			animation: transback 0.32s var(--cubec) forwards
		.bottomstrip small
			transform: translateX(0)
			opacity: 1
			width: 100%

.dhatubox.opentab
	box-shadow: none
			

@keyframes transback
	0%
		transform: translateX(0px)
		opacity: 0
	50%
		transform: translateX(-120px)
		opacity: 1
	100%
		transform: translateX(-160px)
		opacity: 0
		

</style>
```