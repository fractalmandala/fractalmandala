<script lang="ts">

	import { onMount } from 'svelte'
	import visibilityMode from '$lib/stores/visibility'	
	import { newGPT } from '$lib/utils/supabase'
	let thisTitle:string
	let fullChat:any	

	export let data

	onMount(async() => {
		thisTitle = data.title
		fullChat = await newGPT(thisTitle)
	})

</script>

<div class="rta-column stickyboy" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<h3 class="bord-bot p-bot-16">{data.title}</h3>
</div>
<div class="rta-column snipstyle p-bot-64" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	{#if fullChat && fullChat.length > 0}
		{#each fullChat as item}
			{#if item.author === 'user'}
				<div class="rta-column usercol">
					<small>{item.author}</small>
					<p>{item.value}</p>
				</div>
			{:else}
				<div class="rta-column gptcol">
					<small>{item.author}</small>
					<p>
						{item.value}
					</p>
				</div>
			{/if}					
		{/each}
	{/if}
</div>

