<script lang="ts">

	import type { ChatCompletionRequestMessageRoleEnum } from 'openai'
	export let type: ChatCompletionRequestMessageRoleEnum
	export let message: string

</script>

<div class="chat {type === 'user' ? 'chat-end' : 'chat-start'} justify-end">
	<div class="chat-header {type === 'user' ? 'Me' : 'broGPT'}">
		{type === 'user' ? 'Me' : 'broGPT'}:
	</div>
	<div class="chat-bubble {type === 'user' ? 'Me' : 'broGPT'}">
		{message}
	</div>
</div>

<style lang="sass">

.chat.chat-end
	background: #272727
	padding: 16px
	border: 1px solid #272727
	border-radius: 4px
	text-align: right
	margin-bottom: 16px
	font-family: 'Spline Sans', sans-serif
	line-height: 1.4
	font-size: 16px

.chat.chat-start
	background: #171717
	padding: 16px
	border: 1px solid #272727
	border-radius: 4px
	margin-bottom: 16px
	font-family: 'Spline Sans', sans-serif
	font-size: 16px
	box-shadow: -4px 0px 8px rgba(0,0,0,0.7)
	line-height: 1.4

.chat-header
	padding-bottom: 4px
	text-transform: uppercase
	font-size: 12px
	line-height: 1.4

.chat-header.Me
	color: #474747
	font-family: 'Spline Sans', sans-serif
	line-height: 1.4

.chat-header.broGPT
	color: #10D56C
	font-family: 'Spline Sans', sans-serif
	line-height: 1.4

.chat-bubble.Me
	color: white
	font-family: 'Spline Sans', sans-serif
	line-height: 1.4
	font-size: 16px

.chat-bubble.broGPT
	font-family: 'Spline Sans', sans-serif
	color: white
	font-size: 16px
	line-height: 2
	

</style>