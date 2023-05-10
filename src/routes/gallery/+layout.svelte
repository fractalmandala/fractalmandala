<script lang="ts">

	let selectSection = Array(5).fill(false)
	selectSection[1] = true
	let fake = false

	function fauxfake(){
		fake = !fake
	}

	function toggleSection(index:number) {
		selectSection[index] = !selectSection[index]
		for ( let i = 0; i < selectSection.length; i ++ ) {
			if ( i !== index && selectSection[i] === true ) {
				selectSection[i] = false
			}
		}
	}

</script>

<div class="rta-grid grid2 stdfix">
	<div class="rta-column mainone">
		{#if selectSection[1]}
		<slot></slot>
		{/if}
		{#if selectSection[2]}
		<h1>Scrolls of Āryavarta</h1>
		{/if}
		{#if selectSection[3]}
		<h1>Dharma Aesthetic</h1>
		{/if}
		{#if selectSection[4]}
		<h1>Miscellaneous</h1>
		{/if}
		{#if selectSection[5]}
		<h1>Featured</h1>
		{/if}
		{#if selectSection[6]}
		<h1>Latest</h1>
		{/if}
	</div>
	<div class="rta-column rightone">
		<p on:click={() => toggleSection(1)} on:keydown={fauxfake}><strong>GALLERY HOME</strong></p>
		<p on:click={() => toggleSection(2)} on:keydown={fauxfake}>Scrolls of Āryavarta</p>
		<p on:click={() => toggleSection(3)} on:keydown={fauxfake}>Dharma Aesthetic</p>
		<p on:click={() => toggleSection(4)} on:keydown={fauxfake}>Miscellaneous</p>
		<p on:click={() => toggleSection(5)} on:keydown={fauxfake}>Featured</p>
		<p on:click={() => toggleSection(6)} on:keydown={fauxfake}>Latest</p>
	</div>
</div>