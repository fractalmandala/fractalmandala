<script lang="ts">

	export let colorIs = '#FFFFFF'
	export let rotated = false

</script>

<div class="rta-row ycenter" class:rotated={rotated}>
	<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M16 21.2667L7.2 12.4667L9.43333 10.2333L16 16.8333L22.5667 10.2667L24.8 12.5L16 21.2667Z" fill={colorIs}/>
	</svg>
</div>

<style lang="sass">

.rta-row
	cursor: pointer
	svg
		height: 30px
		object-fit: cover
		transition: 0.13s
		transform-origin: center center
	&:hover
		svg path
			fill: #10D56C
		svg
			transform: scale(0.88)

.rta-row.rotated
	svg
		transform: rotate(180deg)

</style>
