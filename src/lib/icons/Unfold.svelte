
<script lang="ts">

	import { breakTwo } from '$lib/stores/globalstores'

</script>

<div class="rta-icon rta-row ycenter">
	<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class:whitened={$breakTwo}>
		<path d="M16 28.8L9.13333 21.9333L11.4 19.6667L16 24.3L20.6 19.6667L22.8667 21.9333L16 28.8ZM11.4 12.3667L9.13333 10.1333L16 3.26666L22.8667 10.1333L20.6 12.3667L16 7.76666L11.4 12.3667Z" fill="#474747"/>
	</svg>
</div>

<style lang="sass">

.rta-icon
	cursor: pointer
	svg
		height: 24px
		object-fit: contain
		transition: 0.13s
		transform-origin: center center
	&:hover
		svg path
			fill: #10D56C
		svg
			transform: scale(0.88)


.rta-icon
	svg.whitened
		height: 28px
		path
			fill: white
	&:hover
		svg path
			fill: #272727

</style>