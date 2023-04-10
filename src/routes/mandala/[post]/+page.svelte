<script lang="ts">

	export let data

</script>

<div class="mandpand">
	<div class="blogformatting">
		<h1>
			{data.title}
		</h1>
			<svelte:component this={data.content}/>
	</div>
</div>

<style lang="sass">

.mandpand
	box-sizing: border-box
	@media screen and (min-width: 1024px)
		padding-left: 64px
		padding-right: 64px !important

h1
	border-bottom: 1px solid #272727
	padding-bottom: 16px
	color: white

</style>