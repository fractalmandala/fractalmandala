<div class="buttonglow" style="width: var(--buttonwidth)">
	<slot></slot>
</div>

<style lang="sass">

.buttonglow
	border: 1px solid #272727
	border-radius: 4px
	cursor: pointer
	transform-origin: center center
	color: #FFFFFF
	position: relative
	transition: all 0.15s var(--cubed)
	box-shadow: 4px 6px 12px #010101
	background: rgba(0,0,0,1)
	backdrop-filter: blur(3px)
	height: 32px
	font-size: 14px
	display: flex
	flex-direction: row
	align-items: center
	justify-content: center
	text-align: center
	&::before
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		content: ''
		background-color: var(--this)
		filter: blur(40px)
		z-index: -1
		background-image: radial-gradient(at 97% 96%, hsla(108,67%,92%,1) 0px, transparent 100%), radial-gradient(at 5% 70%, hsla(325,87%,90%,1) 0px, transparent 50%)
		background-size: 400% 400%
	&:hover
		backdrop-filter: blur(30px)
		&::before
			filter: blur(10px)


</style>