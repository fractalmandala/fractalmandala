
<div class="gridwork">
	<div class="bogg">1
	</div>
	<div class="bogg">2</div>
	<div class="bogg">3</div>
	<div class="bogg">4</div>
	<div class="bogg">5</div>
	<div class="bogg">6</div>
	<div class="bogg">7</div>
	<div class="bogg">8</div>
	<div class="bogg">9</div>
	<div class="bogg">10</div>
	<div class="bogg">11</div>
	<div class="bogg">12</div>
</div>

<style lang="sass">

.gridwork
	display: grid
	grid-auto-flow: row
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr
	grid-template-rows: 1fr
	grid-template-areas: ". . . . . . . . . . . ."
	position: fixed
	width: 100vw
	height: 40vh
	top: 0
	left: 0
	z-index: 9000 !important
	column-gap: 40px
	opacity: 1
	pointer-events: none
	.bogg
		border: 1px solid white
		height: 100%
		z-index: 9000
		display: flex
		align-items: center
		justify-content: center


</style>