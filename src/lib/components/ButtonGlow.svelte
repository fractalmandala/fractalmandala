<div class="buttonglow" style="width: var(--buttonwidth)">
	<slot></slot>
</div>

<style lang="sass">

.buttonglow
	cursor: pointer
	border-radius: 4px
	transform-origin: center center
	color: #FFFFFF
	transition: all 0.15s ease
	border: 1px solid #272727
	box-shadow: 0px 0px 0px #070707
	font-size: 14px
	padding: 4px 8px
	position: relative
	overflow: hidden
	z-index: 1
	text-align: center
	&::before
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		content: ''
		z-index: -1
		transition: all 0.05s ease
		filter: blur(20px)
		background-image: radial-gradient(at 17% 36%, hsla(248,47%,49%,1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,0.2) 0px, transparent 50%)
	&:hover
		overflow: hidden
		box-shadow: 8px 4px 12px #070707
		&::before
			background-color: hsla(130,90%,45%,1)
			filter: blur(15px)


</style>