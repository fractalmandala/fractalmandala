<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores'
	import { filteredWritings } from '$lib/utils/localpulls'
	let pageItems:any
	let theme:any

	export let data

	onMount(async() => {
		theme = data.type
		pageItems = await filteredWritings(theme)
	})

</script>

<div class="solopage zepad all minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
>
	<div class="rta-column rowgap100 ycenter can-stick p-bot-16">
		<h4 class="tt-u">
			{data.title}
		</h4>
	</div>

	<div class="rta-column rowgap100 newblog bord-top p-top-32">
		<svelte:component this={data.content}/>
	</div>
</div>


<style lang="sass">


.levelzero
	.newblog
		width: 800px
		margin-left: 120px
	.can-stick
		padding-left: 120px

.levelone
	.newblog
		width: 800px
		margin-left: 0px
	.can-stick
		padding-left: 0px

</style>

