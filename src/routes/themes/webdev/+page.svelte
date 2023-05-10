<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'

</script>

<div class="rta-column text" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<h3 class="bord-bot p-bot-16">Web Development</h3>
	<p>
		A basic overview of my 'stack':
	</p>
<p>
	- backend at <a href="https://supabase.com/" target="_blank" rel="noreferrer">Supabase</a><br>
	- framework: <a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">Sveltekit</a><br>
	- deployed at <a href="https://vercel.com/home" target="_blank" rel="noreferrer">Vercel</a><br>
</p>
<p>
	Also mounted on and off:
</p>
<ul>
	<li><a href="https://lenis.studiofreight.com/" target="_blank" rel="noreferrer">Lenis</a></li>
	<li><a href="https://greensock.com/gsap/" target="_blank" rel="noreferrer">GSAP</a></li>
	<li><a href="https://mdsvex.pngwn.io/" target="_blank" rel="noreferrer">MDSvex</a></li>
	<li><a href="https://github.com/SharifClick/svelte-swipe" target="_blank" rel="noreferrer">Svelte Swipe</a></li>
	<li><a href="https://github.com/DaveKeehl/svelte-reveal" target="_blank" rel="noreferrer">Svelte Reveal</a></li>
	<li><a href="https://sveltelegos.com/" target="_blank" rel="noreferrer">Svelte Legos</a></li>
	<li><a href="https://prismjs.com/" target="_blank" rel="noreferrer">Prism JS</a></li>
</ul>
<h6 class="bord-top p-top-32">Sections:</h6>
	<h5 class="near thin"><a href="/themes/webdev/sveltekit">Sveltekit</a>
		<span> | </span><a href="/themes/webdev/supabase">Supabase</a>
		<span> | </span><a href="/themes/webdev/javascript">Javascript</a>	
		<span> | </span><a href="/themes/webdev/general">General</a>
	</h5>
</div>

<style lang="sass">

.rta-column.text
	@media screen and (min-width: 1024px)
		padding-right: 280px

</style>