<script lang="ts">

	import { onMount } from 'svelte'
	import visibilityMode from '$lib/stores/visibility'	
	import { newGPT } from '$lib/utils/supabase'
	let thisIndex:number
	let fullChat:any	

	export let data

	onMount(async() => {
		thisIndex = data.indexing
		fullChat = await newGPT(thisIndex)
	})

</script>

<div class="rta-column" class:dark={$visibilityMode} class:light={!$visibilityMode}>
	<h3 class="bord-bot p-bot-16">{data.title}</h3>
	<div class="rta-column rowgap400 text botchats">
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
						<pre>
							<code class="language-html">
								{@html item.value}
							</code>
						</pre>
					</div>
				{/if}					
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.botchats 
	p
		font-size: 12px

.gptcol
	background: var(--contraster)
	border: 1px solid var(--borderline)
	border-radius: 8px
	small, pre
		margin: 0
	pre code
		color: var(--opposite)
	@media screen and (min-width: 1024px)
		padding: 24px

</style>

