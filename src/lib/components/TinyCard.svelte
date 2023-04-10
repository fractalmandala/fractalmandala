<script lang="ts">

	import { scale } from 'svelte/transition'
	export let i:any

</script>



<div class="tinycard" in:scale={{delay: 50*i}} out:scale={{ delay: 10*i}}>
			<slot name="category"></slot>
			<slot name="title"></slot>
			<div class="moremeta">
		<slot name="lang"></slot>
		<slot name="tags"></slot>
	</div>
</div>


<style lang="sass">

.tinycard
	display: flex
	flex-direction: column
	transform-origin: center center
	position: relative
	overflow: hidden
	border: 1px solid #272727
	padding: 12px
	border-radius: 4px
	background: rgba(23,23,23,1)
	&:hover
		animation: tinydance 0.42s cubic-bezier(0.000, 0.760, 0.645, 1.650) forwards
	@media screen and (min-width: 1024px)
		row-gap: 4px
	@media screen and (max-width: 1023px)
		row-gap: 4px

@media screen and (min-width: 1024px)
	@keyframes tinydance
		0%
			box-shadow: -4px 0px 8px rgba(0,0,0,0.7)
			border: 1px solid #272727
			transform: scale(1.0)
		100%
			box-shadow: 3px 5px 8px rgba(0,0,0,0.7)
			border: 1px solid transparent
			transform: scale(1.12)

@media screen and (max-width: 1023px)
	@keyframes tinydance
		0%
			box-shadow: -4px 0px 8px rgba(0,0,0,0.7)
			border: 1px solid #272727
			transform: scale(1.0)
		100%
			box-shadow: 3px 5px 8px rgba(0,0,0,0.7)
			border: 1px solid transparent
			transform: scale(1.04)
	
.moremeta
	display: flex
	@media screen and (min-width: 1024px)
		flex-direction: row
		gap: 8px
	@media screen and (max-width: 1023px)
		flex-direction: column


</style>