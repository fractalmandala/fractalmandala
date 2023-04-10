<script lang="ts">

	import { onMount } from 'svelte'
	import Header from '$lib/components/Header.svelte'
	import { allMandalas } from '$lib/utils/localpulls'
	import BigCard from '$lib/components/BigCard.svelte'
	import { page } from '$app/stores'

	let pageurl:any	
	let mands:any

	onMount(async() => {
		pageurl = $page.url.pathname
		mands = await allMandalas()
	})

</script>


<div class="pagecontainer">
	<p>
		A simple blog to document a non-programmer bootstrapping himself into web-dev. <span class="special">My stack:</span>
	</p>
	<p>
		- backend at <a href="https://supabase.com/" target="_blank" rel="noreferrer">Supabase</a><br>
		- framework: <a href="https://kit.svelte.dev/" target="_blank" rel="noreferrer">Sveltekit</a><br>
		- deployed at <a href="https://vercel.com/home" target="_blank" rel="noreferrer">Vercel</a><br>
		- also mounted:
	</p>
				<li><a href="https://lenis.studiofreight.com/" target="_blank" rel="noreferrer">Lenis</a></li>
				<li><a href="https://greensock.com/gsap/" target="_blank" rel="noreferrer">GSAP</a></li>
				<li><a href="https://mdsvex.pngwn.io/" target="_blank" rel="noreferrer">MDSvex</a></li>
				<li><a href="https://github.com/SharifClick/svelte-swipe" target="_blank" rel="noreferrer">Svelte Swipe</a></li>
				<li><a href="https://github.com/DaveKeehl/svelte-reveal" target="_blank" rel="noreferrer">Svelte Reveal</a></li>
				<li><a href="https://sveltelegos.com/" target="_blank" rel="noreferrer">Svelte Legos</a></li>
				<li><a href="https://prismjs.com/" target="_blank" rel="noreferrer">Prism JS</a></li>
</div>
<div class="gridof3 x2">
	{#if mands && mands.length > 0}
		{#each mands as item, i}
			<BigCard>
				<h5 slot="title">
				<a href={item.path} target="_self">
					{item.meta.title}
				</a>
				</h5>
				<p slot="tags">{item.meta.tags}</p>
			</BigCard>
		{/each}
	{/if}
</div>

<style lang="sass">

.pagecontainer 
	border-bottom: 1px solid #272727
	p .special
		background: #64F540
		background: linear-gradient(to right, #64F540 0%, #11E876 50%, #07E859 100%)
		-webkit-background-clip: text
		-webkit-text-fill-color: transparent
	a
		position: relative
		&:hover
			background: #64F540
			background: linear-gradient(to right, #64F540 0%, #11E876 50%, #07E859 100%)
			-webkit-background-clip: text
			-webkit-text-fill-color: transparent
			&::after
				animation: vanishing 0.08s ease forwards
		&::after
			position: absolute
			bottom: 0
			left: 0
			height: 1px
			width: 100%
			content: ''
			background: #64F540
			background: linear-gradient(to right, #64F540 0%, #11E876 50%, #07E859 100%)


.gridof3
	display: grid
	grid-auto-flow: row
	grid-template-rows: auto
	padding-bottom: 64px
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr
		grid-template-areas: ". . ."
		padding-left: 21vw
		padding-right: 21vw
		gap: 24px
		margin-top: 64px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-areas: ". ."
		padding-left: 16px
		padding-right: 16px
		gap: 16px
		margin-top: 32px
		

@keyframes vanishing
	0%
		width: 100%
	100%
		width: 0
			

.pagecontainer
	margin-left: 0
	margin-right: 0
	p
		font-family: 'JetBrains Mono', monospace
		font-size: 16px
		color: #FFFFFF
		line-height: 2
	li
		font-family: 'JetBrains Mono', monospace
		font-size: 14px
		color: #FFFFFF
		line-height: 1.5
		list-style-type: none
		padding: 0
		margin-left: 32px
	@media screen and (min-width: 1024px)
		margin-left: 21vw
		margin-right: 21vw
	@media screen and (max-width: 1023px)
		padding: 16px
		margin-left: 0
		margin-right: 0
		p
			font-size: 14px


</style>