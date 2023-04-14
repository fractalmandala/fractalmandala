<script lang="ts">


	import { onMount } from 'svelte'
	import { draggableAction } from 'svelte-legos'
	import { fade } from 'svelte/transition'
	import { elasticOut } from 'svelte/easing'
	let sampler:any
	let pressed = false
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai'

	onMount(async() => {
		sampler = message
	})

	export let type: ChatCompletionRequestMessageRoleEnum
	export let message: string

</script>

<div class="boxofchat {type === 'user' ? 'chat-end' : 'chat-start'}" in:fade={{ duration: 300, delay: 50, easing: elasticOut }} class:packaged={pressed} use:draggableAction>
	<div class="agent {type === 'user' ? 'user' : 'broGPT'}">
		{type === 'user' ? 'user' : 'broGPT'}:
	</div>
	<pre class="commbody {type === 'user' ? 'user' : 'broGPT'}">
		{@html message}
	</pre>
	{#if pressed}
	<span style="color: white">STORED</span>
	{/if}
</div>



<style lang="sass">

pre
	margin: 4px 0 0 0
	line-height: 1.6

.boxofchat
	border: 1px solid #272727
	border-radius: 4px
	margin-bottom: 16px
	padding: 16px
	backdrop-filter: blur(40px)
	background: rgba(0,0,0,0.1)

.boxofchat.packaged
	width: 80px !important
	height: 80px !important
	position: fixed
	top: 0
	left: 0
	.agent, .commbody
		display: none
	display: flex
	justify-content: center
	align-items: center
	font-size: 12px
	text-align: center
	position: relative
	backdrop-filter: blur(20px)
	z-index: 3
	transition: all 0.32s ease
	&::before
		position: absolute
		top: 0
		left: 0
		right: 0
		content: ''
		width: 100%
		height: 100%
		border-radius: 4px
		margin: 0 auto
		z-index: -1
		background: linear-gradient(89deg, rgba(16,213,108,1), rgba(40,10,53,1))
		background-size: 400% 400%
		animation: theglowing 5s ease infinite
		background-position: 100% 100%
		filter: blur(30px)
	&::after
		position: absolute
		background: #171717
		backdrop-filter: blur(10px)
		content: ''
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -1
		border-radius: 4px
	&:hover
		&::after
			background: rgba(0,0,0,0)

.boxofchat.chat-end
	width: 60%
	margin-left: 40%

.agent
	font-size: 12px

.agent.user
	text-transform: uppercase
	text-align: right
	color: white

.agent.broGPT
	color: #10C56D

.commbody.user, .commbody.broGPT
	color: white
	font-family: 'Spline Sans', sans-serif

.commbody.broGPT
	font-size: 14px
	text-transform: lowercase

.commbody.user
	text-align: right
	color: #575757
	font-size: 14px

.commbody
	white-space: pre-line

@keyframes theglowing
	0%
		background-position: 0% 50%
	33%
		background-position: 50% 100%
	66%
		background-position: 100% 50%
	100%
		background-position: 50% 0%

</style>