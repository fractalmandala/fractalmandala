<script lang="ts">


	import { onMount } from 'svelte'
	import { chatStreamStore } from '$lib/stores/chatStorekeeper'
	import { fade } from 'svelte/transition'
	import { elasticOut } from 'svelte/easing'
	let sampler:any
	import type { ChatCompletionRequestMessageRoleEnum } from 'openai'

	onMount(async() => {
		sampler = message
		chatStreamStore.update(messages => [...messages])
	})

	export let type: ChatCompletionRequestMessageRoleEnum
	export let message: string

</script>

<div class="boxofchat {type === 'user' ? 'chat-end' : 'chat-start'}" in:fade={{ duration: 300, delay: 50, easing: elasticOut }}>
	<div class="agent {type === 'user' ? 'user' : 'broGPT'}">
		{type === 'user' ? 'user' : 'broGPT'}:
	</div>
	<pre class="commbody {type === 'user' ? 'user' : 'broGPT'}">
		{@html message}
	</pre>
</div>



<style lang="sass">

pre
	margin: 4px 0 0 0
	line-height: 1.6

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