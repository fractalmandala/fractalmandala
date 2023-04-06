---
title: bet drashta layout
tags: backups
type: documentation
---

```html
<script lang="ts">
import { onMount } from 'svelte'
import { fly } from 'svelte/transition'
import supabase from '$lib/db'
import { page } from '$app/stores'
export let data:any
let mobilesidebar:boolean = false
let x:any
let items:any = []
let contents:any = []
let takeaways:any = []
let instructors:any = []
let showPart:boolean[] = [false, false, false, false, false]
let panel1:boolean = true
let panel2:boolean = false
let panel3:boolean = false
let panel4:boolean = false
let panel5:boolean = false

function mobileStrip(){
	mobilesidebar = !mobilesidebar
}

function closeStrip(){
	mobilesidebar = false
}
	
	function toggle1(){
		if (!panel1) {
			panel1 = true
			if (panel2) {
				panel2 = false
			}
			if (panel3) {
				panel3 = false
			}
			if (panel4) {
				panel4 = false
			}
			if (panel5) {
				panel5 = !panel5
			}
		}
	}
	
	function toggle2(){
		if (!panel2) {
			panel2 = true
			if (panel1) {
				panel1 = false
			}
			if (panel3) {
				panel3 = false
			}
			if (panel4) {
				panel4 = false
			}
			if (panel5) {
				panel5 = !panel5
			}
		}
	}
	
	function toggle3(){
		if (!panel3) {
			panel3 = true
			if (panel2) {
				panel2 = false
			}
			if (panel1) {
				panel1 = false
			}
			if (panel4) {
				panel4 = false
			}
			if (panel5) {
				panel5 = !panel5
			}
		}
	}
	
	function toggle4(){
		if (!panel4) {
			panel4 = true
			if (panel2) {
				panel2 = false
			}
			if (panel3) {
				panel3 = false
			}
			if (panel1) {
				panel1 = false
			}
			if (panel5) {
				panel5 = !panel5
			}
		}
	}

	function toggle5(){
		if (!panel5) {
			panel5 = true
			if (panel2) {
				panel2 = false
			}
			if (panel3) {
				panel3 = false
			}
			if (panel1) {
				panel1 = false
			}
			if (panel4) {
				panel4 = !panel4
			}
		}
	}

function togglePart(index:number) {
	showPart[index] = showPart[index]
	for ( let i = 0; i < showPart.length; i++ ) {
		if ( i !== index && showPart[i] === true ) {
			showPart[i] = false
		}
	}
}

const courseDetails = async() => {
	const { data, error } = await supabase
		.from('brhat-drashta2')
		.select()
		.eq('type','course details')
		.eq('dynamizer',x)
		.order('id', {ascending: false})
		.limit(3)
  if (error) throw new Error(error.message)
  return data
}

const courseContent = async() => {
	const { data, error } = await supabase
		.from('brhat-drashta2')
		.select()
		.eq('type','course content')
		.eq('dynamizer',x)
		.order('id')
  if (error) throw new Error(error.message)
  return data
}

const courseTake = async() => {
	const { data, error } = await supabase
		.from('brhat-drashta2')
		.select()
		.eq('type','takeaway')
		.eq('dynamizer',x)
		.order('id')
  if (error) throw new Error(error.message)
  return data
}


const Instructor = async() => {
	const { data, error } = await supabase
		.from('brhat-drashta2')
		.select()
		.eq('type','facilitator')
		.eq('dynamizer',x)
		.order('id')
  if (error) throw new Error(error.message)
  return data
}


onMount(async() => {
	x = $page.url.pathname.substr(9,40)
	items = await courseDetails()
	contents = await courseContent()
	takeaways = await courseTake()
	instructors = await Instructor()
})
</script>

<div class="coursebox">
  <div class="coursetitle padstd">
		<div class="titlesection">
			<h1>{data.name}</h1>
		</div>
		<div class="imagesection">
			<div class="pureimage">
				<img src={data.image} alt={data.name} />
			</div>
			<div class="overview spline">
				<p>{data.content.slice(0,400)}...<span style="color: #F2AF29"><b>Read More Below</b></span></p>
				<h5>Course Status: <span style="color: #F2AF29">{data.status}</span></h5>
				<h5 class="grey">Instructor: {data.ins}</h5>
			</div>
		</div>
	</div>
  <div class="coursebody">
    <div class="coursenav spline" class:mobilesidebar={mobilesidebar}>
			<h5 class:panel1={panel1} on:click={toggle1} on:keydown={toggle1} on:click={mobileStrip} on:keydown={mobileStrip}>Overview</h5>
			<h5 class:panel2={panel2} on:click={toggle2} on:keydown={toggle2} on:click={mobileStrip} on:keydown={mobileStrip}>Course Contents</h5>
			<h5 class:panel2={panel3} on:click={toggle3} on:keydown={toggle3} on:click={mobileStrip} on:keydown={mobileStrip}>Learner Takeaways</h5>
			<h5 class:panel2={panel4} on:click={toggle4} on:keydown={toggle4} on:click={mobileStrip} on:keydown={mobileStrip}>Instructor</h5>
			<h5>All Courses:</h5>
				<p class="courselinker">
					<a href="/drashta/valmikiramayana">Vālmīki Rāmāyaṇa</a>
				</p>
				<p class="courselinker">
					<a href="/drashta/hinduiconography">Hindu Iconography</a>
				</p>
				<p class="courselinker">
					<a href="/drashta/sitaramgoel">Sita Ram Goel</a>
				</p>
				<p class="courselinker">
					<a href="/drashta/shriramswarup">Shri Ram Swarup</a>
				</p>
			<div class="expandup" on:click={mobileStrip} on:keydown={mobileStrip}>
				<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path id="upexpand" d="M32 14.9676L28.2383 18.4916L15.992 7.03554L3.74576 18.4916L2.03109e-07 14.9676L16 1.90798e-07L32 14.9652L32 14.9676ZM32 28.4785L28.2383 32L15.992 20.5438L3.7644 32L4.19935e-08 28.4785L16 13.5082L32 28.476L32 28.4785Z" fill="white"/>
				</svg>
			</div>
		</div>
    <div class="coursesection spline">
			{#if panel2}
					<div class="contentscontainer partbox" in:fly={{ delay: 100}} out:fly={{ duration: 100}}>
						{#each contents as content}
							<div class="boxc">
							<p>{content.name}</p>
							{#if content.content && content.content.length>0}
							<p class="corcontent">{content.content}</p>
							{/if}
							{#if content.books && content.books.length>0}
							<small>{content.books}</small>
							{/if}
							</div>
						{/each}
					</div>
			{/if}
			{#if panel3}
					<div class="partbox takes boxr" in:fly={{ delay: 100}} out:fly={{ duration: 100}}>
				{#each takeaways as takeaway}
					<div class="boxc simple">
					<p>{takeaway.name}</p>
					<small>{takeaway.content}</small>
					</div>
				{/each}
				</div>
			{/if}
			{#if panel4}
				<div class="partbox teach" in:fly={{ delay: 100}} out:fly={{ duration: 100}}>
				{#each instructors as instructor}
					<div class="boxr instruct">
					<img src={instructor.image} alt={instructor.name} />
					<p>{instructor.content}</p>
					</div>
				{/each}
				</div>
			{/if}
			{#if panel1}
				<div class="boxr icons partbox" in:fly={{ delay: 100}} out:fly={{ duration: 100}}>
				{#each items as item}
					<div class="boxc">
						<img src={item.image} alt={item.title} />
						<small>{item.content}</small>
					</div>
				{/each}
				</div>
				<pre>{data.content}</pre>
			{/if}
		</div>
  </div>
</div>

<style lang="sass">

.expandup
	svg
		height: 20px
		width: 20px
		object-fit: contain

.instruct
	gap: 40px
	margin-bottom: 32px
	border-bottom: 1px solid #f1f1f1

.instruct img
	object-fit: cover
	width: 160px
	height: 160px

.takes
	gap: 40px
	border-bottom: 1px solid #f1f1f1
	padding-bottom: 8px
	flex-wrap: wrap
	.boxc
		width: calc(50% - 24px)
		height: max-content

.contentscontainer
	display: flex
	flex-direction: row
	flex-wrap: wrap
	gap: 40px
	.boxc
		width: calc(50% - 24px)
		border-bottom: 1px solid #f1f1f1
		padding-bottom: 8px
	p
		font-weight: bold
		margin: 0 0 12px 0
		text-transform: capitalize
	small
		font-size: 12px
		color: #878787
	.corcontent
		font-weight: 400 !important
		font-size: 1rem !important

.instruct p
	font-size: 14px
	color: #878787

.simple
	p
		font-weight: bold
		margin: 0 0 12px 0
	small
		font-size: 12px
		color: #878787

.icons .boxc
	width: 33%
	img
		object-fit: cover
		height: 104px
		width: 104px
		margin: auto

.corcontent
	font-weight: 400

.icons 
	border-top: 1px solid #f1f1f1
	border-bottom: 1px solid #f1f1f1
	padding-bottom: 32px
	margin-bottom: 32px
	padding-top: 24px
	width: 100%
	justify-content: center
	small
		text-transform: uppercase
		font-size: 16px
		letter-spacing: 1px
		font-weight: bold
		text-align: center

.coursebox 
	display: grid 
	grid-template-columns: 1fr 
	grid-template-rows: auto auto
	gap: 0px 0px 
	grid-auto-flow: row 
	grid-template-areas: "coursetitle" "coursebody" 
.coursetitle 
	grid-area: coursetitle
	display: flex
	flex-direction: column
	justify-content: center
	img
		object-fit: contain
		width: 100%
	height: 100vh
	.titlesection
		h1
			font-size: 4.8rem
			letter-spacing: -3px
			line-height: 1.1 
	.imagesection
		display: flex
		flex-direction: row
		gap: 32px
		background: linear-gradient(to right, #4CA1AF, #2C3E50)
		padding: 32px
		border-radius: 4px
		box-shadow: 4px 5px 11px #c1c1c1
		.pureimage
			width: 40%
		.overview
			width: calc(60% - 32px)
			p
				font-size: 16px
				line-height: 1.6
				color: white
			h5
				margin: 0
				text-transform: uppercase
				color: white
				font-size: 1.2rem
		
.coursebody 
	display: grid 
	grid-template-columns: 320px 1fr 
	grid-template-rows: auto 
	gap: 0px 32px 
	grid-auto-flow: row 
	grid-template-areas: "coursenav coursesection" 
	grid-area: coursebody
	padding-bottom: 64px
.coursenav 
	grid-area: coursenav 
	width: 320px
	height: max-content
	h5
		font-size: 1.44rem
		text-transform: uppercase
		font-weight: 500
		color: #474747
		margin: 0
		padding: 8px
		border-bottom: 1px solid #f1f1f1
		cursor: pointer
		&:hover
			background: #474747
			color: white
	h5.panel1
		background: linear-gradient(to right, #4CA1AF, #2C3E50)
		color: white
	h5.panel2
		background: linear-gradient(to right, #4CA1AF, #2C3E50)
		color: white
	h5.panel3
		background: linear-gradient(to right, #4CA1AF, #2C3E50)
		color: white
	h5.panel4
		background: linear-gradient(to right, #4CA1AF, #2C3E50)
		color: white
	h5.panel5
		background: linear-gradient(to right, #4CA1AF, #2C3E50)
		color: white
.coursesection 
	grid-area: coursesection
	display: grid 
	grid-template-columns: 1fr
	grid-template-rows: auto
	gap: 0px 0px 
	grid-auto-flow: row 
	grid-template-areas: "partbox"
	align-items: start
	align-content: start
	min-height: 100vh
	h5
		margin: 0
.partbox
	grid-area: partbox

.coursenav p
	margin: 0
	padding: 8px
	font-size: 1rem
	font-weight: 500
	color: #878787
	position: relative
	&:hover
		color: #2C3E50
		&::after
			position: absolute
			bottom: 0
			left: 0
			height: 1px
			width: 0
			border-bottom: 1px solid #474747
			content: ''
			animation: growbot 0.2s ease forwards

@keyframes growbot
	0%
		width: 0
	100%
		width: 100%

@media screen and (min-width: 1024px)
	.coursebody
		padding-left: 128px
		padding-right: 128px
	
@media screen and (max-width: 767px)
	.coursebox 
		box-sizing: border-box
		display: flex
		flex-direction: column
	.coursetitle 
		display: flex
		flex-direction: column
		justify-content: center
		height: 100%
		.titlesection
			padding: 90px 0 0 0 
			h1
				font-size: 2rem
				letter-spacing: 0px
				line-height: 1.1 
		.imagesection
			display: flex
			flex-direction: column
			gap: 0
			background: linear-gradient(to right, #4CA1AF, #2C3E50)
			padding: 8px
			border-radius: 4px
			box-shadow: 4px 5px 11px #c1c1c1
			.pureimage
				width: 100%
			.overview
				width: 100%
				p
					font-size: 14px
					line-height: 1.6
					color: white
				h5
					margin: 0
					text-transform: uppercase
					color: white
					font-size: 1.2rem
	.coursebody 
		display: grid 
		grid-template-columns: 1fr 
		grid-template-rows: auto auto 
		gap: 0px 0px
		grid-auto-flow: row 
		grid-template-areas: "coursesection" "coursenav"
		grid-area: coursebody
		padding-left: 0
		padding-right: 0
		.coursenav
			display: flex
			flex-direction: column
			justify-content: flex-end
			height: 40px
			width: 100vw
			position: fixed
			bottom: 0
			background: rgba(0,0,0,0.7)
			backdrop-filter: blur(5px)
			h5, p
				visibility: hidden
		.expandup
			height: 24px
			margin-bottom: 12px
			width: 100%
			display: flex
			flex-direction: row
			align-items: center
			justify-content: center
			transform-origin: center center
		.mobilesidebar
			height: 100vh
			background: white
			justify-content: space-between
			top: 0
			left: 0
			h5, p
				visibility: visible
			h5
				font-size: 1.2rem
			p
				font-size: 1rem
			padding-top: 90px
			padding-left: 16px
			padding-right: 16px
			margin-top: 0
			.expandup
				transform: rotate(180deg)
				bottom: 0
				svg
					path
						fill: #474747
	.icons .boxc
		width: 30%
		img
			object-fit: cover
			height: 48px
			width: 48px
			margin-left: auto
			margin-right: auto
			margin-bottom: 8px
		small
			font-size: 10px
	.coursesection
		padding-left: 16px
		padding-right: 16px
	.contentscontainer
		display: flex
		flex-direction: column
		padding-top: 24px
		gap: 16px
		padding-bottom: 8px
		.boxc
			width: 100%
			border-bottom: 1px solid #f1f1f1
			padding-bottom: 8px
			padding-top: 0
		p
			font-weight: bold
			margin: 0 0 8px 0
			text-transform: capitalize
			padding-top: 0
		small
			font-size: 12px
			color: #878787
		.corcontent
			font-weight: 400 !important
			font-size: 0.875rem !important
	.takes
		gap: 8px
		border-bottom: 1px solid #f1f1f1
		padding-bottom: 8px
		flex-direction: column
		padding-top: 24px
		.boxc
			width: 100%
			height: max-content
			margin-bottom: 12px
	.instruct
		padding-top: 24px
		gap: 8px
		margin-bottom: 32px
		border-bottom: 1px solid #f1f1f1
		flex-direction: column
	.instruct img
		object-fit: cover
		width: 100%
		height: 200px	
		margin-bottom: 16px		


</style>
```