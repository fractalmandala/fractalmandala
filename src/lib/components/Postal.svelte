<script lang="ts">

	import { onMount } from 'svelte' 
	import { slide } from 'svelte/transition'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'

	onMount(async() => {
		hljs.highlightAll()	
	})

	export let linkvar:any
	export let i:any
	
</script>


<div class="postal" in:slide={{ delay: 50*i, duration: 150, axis: 'x'}} out:slide={{ delay: 0, duration: 150, axis: 'x'}}>
<a href={linkvar}>
	<slot name="postalone"></slot>
	<slot name="postaltwo"></slot>
	<slot name="postalthree"></slot>
	<slot name="codes"></slot>
</a>
</div>

<style lang="sass">

.postal
	display: flex
	flex-direction: column
	position: relative
	border: 1px solid #272727
	border-radius: 4px
	cursor: pointer
	justify-content: space-between
	align-items: stretch
	transition: all 0.15s var(--cubed)
	box-shadow: 4px 6px 12px #010101
	background: rgba(0,0,0,1)
	backdrop-filter: blur(3px)
	@media screen and (min-width: 1024px)
		min-height: 200px
		padding: 32px 24px 24px 24px
	@media screen and (max-width: 1023px)
		padding: 24px
		min-height: 200px
		justify-content: flex-start

.postal
	&::before
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		content: ''
		background-color: hsla(140,80%,60%,0)
		filter: blur(40px)
		z-index: -1
		background-image: radial-gradient(at 97% 96%, hsla(108,67%,92%,1) 0px, transparent 100%), radial-gradient(at 5% 70%, hsla(325,87%,90%,1) 0px, transparent 50%)
		background-size: 400% 400%	
	&:hover
		overflow: hidden
		box-shadow: none
		animation: flicker2 1s linear forwards
		&::before
			animation: flicker 1s linear forwards

@keyframes flicker
	0%
		background-color: hsla(140,80%,60%,0)
		filter: blur(40px)
	41.99%
		background-color: hsla(140,80%,60%,0.5)
		filter: blur(40px)
	42%
		background-color: hsla(140,80%,60%,0)
		filter: blur(40px)
	43.1%
		background-color: hsla(140,80%,60%,0.6)	
		filter: blur(4px)
	47.9%
		background-color: hsla(140,80%,60%,0.5)
		filter: blur(14px)
	48%
		background-color: hsla(140,80%,60%,0)
		filter: blur(24px)
	49%
		background-color: hsla(140,80%,60%,0.5)
		filter: blur(40px)
	100%
		background-color: hsla(140,80%,60%,0.5)
		filter: blur(4px)

@keyframes flicker2
	0%
		background-color: hsla(140,80%,60%,0)
		overflow: hidden
	41.99%
		background-color: hsla(140,80%,60%,0.05)
		overflow: hidden
	42%
		background-color: hsla(140,80%,60%,0)
		overflow: hidden
	43.1%
		background-color: hsla(140,80%,60%,0.16)	
		overflow: visible
	47.9%
		background-color: hsla(140,80%,60%,0.25)
		overflow: visible
	48%
		background-color: hsla(140,80%,60%,0.35)
		overflow: visible
	49%
		background-color: hsla(140,80%,60%,0.45)
		overflow: visible
	100%
		background-color: hsla(140,80%,60%,0.5)
		overflow: hidden

</style>