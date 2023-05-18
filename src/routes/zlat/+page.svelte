<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import BestieChat from '$lib/buildapp/BestieChat.svelte'
	import ChatSidebar from '$lib/buildapp/ChatSidebar.svelte'
	import SidebarItem from '$lib/buildapp/SidebarItem.svelte'

</script>

<div
	class="solopage zepad y minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<h1 class="tt-u">
		Zlat
	</h1>
	<div class="rta-grid grid2">
		<div class="rta-column">
			<BestieChat/>
		</div>
		<div class="rta-column">
			<ChatSidebar/>
		</div>
	</div>
</div>

