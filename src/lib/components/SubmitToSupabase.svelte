<script lang="ts">

	import { onMount } from 'svelte'
	import supabase from '$lib/utils/supabase'
	export let title:string
	export let tags:string
	export let note:string
	let fake = false

	function fauxfake(){
		fake = !fake
	}
	
	async function handleSubmit(){
		try {
			const { error } = await supabase
			.from('amrit-notes')
			.insert({ title: title, tags: tags, type: 'post', note: note})
      if (error) {
        throw new Error(error.message)
      }
			console.log('submitted')
		} catch (e) {
      console.error('Error inserting into Supabase:', e)
    }
	}

</script>

<div class="major green" on:click={() => handleSubmit()} on:keydown={fauxfake}>File</div>