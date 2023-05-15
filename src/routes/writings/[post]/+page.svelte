<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'

	export let data

</script>


<div class="padding"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<h2 class="tt-u">
		{data.title}
	</h2>
	<div class="rta-column newblog" class:dark={$themeMode} class:light={!$themeMode}>
		<svelte:component this={data.content}/>
	</div>
</div>

<style lang="sass">

.padding.levelzero
	padding-left: 6vw
	padding-right: 18vw


</style>

