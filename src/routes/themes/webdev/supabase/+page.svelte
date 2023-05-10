<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'	

</script>

<div class="rta-column" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<h3 class="bord-bot p-bot-16">Supabase</h3>
	<p>
		I <b>absolutely</b> love Supabase. How can anyone not! And for me it came at absolutely the right time as exactly what I needed/was looking for.
	</p>
	<p>
		What I was looking for was a database platform where I could upload data via csv, which could then be operated on using SQL or PostgreSQL, and which could function as a back-end to feed an entire website. Supabase is an delightful delivery of all three.
	</p>
	<p>
		They've got several integrations, making it possible to use it with a variety of tools and frameworks. As of right now I'm using it as the back-end for my organization's 2 websites, and it is powering development of my Bṛhat Open Library project.
	</p>
	<h5>
		To top it all, their entry-level tier is free, and has enough to offer for any small-scale project.
	</h5>
	<p class="bord-top p-top-32">
		To get started on the platform, their own documents are the most useful. I also found some YouTube videos helpful in figuring the integration with frameworks like Next.js or Sveltekit.
	</p>
	<p class="bord-bot p-bot-32">
	<a href="https://supabase.com/docs/guides/getting-started" target="_blank" rel="noreferrer">Supabase Docs</a>
	<span> | </span> <a href="https://supabase.com/docs/reference/javascript/introduction" target="_blank" rel="noreferrer">JS Client Setup</a>
	<span> | </span> <a href="https://youtu.be/ydz7Dj5QHKY" target="_blank" rel="noreferrer">Net Ninja on Youtube</a>
	<span> | </span> <a href="/themes/webdev/sveltekit/sveltekitandsupabase" target="_blank" rel="noreferrer">Supabase in Sveltekit</a>
	</p>
</div>

<style lang="sass">

h5
	color: var(--texttwo)

a
	position: relative
	color: var(--opposite)
	&::after
		position: absolute
		content: ''
		bottom: 0
		left: 0
		height: 1px
		width: 0%
		background: var(--opposite)
		transition: 0.2s
	&:hover
		color: var(--green)
		&::after
			width: 100%

</style>