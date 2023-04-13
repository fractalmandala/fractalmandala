<script lang="ts">

  import { page } from '$app/stores';
	import { backIn, expoInOut } from 'svelte/easing'
  import { fly } from 'svelte/transition';

</script>


{#key $page.url}
	<div in:fly={{ delay: 300, duration: 500, x: 900, easing: expoInOut }} out:fly={{ duration: 250, delay: 0, x: -900, easing: backIn }}>
		<slot></slot>
	</div>
{/key}