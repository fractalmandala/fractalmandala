<script lang="ts">

  import { getContext } from 'svelte';
	import ApiModal from '$lib/buildapp/ApiModal.svelte'
  import { truncateStringInMiddle } from '$lib/buildapp/sharedutils';
  import { openAiApiKey$ } from '$lib/buildapp/stores';
  import HeroFeature from '$lib/buildapp/HeroFeature.svelte';
  import { HOW_TO_GET_API_KEY_LINK } from '$lib/buildapp/sharedconstants';

  import ApiKeyModal from '$lib/buildapp/ApiModal.svelte';

  const features = [
    {
      title: 'Faster responses.',
      description: `Connect directly to the OpenAI API and bypass slow typing animations for quick response times.`,
    },
    {
      title: 'Stay connected.',
      description: `Leave your tab open and stay connected forever without having to log back in.`,
    },
    {
      title: 'Searchable chat history.',
      description: `Dig up old conversations and find lost answers.`,
    },
    {
      title: 'Always available chat history.',
      description: `All keys and chats are stored locally within your browser, accessible any time.`,
    },
    {
      title: 'No registration required.',
      description: `Storing keys, chats, and sending messages are done directly in the browser with no intermediaries.`,
    },
    {
      title: 'Free (bring your own key).',
      description: `Access all base features for free. Get your own OpenAI API key for free.`,
    }
  ];

</script>



<button
  class="secondbutton"
>
  Enter API
</button>

