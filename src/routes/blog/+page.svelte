<script lang="ts">

	import { onMount } from 'svelte'
	import { allNotes } from '$lib/utils/supabase'

	let notes:any[]

	onMount(async() => {
		notes = await allNotes()
	})


</script>

<div class="padl2">


</div>