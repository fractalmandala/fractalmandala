<div class="mandala-image">
	<img class="mandalaimage" src="/images/mands.webp" alt="mandala" />
</div>

<style lang="sass">

.mandala-image
	width: 40px
	height: 40px
	img
		transform-origin: center center
		animation: mandaling 24s infinite alternate-reverse
		object-fit: contain
		width: 100%
		height: 100%

@keyframes mandaling
	0%
		transform: rotate(360deg)
	50%
		transform: rotate(0deg)
	100%
		transform: rotate(-360deg)

</style>