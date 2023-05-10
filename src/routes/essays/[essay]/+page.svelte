<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'	
	export let data

</script>

<div class="rta-column back height-40" style="background-image: url('{data.image}')">
	<div class="rta-column screen ybot">
		<h1>
			{data.title}
		</h1>		
	</div>
</div>

<div class="rta-column blogstyle" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<svelte:component this={data.content}/>
</div>

<style lang="sass">

.screen
	background: rgba(0,0,0,0.35)
	height: 100%
	h1
		font-family: 'Spline Sans', sans-serif
		color: white
		font-weight: 500
	@media screen and (min-width: 1024px)
		padding: 32px

.blogstyle
	padding-top: 64px


</style>