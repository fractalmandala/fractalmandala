<script lang="ts">

	import { browser } from '$app/environment';
	import visibilityMode from '$lib/stores/visibility';
	import { themeMode } from '$lib/stores/globalstores'
	let fake = false;

	function fauxfake() {
		fake = !fake;
	}

	function toggleVisibility() {
		if (browser) {
			visibilityMode.update((mode) => {
				const newMode = !mode;
				localStorage.setItem('visibilityMode', JSON.stringify(newMode));
				return newMode;
			});
		}
	}
</script>

<footer class="foot rta-column colgap100 ta-l" class:dark={$themeMode} class:light={!$themeMode}>
	<small>orbis terrarum est non altus satis</small>
	<small><a href="/about">2023 | Amritanshu Pandey</a></small>
</footer>

<style lang="sass">

.foot
	justify-content: center
	align-items: flex-start
	height: 64px
	padding: 0 40px
	small
		font-size: 10px
		text-transform: capitalize
		margin: 0
		cursor: pointer
		a
			text-transform: uppercase
	@media screen and (max-width: 1023px)
		padding: 0 16px
		align-items: center
		small
			font-size: 12px

.foot.dark
	border-top: 1px solid rgba(255,255,255,0.1)
	background: var(--background)
	small
		color: #474747
		a
			&:hover
				color: #10D56C

.foot.light
	border-top: 1px solid rgba(0,0,0,0.065)
	background: var(--background)
	small
		color: #878787
		a
			&:hover
				color: #10D56C

</style>
