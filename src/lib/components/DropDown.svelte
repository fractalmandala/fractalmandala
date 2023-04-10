<div class="dropdown">
<slot></slot>
</div>


<style lang="sass">


.dropdown
	display: flex
	flex-direction: column
	min-width: 240px
	text-align: right
	position: absolute
	top: 0px
	padding-top: 48px
	right: 0
	@media screen and (max-width: 1023px)
		left: 0
		width: 100%
		text-align: center

	

</style>