<script lang="ts">

	import { themeMode } from '$lib/stores/globalstores'


</script>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		Build Area
	</h3>
</div>
<div class="rta-grid grid2 stdfix" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="rta-column mainone">
		<div class="rta-column p-top-32">
			<p>Storage space for things under construction and those I've to get to.</p>
			<ul>
			<li>Need to figure out auth in Sveltekit. Tried Supabase and Lucia but am doing something wrong.</li>
			<li>GPT tool that uses localStorage, streams chats, saves message history, and stores key in local browser.</li>
			<li>Want to get a regular newsletter stream going.</li>
			<li>Use Twitter API to fetch and render tweets.</li>
			</ul>
		</div>
	</div>
	<div class="rta-column rightone">
		<p class="tt-u"><a href="/build/designlibrary">Design Library</a></p>
	</div>
</div>

