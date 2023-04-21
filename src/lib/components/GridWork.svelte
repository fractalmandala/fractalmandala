
<div class="gridwork bdr">
	<div class="inbox sideleft"></div>
	<div class="centerb inbox">
		<div class="inbox box1"></div>
		<div class="inbox box2"></div>
		<div class="inbox box3"></div>
		<div class="inbox box4"></div>
	</div>
	<div class="inbox sideright"></div>
</div>

<style lang="sass">

$grid-gap: 2%
$top-row-height: 56px
$bottom-row-height: 56px
$left-column-width: calc(100% / 6)
$right-column-width: calc(100% / 6)
$middle-column-width: calc(100% / 2)

.gridwork
	padding: 0
	box-sizing: border-box
	@media screen and (max-width: 786px)
		display: grid
		grid-template-rows: $top-row-height 1fr $bottom-row-height
		grid-gap: $grid-gap
	@media screen and (min-width: 787px)
		display: grid
		grid-template-columns: $left-column-width $middle-column-width $right-column-width
		grid-template-rows: 1fr
		grid-template-areas: "sideleft centerb sideright"
		grid-gap: $grid-gap

.sideleft
	width: $left-column-width
	grid-area: sideleft

.sideright
	width: $right-column-width
	grid-area: sideright

.centerb
	display: grid
	grid-template-columns: repeat(5, 1fr)
	grid-template-rows: repeat(5, 1fr)
	grid-gap: $grid-gap
	width: $middle-column-width
	grid-area: centerb

.inbox, .bogg
	border: 1px solid white

</style>