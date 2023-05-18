<script lang="ts">

  import { marked } from 'marked';
  import type { ChatCompletionRequestMessageRoleEnum } from 'openai';
  import { onMount } from 'svelte';
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'

  export let type: ChatCompletionRequestMessageRoleEnum;
  export let message: string = '';
	
  export { classes as class };

  let classes = '';
  let scrollToDiv: HTMLDivElement;

  const classSet = {
    user: 'gpt-user',
    assistant: 'gpt-asst',
    system: 'gpt-sys'
  };

  const typeEffect = (node: HTMLDivElement, message: string) => {
    return {
      update(message: string) {
        scrollToDiv.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'end' });
      }
    };
  };

  onMount(() => {
    scrollToDiv.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'end' });
		Prism.highlightAll();
  });
</script>


<div class="rta-column null {classSet[type]}">
	<small>{type === 'user' ? 'me' : 'gptboi'}</small>
  <div
    class="rta-column parsed {classes} {classSet[type]}"
  >
    {@html marked.parse(message)}
  </div>
  <div bind:this={scrollToDiv} />
</div>

<style lang="sass">

small
	font-size: 12px

</style>


