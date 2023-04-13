<script lang="ts">

  import { page } from '$app/stores';
	import { quintIn, expoInOut, quintOut } from 'svelte/easing'
  import { fly } from 'svelte/transition';

</script>


{#key $page.url}
	<div in:fly={{ delay: 200, duration: 600, y: 600, opacity: 0, easing: quintOut }} out:fly={{ duration: 200, delay: 0, y: -600, opacity: 0, easing: quintIn }}>
		<slot></slot>
	</div>
{/key}