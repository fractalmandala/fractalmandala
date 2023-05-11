<script lang="ts">

	import visibilityMode from '$lib/stores/visibility'

</script>

<div class="rta-column text p-top-32" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<p>GPT Knowledge Base</p>
</div>