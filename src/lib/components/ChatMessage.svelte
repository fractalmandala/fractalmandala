<script lang="ts">


	import { onMount } from 'svelte'
	import { themeMode } from '$lib/stores/globalstores'
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

<div class="boxofchat {type === 'user' ? 'chat-end' : 'chat-start'}" in:fade={{ duration: 300, delay: 50, easing: elasticOut }}
	class:dark={$themeMode}
	class:light={!$themeMode}
	>
	<div class="agent {type === 'user' ? 'user' : 'gpt'}">
		<small>{type === 'user' ? 'user' : 'gpt'}:</small>
	</div>
	<pre class="commbody {type === 'user' ? 'user' : 'gpt'}">
		{message}
	</pre>
</div>



<style lang="sass">

.boxofchat.dark
	small, pre
		color: var(--opposite)

.boxofchat.light
	small, pre
		color: #474747

pre
	margin: 4px 0 0 0
	line-height: 1.6

.agent
	font-size: 12px

.agent.user
	text-transform: uppercase
	text-align: right

.commbody.gpt
	font-size: 14px

.commbody.user
	text-align: right
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