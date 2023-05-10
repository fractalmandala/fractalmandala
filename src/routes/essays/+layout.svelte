<div class="rta-grid grid2 stdfix">
	<div class="rta-column mainone">
		<slot></slot>
	</div>
	<div class="rta-column rightone">
		<p><strong><a href="/essays">ESSAYS HOME</a></strong></p>
		<p><a href="/essays/macrohistoriccase">1. The Macrohistoric Case for India's Civilizational Primacy</a></p>
		<p><a href="/essays/historyvsitihasa">2. History is Ontic, Itihāsa Ontologic</a></p>
		<p><a href="/essays/rathaasbija">3. Ratha as a Bīja of Civilizational DNA</a></p>
		<p><a href="/essays/indiancivcon">4. Indian Civilizational Consciousness</a></p>
		<p><a href="/essays/ramasjourney">5. Rāma Journey, the Avatāra in You</a></p>
	</div>
</div>


<style lang="sass">

.grid2
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 280px
		grid-template-areas: "mainone rightone"
		.mainone
			padding-right: 4vw
		.rightone
			padding-left: 24px
			border-left: 1px solid var(--borderline)
			height: max-content
			position: sticky
			top: 128px
			p
				font-size: 0.8rem
				cursor: pointer
				&:hover
					color: var(--green)


</style>