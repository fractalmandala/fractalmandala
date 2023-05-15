<script lang="ts">
	import { onMount } from 'svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { themeMode, breakOne, breakTwo, breakZero, breakZeroOne } from '$lib/stores/globalstores';
	import { featuredAll } from '$lib/utils/localpulls';
	import { recentGallery } from '$lib/utils/supabase';
	import Logo from '$lib/assets/FMLogo.svelte';
	import '$lib/styles/prism.css';
	import '$lib/styles/prismtoolbar.css';
	import '$lib/styles/themes.sass';
	import '$lib/styles/tokens.sass';
	let pageTitle = 'Fractal Maṇḍala';
	let featured: any;
	let recentImages: any;
	let fake = false;
	let iW: number;
	let width = '50%';
	let expand: boolean[] = Array(20).fill(false);
	expand[8] = true;

	$: if (iW <= 768) {
		width = '100%';
	} else {
		width = '50%';
	}

	onMount(() => {
		(async () => {
			featured = await featuredAll();
			recentImages = await recentGallery();
		})();
	});
</script>

<svelte:window bind:innerWidth={iW} />

<svelte:head>
	<PageTitle {pageTitle} />
</svelte:head>

<div class="rta-column" id="panelone" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="rta-row colgap200 ycenter xend p-bot-32 headersection">
		<img class="mandalaimage" src="/images/mands.webp" alt="mandala" />
	</div>
</div>
{#if featured && featured.length > 0}
	<div class="rta-grid grid3 colgap300 rowgap300" class:dark={$themeMode} class:light={!$themeMode}>
		{#each featured as item}
			<a href={item.url} class="rta-column rowgap100 null featurebox height-40">
				<h4 class="tt-u">
					<a href={item.url}>
						{item.heading}
					</a>
				</h4>
				<div class="rta-row colgap200 ycenter null">
					<div class="catlabel">{item.cat}</div>
					<small>{item.tag}</small>
				</div>
			</a>
		{/each}
	</div>
{/if}

<style lang="sass">

.rta-grid.grid3
	padding-left: 2vw
	z-index: 10
	padding-top: 128px

#panelone
	background: var(--background)
	z-index: 0

.catlabel
	background: #7DFA1B
	text-transform: uppercase
	font-size: 12px
	padding: 2px 4px
	color: var(--opposite)
	font-weight: 600


.featurebox
	background: linear-gradient(180deg, #00C05A 0%, #3CDF88 100%)
	z-index: 10
	h4
		letter-spacing: -2px
		line-height: 1.2
		color: var(--background)

.dark
	.featurebox
		h4
			color: #373737

.rightstick::-webkit-scrollbar
	width: 2px
.rightstick::-webkit-scrollbar-thumb
	background: #10D56C
	border-top: 200px solid var(--background)

.featurebox
	small
		text-transform: uppercase

.mandalaimage
	object-fit: cover
	height: 640px
	width: 640px
	transform-origin: center center
	animation: mandaling 24s infinite alternate-reverse
	position: fixed
	z-index: 0
	top: 64px
	right: -20%
	@media screen and (max-width: 768px)
		height: 80px
		width: 80px

.headersection
	padding: 32px 0

@keyframes mandaling
	0%
		transform: rotate(360deg)
	50%
		transform: rotate(0deg)
	100%
		transform: rotate(-360deg)

</style>
