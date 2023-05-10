<script lang="ts">
		
	import visibilityMode from '$lib/stores/visibility'	
	import GPTBox from '$lib/agents/GPTBox.svelte'
	import { allconvos } from '$lib/utils/convos'

	let fake = false
	let isChat = false
	let password = ''
	let input: HTMLInputElement
	let openItem = Array(10).fill(false)

	function getContentParts(mapping:any) {
		let parts = []
		for ( let key in mapping ) {
			let message = mapping[key].message
			if ( message && message.content && message.content.parts) {
				parts.push(...message.content.parts)
			}
		}
		return parts
	}	

	function toggleOpenItem(index:number) {
		openItem[index] = !openItem[index]
		for ( let i = 0; i < openItem.length; i ++ ) {
			if ( i !== index && openItem[i] === true ) {
				openItem[i] = false
			}
		}
	}

	const keyed = import.meta.env.VITE_OWN_PUBLIC

	function toggleChat(){
		if ( password === keyed ) {
		isChat = !isChat
		input.value = ''
		}
	}

	function fauxfake(){
		fake = !fake
	}

</script>

<div class="rta-column p-bot-32" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<h1>GPT Chats</h1>
	{#if isChat}
		<GPTBox></GPTBox>
	{:else}
	<form class="rta-column rowgap100 passform">
		<input type="password" bind:value={password} bind:this={input}/>
		<div class="rta-column rowgap200 opener" on:click={toggleChat} on:keydown={fauxfake}><p>Open</p></div>
	</form>
	{/if}
</div>

<style lang="sass">


.passform
	input
		width: 20%
	.opener
		cursor: pointer
		&:hover
			p
				color: var(--green)

</style>