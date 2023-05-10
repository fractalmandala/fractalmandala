<script lang="ts">

	import { slide } from 'svelte/transition'
	import { circOut } from 'svelte/easing'
	import { allconvos } from '$lib/utils/convos'
	let iW:number
	let breakPoint:boolean
	let fake = false
	let expandRightbar = false
	let openItem = Array(10).fill(false)

  function getContentPartsAndAuthorRole(mapping:any): { parts: string[]; role: string | null } {
    let parts: string[] = [];
    let role: string | null = null;

    for (let key in mapping) {
      let message = mapping[key].message;
      if (message && message.content && message.content.parts) {
        parts.push(...message.content.parts);
      }
      if (message && message.author && message.author.role) {
        role = message.author.role;
      }
    }

    return { parts, role };
  }

	function toggleOpenItem(index:number) {
		openItem[index] = !openItem[index]
		for ( let i = 0; i < openItem.length; i ++ ) {
			if ( i !== index && openItem[i] === true ) {
				openItem[i] = false
			}
		}
	}

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}

	function fauxfake(){
		fake = !fake
	}

	$: if ( iW <= 1023 ) {
		breakPoint = true
	} else {
		breakPoint = false
	}

	$: anyItemOpen = openItem.some(item => item)

</script>

<svelte:window bind:outerWidth={iW}/>

<div class="rta-grid grid2 stdfix">
	<div class="rta-column mainone">
		<slot></slot>
		<div class="rta-column selectedChat bord-top p-top-32">	
			{#each allconvos as item, i}
			{#if openItem[i]}
				<h4>{item.title}</h4>
				{#if openItem[i]}
					<small>{getContentPartsAndAuthorRole(item.mapping).role || 'N/A'}</small>
					{#each getContentPartsAndAuthorRole(item.mapping).parts as part}
					<p>{part}</p>
					{/each}
				{/if}				
				{/if}
			{/each}
		</div>
	</div>
	<div class="rta-column rightone" class:opened={expandRightbar}>
		{#if breakPoint}
		<div class="rta-row ycenter between rightmenu" on:click={toggleRightbar} on:keydown={fauxfake}>
			<button class="break899">
				{#if expandRightbar}
				Close Subsections
				{:else}
				Expand Subsections
				{/if}
			</button>
			<div class="iconchev" class:rotated={expandRightbar}>
				<svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3.41345 0.187622L0.413452 3.18762L8.41345 11.1876L16.4135 3.18762L13.4135 0.187622L8.41345 5.18762L3.41345 0.187622Z" fill="#FFFFFF"/>
				</svg>
			</div>
		</div>
		{/if}
		{#if !breakPoint || expandRightbar}
		<p transition:slide={{ duration: 200, easing: circOut}}><strong><a href="/gpt">GPT HOME</a></strong></p>
				{#each allconvos as item, i}
					<p class="names" transition:slide={{ duration: 200, delay: i*10, easing: circOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>{item.title}</p>
				{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.names
	@media screen and (min-width: 1024px)
		margin-bottom: 6px

</style>