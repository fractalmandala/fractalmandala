<div class="tinycard">
<span class="typ1"></span>
<span class="typ2"></span>
<span class="typ3"></span>
<span class="typ4"></span>
	<slot name="category"></slot>
	<slot name="title"></slot>
	<div class="moremeta">
		<slot name="lang"></slot>
		<slot name="tags"></slot>
	</div>
</div>


<style lang="sass">

.tinycard
	display: flex
	flex-direction: column
	transform-origin: center center
	position: relative
	overflow: hidden
	border: 1px solid #272727
	padding: 12px
	border-radius: 4px
	background: rgba(23,23,23,1)
	&:hover
		animation: tinydance 0.42s cubic-bezier(0.000, 0.760, 0.645, 1.650) forwards
	@media screen and (min-width: 1024px)
		row-gap: 4px
	@media screen and (max-width: 1023px)
		row-gap: 4px

@media screen and (min-width: 1024px)
	@keyframes tinydance
		0%
			box-shadow: -4px 0px 8px rgba(0,0,0,0.7)
			border: 1px solid #272727
			transform: scale(1.0)
		100%
			box-shadow: 3px 5px 8px rgba(0,0,0,0.7)
			border: 1px solid transparent
			transform: scale(1.12)

@media screen and (max-width: 1023px)
	@keyframes tinydance
		0%
			box-shadow: -4px 0px 8px rgba(0,0,0,0.7)
			border: 1px solid #272727
			transform: scale(1.0)
		100%
			box-shadow: 3px 5px 8px rgba(0,0,0,0.7)
			border: 1px solid transparent
			transform: scale(1.04)
	
.moremeta
	display: flex
	@media screen and (min-width: 1024px)
		flex-direction: row
		gap: 8px
	@media screen and (max-width: 1023px)
		flex-direction: column

.tinycard
	&:hover
		.typ1
			animation: xtypeone 0.2s ease forwards
		.typ2
			animation: xtypetwo 0.31s ease forwards
		.typ3
			animation: xtypethree 0.2s ease forwards
		.typ4
			animation: xtypefour 0.4s cubic-bezier(1.000, -0.005, 0.275, 1.455) forwards

.typ1
	position: absolute
	top: 0
	left: 0
	width: 1px
	background: #10C56D
	height: 0
	border-radius: 4px

.typ2
	position: absolute
	top: 0
	left: 0
	height: 1px
	width: 0
	background: #10C56D
	border-radius: 4px

.typ3
	position: absolute
	top: 0
	right: 0
	width: 1px
	height: 0
	background: #10C56D
	border-radius: 4px

.typ4
	position: absolute
	bottom: 0
	left: 0
	height: 1px
	width: 0
	background: #10C56D
	border-radius: 4px

@keyframes typeone
	0%
		height: 0
		margin-top: 0
	50%
		height: 100%
		margin-top: 0
	100%
		height: 100%
		margin-top: 100%

@keyframes typetwo
	0%
		width: 0
		margin-left: 0
	50%
		width: 100%
		margin-left: 0
	100%
		width: 100%
		margin-left: 100%

@keyframes typethree
	0%
		margin-top: 100%
		height: 100%
	50%
		margin-top: 0
		height: 100%
	100%
		margin-top: 0
		height: 0

@keyframes typefour
	0%
		width: 100%
		margin-left: 100%
	50%
		margin-left: 0
		width: 100%
	100%
		width: 0
		margin-left: 0
	

</style>