
<script lang="ts">

	import { breakTwo } from '$lib/stores/globalstores'

</script>

<div class="rta-icon rta-row ycenter">
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class:whitened={$breakTwo}>
<path d="M4 24V22H28V24H4ZM4 17V15H28V17H4ZM4 10V8H28V10H4Z" fill="#474747"/>
</svg>

</div>

<style lang="sass">

.rta-icon
	cursor: pointer
	padding-bottom: 2px
	svg
		height: 28px
		width: 32px
		object-fit: cover
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