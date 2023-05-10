<div class="rta-column">
	<h1>Sveltekit</h1>
	<p>
		I have no background or experience in web development, only a long-running interest in all things web-design and coding- which I began to pursue in 2023 armed with the utility of chatGPT.
	</p>
	<p>
		Completely unfamiliar with anything Javascript, I plunged headlong into Next.js and tried to figure my way up for a while. But I for one found it hard to find any level of comfort. No doubt, going from 0 on JS and React right to 100 on Next.js isn't really the recommended learning path. 
	</p>
	<p>
		Finally at the end of my frustration one day, I thought to give Sveltekit a try, and right away here's why I found it easier:
	</p>
	<ul>
		<li>Given my existing familiarity levels with HTML and CSS, there was less of a skip-up required to get a basic website up and running.</li>
		<li>
			The basic structure of a web-page in Sveltekit felt closer to the HTML structure of a page as I knew it. Working with Sveltekit felt more like working with an advanced-HTML framework.
		</li>
	</ul>
	<p class="bord-top p-top-32">
		In time I learnt Sveltekit's many delightful features- transitions, animations, stores, reactive variables, and more. It's simply fun to work on it, and in this section I've compiled snippets, some guides, etc. I've personally found these places very useful:
	</p>
	<p class="bord-bot p-bot-32">
	<a href="https://joyofcode.xyz/" target="_blank" rel="noreferrer">Joy of Code</a>
	<span> | </span> <a href="https://rodneylab.com/" target="_blank" rel="noreferrer">Rodney Lab</a>
	<span> | </span> <a href="https://svelte.dev/docs" target="_blank" rel="noreferrer">Svelte Docs</a>
	<span> | </span> <a href="https://kit.svelte.dev/docs/introduction" target="_blank" rel="noreferrer">Sveltekit Docs</a>
	</p>
</div>


<style lang="sass">

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