<script lang="ts">

  import { page } from '$app/stores';
	import { backIn, expoInOut, backOut } from 'svelte/easing'
  import { fly } from 'svelte/transition';

</script>


{#key $page.url}
	<div in:fly={{ delay: 300, duration: 500, x: 900, easing: expoInOut }} out:fly={{ duration: 300, delay: 0, x: -900, easing: backOut }}>
		<slot></slot>
	</div>
{/key}