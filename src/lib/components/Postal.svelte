<script lang="ts">

	import { slide } from 'svelte/transition'
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
	backdrop-filter: blur(20px)
	border-radius: 4px
	transition: all 0.12s cubic-bezier(0.430, 0.580, 0.000, 1.140)
	cursor: pointer
	justify-content: space-between
	align-items: stretch
	overflow: hidden
	&::before
		position: absolute
		border-radius: 4px
		top: 0
		left: 0
		right: 0
		content: ''
		width: 50%
		height: 80%
		border-radius: 4px
		margin: 0 auto
		z-index: -1
		background: linear-gradient(89deg, rgba(16,213,108,0.2), rgba(40,170,53,0.4))
		background-size: 400% 100%
		transition: 0.1s ease
		filter: blur(60px)
		animation: rainbow 10s ease infinite
	&::after
		position: absolute
		border-radius: 4px
		background: rgba(0,0,0,0.8)
		backdrop-filter: blur(10px)
		content: ''
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -1
		border-radius: 4px
		animation: theglowing 8s cubic-bezier(0.430, 0.580, 0.000, 1.140) infinite
	&:hover
		border-radius: 4px
		backdrop-filter: 0
		animation: heartbeat 0.7s ease-in-out forwards
		-webkit-animation: heartbeat 0.7s ease-in-out forwards
		&::before
			background: linear-gradient(89deg, rgba(16,213,108,0.9), rgba(40,170,53,0.8))
			width: 100%
			height: 100%
			background-size: 4% 10%
			border-radius: 4px
		&::after
			background: rgba(0,0,0,1)
			border-radius: 4px
	@media screen and (min-width: 1024px)
		min-height: 200px
		padding: 32px 24px 24px 24px
	@media screen and (max-width: 1023px)
		padding: 24px
		min-height: 200px
		justify-content: flex-start

@keyframes theglowing
	0%
		background-position: 0% 50%
		background: rgba(0,0,0,0.8)
	50%
		background-position: 100% 50%
		background: rgba(0,0,0,0.6)
	100%
		background-position: 0% 50%
		background: rgba(0,0,0,0.8)

@keyframes rainbow
	0%
		background: linear-gradient(89deg, rgba(16,213,108,0.2), rgba(40,170,53,0.4))
	25%
		background: linear-gradient(89deg, rgba(146,255,176,0.2), rgba(157,255,79,0.4))
	50%
		background: linear-gradient(89deg, rgba(79,86,255,0.2), rgba(199,79,255,0.4))
	75%
		background: linear-gradient(89deg, rgba(255,79,154,0.2), rgba(255,79,79,0.4))
	100%
		background: linear-gradient(89deg, rgba(255,185,79,0.2), rgba(178,255,79,0.4))

@media screen and (min-width: 1024px)
	@keyframes heartbeat
		0%
			transform: scale(1)
			transform-origin: center center
			animation-timing-function: ease-out
			background: rgba(23,23,23,0)
			border: 1px solid rgba(255,255,255,0)
		33%
			transform: scale(1.07)
			animation-timing-function: ease-in
			background: rgba(23,23,23,0.3)
			border: 1px solid rgba(255,255,255,0.4)
		50%
			transform: scale(0.97)
			animation-timing-function: ease-out
			background: rgba(23,23,23,1)
			border: 1px solid rgba(255,255,255,0.6)
		100%
			transform: scale(0.97)
			animation-timing-function: ease-out
			background: rgba(23,23,23,1)
			border: 1px solid rgba(255,255,255,1)

@media screen and (max-width: 1023px)
	@keyframes heartbeat
		0%
			transform: scale(1)
			transform-origin: center center
			animation-timing-function: ease-out
			background: rgba(23,23,23,0)
			border: 1px solid rgba(255,255,255,0)
		33%
			transform: scale(1.02)
			animation-timing-function: ease-in
			background: rgba(23,23,23,0.3)
			border: 1px solid rgba(255,255,255,0.4)
		50%
			transform: scale(0.99)
			animation-timing-function: ease-out
			background: rgba(23,23,23,1)
			border: 1px solid rgba(255,255,255,0.6)
		100%
			transform: scale(0.97)
			animation-timing-function: ease-out
			background: rgba(23,23,23,1)
			border: 1px solid rgba(255,255,255,1)

</style>