<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'
	import type { ChatMessage } from '$lib/gptapp/types';
	export let message: ChatMessage;

</script>

<div
	class={[
		'rta-column',
		message.from === 'user' ? 'bg-gray-100 text-black ml-auto' : 'bg-white mr-auto text-black'
	].join(' ')}
	class:light={!$visibilityMode} class:dark={$visibilityMode}
>
	<p>{message.content}</p>
</div>


<style lang="sass">

p
	color: var(--opposite)


</style>