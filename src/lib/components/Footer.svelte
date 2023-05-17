<script lang="ts">

	import { browser } from '$app/environment';
	import { themeMode } from '$lib/stores/globalstores'
	import Twitter from '$lib/icons/Twitter.svelte'
	import Github from '$lib/icons/Github.svelte'
	let fake = false;

	function fauxfake() {
		fake = !fake;
	}

</script>

<footer class="foot rta-column colgap100 ta-l" class:dark={$themeMode} class:light={!$themeMode}>
	<div class="rta-row colgap50">
		<Github/>
		<Twitter/>
	</div>
	<div class="rta-column">
		<small><a href="/about">2023 | Amritanshu Pandey</a></small>
	</div>
</footer>

<style lang="sass">

.rta-row
	margin-bottom: 4px

.foot
	justify-content: center
	align-items: center
	height: 64px
	small
		font-size: 10px
		text-transform: capitalize
		margin: 0
		cursor: pointer
		a
			text-transform: uppercase
	@media screen and (min-width: 1024px)
		padding-right: 256px
		padding-left: 256px
	@media screen and (max-width: 1023px)
		padding: 0 16px
		align-items: center
		small
			font-size: 12px

.foot.dark
	border-top: 1px solid rgba(255,255,255,0.1)
	small
		color: #474747
		&:hover
			a
				color: var(--gret)

.foot.light
	border-top: 1px solid rgba(0,0,0,0.065)
	small
		color: #878787
		a
			color: var(--green)
			&:hover
				color: var(--gret)

</style>
