<div class="popout">
<slot></slot>
</div>

<style lang="sass">

.popout
	display: flex
	flex-direction: column
	position: fixed
	right: 16px
	top: 200px
	gap: 0
	padding: 32px
	backdrop-filter: blur(10px)
	border: 1px solid #272727
	border-radius: 4px

</style>