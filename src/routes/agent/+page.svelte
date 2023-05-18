<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { APIKeyStore } from '$lib/gptapp/APIKeyStore';
	import ChatMessage from '$lib/buildapp/ChatMessage.svelte'
	import ChatSidebar from '$lib/buildapp/ChatSidebar.svelte'
	import InputText from '$lib/deslib/InputText.svelte'

	$: isValidKey = typeof $APIKeyStore === 'string' && $APIKeyStore.startsWith('sk-');

	let isLoading = true;

	function onDone() {
		isLoading = false;
	}

</script>

<div class="solopage minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:dark={$themeMode}
	class:light={!$themeMode}
	>
	<div class="gpt-grid rta-grid grid2 minH">
		<div class="settings-bar rta-column">
		{#if $APIKeyStore !== null && isValidKey}
			<ChatSidebar apiKey={$APIKeyStore}/>
		{/if}
		</div>
		<div class="chat-area rta-column">
			{#if $APIKeyStore !== null && isValidKey}
				<ChatMessage apiKey={$APIKeyStore}/>
				{:else}
				<InputText/>
			{/if}
		</div>

	</div>
</div>

<style lang="sass">

.chat-area
	padding-left: 32px

.settings-bar
	padding-right: 32px
	border-right: 1px solid var(--borderline)
	position: sticky
	top: 0

.levelzero
	.gpt-grid
		grid-template-columns: 320px 1fr
		grid-template-areas: "settings-bar chat-area"
		justify-content: start
		padding: 80px 32px 32px 32px
		.chat-area
			grid-area: chat-area
		.settings-bar
			grid-area: settings-bar
			width: 320px

</style>