<script lang="ts">
	import { browser } from '$app/environment';
	import visibilityMode from '$lib/stores/visibility';
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

<div class="foot rta-column colgap100 ta-l">
	<small>orbis terrarum est non altus satis</small>
	<small><a href="/about">2023 | Amritanshu Pandey</a></small>
</div>

<style lang="sass">


.foot
	justify-content: center
	align-items: flex-start
	height: 64px
	padding: 0 40px
	background: #171717
	border-top: 1px solid rgba(255,255,255,0.1)
	small
		font-size: 10px
		text-transform: capitalize
		margin: 0
		color: #474747
		cursor: pointer
		a
			text-transform: uppercase
			&:hover
				color: #10D56C
	@media screen and (max-width: 1023px)
		padding: 0 16px
		align-items: center
		small
			font-size: 12px



</style>
