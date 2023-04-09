<script lang="ts">

	export let data

</script>

<div class="pagecontainer">
	<h1>
		{data.title}
	</h1>
	<svelte:component this={data.content}/>
</div>