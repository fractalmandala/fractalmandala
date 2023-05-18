<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
  import ChatHistory from '$lib/agents/ChatHistory.svelte';
  import ChatMessage from '$lib/agents/ChatMessage.svelte';
  import Input from '$lib/agents/Input.svelte';
	import Send from '$lib/icons/Send.svelte'
  import { chatMessages, answer } from '$lib/agents/chat-messages';

  let query = '';
	let placeHold = 'Let us begin!'

  const handleSubmit = async () => {
    answer.set('...');
    await chatMessages.set(query);
    query = '';
  };
</script>

<div class="rta-grid grid2 left0 minH"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:dark={$themeMode}
	class:light={!$themeMode}
	>
  <div class="rta-column bar-side">
    <ChatHistory />
  </div>
  <div class="rta-column area-the">
    <div class="rta-column rowgap200">
    	{#each $chatMessages.messages as message}
    	  <ChatMessage type={message.role} message={message.content} />
    	{/each}
      {#if $answer}
        <ChatMessage type="assistant" message={$answer} />
      {/if}
    </div>

		<div class="rta-column holds-form fullW xcenter">
    	<form
    	  class="rta-row fullW"
    	  on:submit|preventDefault={handleSubmit}
    	>
    	  <Input type="text" bind:value={query} class="w-full" placeholder={placeHold} />
    	</form>
		</div>
  </div>
</div>

<style lang="sass">

.bar-side
	background: var(--contraster)

.levelzero
	padding-top: 0px
	.bar-side
		padding: 112px 32px 32px 32px
		height: 100vh
		position: sticky
		top: 0
	.area-the
		padding: 112px 160px 64px 160px
		height: 100%
		justify-content: space-between

</style>
