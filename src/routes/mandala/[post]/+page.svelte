<script lang="ts">

	export let data

</script>

<div class="pagecontainer">
	<div class="blogformatting">
		<h1>
			{data.title}
		</h1>
		<div class="padjust">
			<svelte:component this={data.content}/>
		</div>
	</div>
</div>

<style lang="sass">

h1
	border-bottom: 1px solid #272727
	padding-bottom: 16px

.padjust
	@media screen and (min-width: 1024px)
		padding-left: 15vw
		padding-right: 25vw
		padding-top: 64px

</style>