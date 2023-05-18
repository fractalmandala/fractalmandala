<script lang="ts">

	export let dimension = 32

</script>

<div class="rta-icon">
<svg width="{dimension}" height="{dimension}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.4667 9.80015L22.2 5.53348L23.6 4.13348C23.9778 3.75571 24.45 3.57237 25.0167 3.58348C25.5833 3.5946 26.0556 3.78904 26.4333 4.16682L27.8667 5.60015C28.2444 5.97793 28.4333 6.4446 28.4333 7.00015C28.4333 7.55571 28.2444 8.02237 27.8667 8.40015L26.4667 9.80015ZM25.0667 11.2002L8.26667 28.0002H4V23.7335L20.8 6.93348L25.0667 11.2002Z" fill="#0BC160"/>
</svg>
</div>

<style lang="sass">

.rta-icon
	cursor: pointer
	svg
		height: 24px
		object-fit: contain
		transition: 0.13s
		transform-origin: center center
	&:hover
		svg path
			fill: #10D56C
		svg
			transform: scale(0.88)

</style>
