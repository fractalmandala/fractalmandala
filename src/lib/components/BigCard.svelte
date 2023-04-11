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
	transition: all 0.7s cubic-bezier(0.430, 0.580, 0.000, 1.140)
	&::before
		position: absolute
		top: 0
		left: 0
		right: 0
		content: ''
		width: 50%
		height: 80%
		border-radius: 4px
		margin: 0 auto
		z-index: -1
		background: linear-gradient(89deg, rgba(16,213,108,0.2), rgba(40,170,53,0.4))
		background-size: 400% 8%
		transition: 0.1s ease
		filter: blur(60px)
		animation: rainbow 60s ease infinite
	&::after
		position: absolute
		background: rgba(0,0,0,0)
		backdrop-filter: blur(10px)
		content: ''
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -1
		border-radius: 4px
		animation: theglowing 4s cubic-bezier(0.430, 0.580, 0.000, 1.140) infinite
	&:hover
		border-radius: 0
		backdrop-filter: 0
		height: 220px
		&::before
			background: linear-gradient(89deg, rgba(16,213,108,0.5), rgba(40,170,53,0.2))
			width: 100%
			height: 100%
			background-size: 400% 100%
			border-radius: 0
		&::after
			background: rgba(0,0,0,0.3)
			border-radius: 0
	@media screen and (min-width: 1024px)
		height: 200px
		padding: 24px
	@media screen and (max-width: 1023px)
		height: 120px
		padding: 16px
		&:hover
			height: 160px

@keyframes theglowing
	0%
		background-position: 0% 50%
		background: rgba(0,0,0,0.8)
	50%
		background-position: 100% 50%
		background: rgba(0,0,0,0.6)
	100%
		background-position: 0% 50%
		background: rgba(0,0,0,0.8)

@keyframes rainbow
	0%
		background: linear-gradient(89deg, rgba(16,213,108,0.2), rgba(40,170,53,0.4))
	25%
		background: linear-gradient(89deg, rgba(146,255,176,0.2), rgba(157,255,79,0.4))
	50%
		background: linear-gradient(89deg, rgba(79,86,255,0.2), rgba(199,79,255,0.4))
	75%
		background: linear-gradient(89deg, rgba(255,79,154,0.2), rgba(255,79,79,0.4))
	100%
		background: linear-gradient(89deg, rgba(255,185,79,0.2), rgba(178,255,79,0.4))

</style>