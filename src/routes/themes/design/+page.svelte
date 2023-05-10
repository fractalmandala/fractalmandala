<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'

</script>

<div class="rta-column text" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<h3 class="bord-bot p-bot-16">Design and Digital Creation</h3>
	<p>
		It all started for me back in 2009, when having encountered samplings of digital space art, I immediately desired to make the same. Inquiries online led me to AutoDesk 3D Max and Photoshop, using which my journey began.
	</p>
	<p>
		I still think this, one of the first pieces I ever created, isn't too bad. Is it?
	</p>
	<img class="spaceart" src="/images/spaceart.jpg" alt="space art"/>
	<p>I subtitled this piece with:</p>
	<blockquote>
		The home planet is not inhabitable anymore. That this would happen was known to the inhabitants yet preparation was not adequate...Finally, when survival was no longer possible, those who still possessed the technology to do so fled...
		3 Generation Ships took launch....home to millions inside the blue glowing vessels,<br><br>
		4 power cannons, glowing red hot with energy, also took off to supply power to the generation ships,<br><br>
		Hundreds of protectors, ready to protect and defend the fleet, lay ready in the deeper basements of the Generation Ships, and many out on patrol....<br><br>
		In the background, the planet slowly burns away as hot toxic lava flows out onto the surface from the core...
	</blockquote>
	<p>
		With the above, it should of course be no surprise that I play with Midjourney as I do today. Some of my early works that I still look back at with nostalgia are chronicled in this section. The current long-term design projects I'm working on are a <a href="/themes/design/components">UI components library</a>, and the Bṛhat Open Library.
	</p>
</div>

<style lang="sass">

.spaceart
	object-fit: cover
	width: 440px
	margin: 1rem 0 2rem 0

blockquote
	color: var(--near)
	font-size: 12px
	font-style: italic
	border-left: 2px solid var(--green)
	padding-left: 16px
	margin-bottom: 2rem

</style>