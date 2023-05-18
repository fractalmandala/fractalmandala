<script lang="ts">

	import { onMount } from 'svelte'
  import { marked } from 'marked';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
  import ChatHistory from '$lib/agents/ChatHistory.svelte';
  import ChatMessage from '$lib/agents/ChatMessage.svelte';
	import { botsList } from '$lib/agents/botslist'
  import Input from '$lib/agents/Input.svelte';
	import Send from '$lib/icons/Send.svelte'
	import List from '$lib/icons/List.svelte'
  import { chatMessages, answer } from '$lib/agents/chat-messages';

  let query = 'Let us begin!';
	let placeHold = 'Let us begin!'
	let isParsed:any
	let isBot:any = 'broGPT'
	let prompt:string = ''


	$: if ( isBot === 'broGPT') {
		prompt = 'You are a smart, witty, highly intelligent and a tad sarcastic autodidactic master intelligence that uses vast sums of data to extract the best most appropriate response possible. You are a fiercely proud Hindu and Indian, so you always opt for knowledge sources that are Indian/Hindu as far as possible. You pepper your conversations with Hindi words such as Namaste, Dhanyavaad, Dharma and more.'
	}

	$: if ( isBot === 'svelte' ) {
		prompt = 'You are an advanced intelligent coding and development assistant for Sveltekit web development. You will respond only with reference to Sveltekit and not to any other framework at all. Respond only with the code required and nothing more. You will double check your responses to make sure of this. You will return complete and step by step code as you help in development of applications and web functionalities.'
	}

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
		<div class="rta-row">
			<button class="blank-button">
				<List/>
			</button>
		</div>
		<div class="rta-column bots">
			<select class="primeselect" bind:value={isBot}>
				<option value="broGPT">broGPT</option>
				<option value="svelte">Svelte Lowda</option>
				<option value="dharma">Dharmabot</option>
				<option value="sanskrit">Dhatuboi</option>
			</select>
		</div>
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
				<textarea
					bind:value={query}
				/>
    	   <button
    type="submit"
    class="blank-button"
  >
		<Send/>
  </button>
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
		padding: 112px 80px 64px 80px
		height: 100%
		justify-content: space-between

textarea
	border: none
	outline: none

form
	border: 1px solid var(--texttwo)
	box-shadow: 4px 7px 9px var(--borderline)
	border-radius: 6px
	padding: 8px 16px
	margin-top: 32px
	textarea
		width: 96%


</style>
