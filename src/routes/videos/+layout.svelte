<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'

</script>

<div class="rta-grid grid2 stdfix" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<div class="rta-column mainone">
		<slot></slot>
	</div>
	<div class="rta-column rightone">
		<p><strong><a href="/videos">VIDEOS HOME</a></strong></p>
	</div>
</div>