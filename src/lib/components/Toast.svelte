<script lang="ts">

	import { scale } from 'svelte/transition'

</script>

<div class="toast click" transition:scale>
	<slot></slot>
</div>

<style lang="sass">

.toast
	display: flex
	flex-direction: column
	position: absolute
	align-items: center
	justify-content: center
	text-align: center
	top: -48px
	left: 40px
	width: 80px
	height: 32px
	background: #171717
	border: 1px solid white
	border-radius: 3px
	z-index: 1000
	color: white
	text-transform: uppercase
	font-size: 10px
	box-shadow: 4px 8px 12px #030303


</style>