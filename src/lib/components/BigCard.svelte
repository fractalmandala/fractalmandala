<div class="bigcard">
	<slot name="title"></slot>
	<slot name="tags"></slot>
</div>

<style lang="sass">

.bigcard
	display: flex
	flex-direction: column
	position: relative
	backdrop-filter: blur(20px)
	z-index: 3
	border: 1px solid #272727
	justify-content: center
	align-items: center
	text-align: center
	border-radius: 4px
	&::before
		position: absolute
		top: 0
		left: 0
		right: 0
		content: ''
		width: 100%
		height: 100%
		border-radius: 4px
		margin: 0 auto
		z-index: -1
		background: linear-gradient(89deg, rgba(16,213,108,0.2), rgba(40,170,53,0.4))
		background-size: 100% 100%
		animation: theglowing 8s ease infinite
		filter: blur(30px)
	&::after
		position: absolute
		background: rgba(0,0,0,0.8)
		backdrop-filter: blur(10px)
		content: ''
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -1
		border-radius: 4px
	&:hover
		&::after
			background: rgba(0,0,0,0.3)

@keyframes theglowing
	0%
		background-position: 0% 50%
	50%
		background-position: 100% 50%
	100%
		background-position: 0% 50%



</style>