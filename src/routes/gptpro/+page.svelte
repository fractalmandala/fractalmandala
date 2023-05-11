<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'

</script>

<div class="rta-column text p-top-32" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<div class="rta-row between ytop">
		<img src="/images/gptboi.png" alt="ai boi"/>
		<div class="rta-column ta-r">
			<h3 class="bord-bot p-bot-16">GPT Pro</h3>
			<p class="bord-bot p-bot-32">A WIP reverse-engineered build referencing the fantastic <a href="https://gptpro.sh/" target="_blank" rel="noreferrer">GPTPro</a> by <a href="https://twitter.com/ankurpsinghal" target="_blank" rel="noreferrer">Ankur Singhal</a> (who also created <a href="https://sveltelegos.com/" target="_blank" rel="noreferrer">Svelte Legos</a>).</p>	
		</div>
	</div>
</div>

<style lang="sass">

img
	object-fit: cover
	width: 160px

</style>