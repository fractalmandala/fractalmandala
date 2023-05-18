<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'
	import type { ChatMessage } from '$lib/gptapp/types';
	import { marked } from 'marked'
	export let message: ChatMessage;

</script>

<pre
	class={[
		'rta-column',
		message.from === 'user' ? 'usertype' : 'gpttype'
	].join(' ')}
	class:light={!$themeMode} class:dark={$themeMode}
>
	{@html marked.parse(message.content)}
</pre>


<style lang="sass">



.usertype
	text-align: right
	padding: 0
	margin: 0

.gpttype
	text-align: left
	border: 1px solid var(--borderline)
	padding: 16px
	border-radius: 6px
	background: var(--contraster)

</style>
