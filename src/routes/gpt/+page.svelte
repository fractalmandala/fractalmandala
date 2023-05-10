<script lang="ts">
		
	import visibilityMode from '$lib/stores/visibility'	
	import GPTBox from '$lib/agents/GPTBox.svelte'

	let fake = false
	let isChat = false
	let password = ''
	let input: HTMLInputElement

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

<div class="rta-column" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<h1>GPT Chats</h1>
	<form class="rta-column rowgap100 passform">
		<input type="password" bind:value={password} bind:this={input}/>
		<div class="rta-column rowgap200 opener" on:click={toggleChat} on:keydown={fauxfake}><p>Open</p></div>
	</form>
		{#if isChat}
			<GPTBox></GPTBox>
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