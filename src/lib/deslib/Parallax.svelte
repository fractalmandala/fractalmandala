<script lang="ts">

	let shift:number

</script>


<svelte:window bind:scrollY={shift}/>

<div class="back" style="transform: translateY({shift/2}px)">
	<slot></slot>
</div>

<style lang="sass">

.back
	height: 100%
	width: 100%
	background-image: var(--parallax)
	background-size: cover
	background-position: center center
	background-repeat: no-repeat

	

</style>