<script lang="ts">

	import { onMount } from 'svelte'
	import { allMandalas } from '$lib/utils/localpulls'

	let posts:any

	onMount(async() => {
		posts = await allMandalas()
	})

</script>



