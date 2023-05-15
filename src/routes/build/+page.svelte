<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'
	let pageTitle = 'Build Area'


</script>

<div class="holdingpage"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<div class="rta-column stickyboy solo" class:dark={$themeMode} class:light={!$themeMode}>
		<BreadCrumb/>
		<h2 class="bord-bot p-bot-16">
			Build Area
		</h2>
	</div>
	<div class="rta-column snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
<p>Storage space for things under construction and those I've to get to.</p>
<ul>
<li>Need to figure out auth in Sveltekit. Tried Supabase and Lucia but am doing something wrong.</li>
<li>GPT tool that uses localStorage, streams chats, saves message history, and stores key in local browser.</li>
<li>Want to get a regular newsletter stream going.</li>
<li>Use Twitter API to fetch and render tweets.</li>
</ul>
	</div>

</div>


<style lang="sass">

h2
	font-family: 'Spline Sans', sans-serif
	border-bottom: var(--bord)
	margin-top: 32px
	margin-bottom: 32px
	padding-bottom: 32px

</style>
