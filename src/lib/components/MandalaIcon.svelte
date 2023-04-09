<div class="mandalasecondicon">
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="rect1" x="16" y="8" width="8" height="8" rx="4" fill="#FFFFFF"/>
		<rect id="rect2" y="8" width="8" height="8" rx="4" fill="#FFFFFF"/>
		<rect id="rect3" x="8" y="8" width="8" height="8" rx="4" transform="rotate(-90 8 8)" fill="#FFFFFF"/>
		<rect id="rect4" x="8" y="24" width="8" height="8" rx="4" transform="rotate(-90 8 24)" fill="#FFFFFF"/>
	</svg>
</div>

<style lang="sass">

.mandalasecondicon
	cursor: pointer
	transform-origin: center center
	width: 24px
	height: 24px
	transition: 0.4s ease
	&:hover
		transform: rotate(180deg)

svg
	transform-origin: center center
	padding: 1px
	rect
		rx: 4
	&:hover
		transform: scale(1.1)
		#rect1
			animation: gogreen 0.4s ease forwards
		#rect2
			animation: gogreen 0.3s ease 0.1s forwards
		#rect3
			animation: gogreen 0.2s ease 0.2s forwards
		#rect4
			animation: gogreen 0.1s ease 0.3s forwards
		rect
			rx: 2

@keyframes gogreen
	0%
		fill: white
	100%
		fill: #10D56C


</style>
