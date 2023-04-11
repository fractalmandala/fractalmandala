<script lang="ts">

	export let data

</script>

<svelte:head>
<title>{data.title} - Fractal Maṇḍala Blog</title>
<meta name="description" content="{data.tags}"/>
</svelte:head>

<div class="mandpand">
	<div class="blogformatting">
		<h1>
			{data.title}
		</h1>
			<div class="blogpadding">
				<svelte:component this={data.content}/>
			</div>
	</div>
</div>

<style lang="sass">

.mandpand
	box-sizing: border-box
	padding-bottom: 64px
	@media screen and (min-width: 1024px)
		padding-left: 64px
		padding-right: 64px !important

.blogpadding
	@media screen and (min-width: 1024px)
		padding-left: 80px
		padding-right: 120px

h1
	border-bottom: 1px solid #272727
	padding-bottom: 16px
	color: white
	font-size: 48px

</style>