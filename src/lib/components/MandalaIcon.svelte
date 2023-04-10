<div class="mandalasecondicon">
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect id="rect1" x="16" y="8" width="8" height="8" rx="4" fill="#474747"/>
		<rect id="rect2" y="8" width="8" height="8" rx="4" fill="#474747"/>
		<rect id="rect3" x="8" y="8" width="8" height="8" rx="4" transform="rotate(-90 8 8)" fill="#474747"/>
		<rect id="rect4" x="8" y="24" width="8" height="8" rx="4" transform="rotate(-90 8 24)" fill="#474747"/>
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
		animation: justwhites 30s ease infinite
	&:hover
		transform: scale(1.1)
		rect
			rx: 2
			fill: #10D56C !important




</style>
