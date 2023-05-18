<script lang="ts">
	import { onMount } from 'svelte';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { gptAll, gptFiltered } from '$lib/utils/supabase';
	import { slide } from 'svelte/transition';
	import DropDown from '$lib/deslib/DropDown.svelte'
	import InputText from '$lib/deslib/InputText.svelte'
	import BroGPT from '$lib/agents/broGPT.svelte'
	import MessageInput from '$lib/gptapp/MessageInputBar.svelte'
	import Messenger from '$lib/gptapp/Messenger.svelte'
	import MessageView from '$lib/gptapp/MessageView.svelte'
	let alls: any;
	let filter: any;
	let filtered: any;
	let anyFilter = false;
	let showAgent = true;
	let fake = false;

	function toggleAgent(){
		showAgent = !showAgent
	}

	function setNewFilter(newFilts: string) {
		filter = newFilts;
	}

	$: if (filter) {
		(async () => {
			filtered = await gptFiltered(filter);
		})();
	}

	$: if ( filter === '' ) {
		anyFilter = false
	} else {
		anyFilter = true
	}

	function fauxfake() {
		fake = !fake;
	}

	onMount(async () => {
		filtered = await gptFiltered(filter);
		alls = await gptAll();
	});
</script>

<svelte:head>
	<title>The Fractal Maṇḍala</title>
	<meta name="description" content="tech, dev, design, dharma" />
</svelte:head>


<div
	class="solopage zepad all minH mob"
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	>
	<div class="rta-column ycenter can-stick">
		<h3 class="tt-u">
			GPTBoi and Others...
		</h3>
		<DropDown>
			<div slot="mobile-banner">View Areas</div>
			<div slot="dropdown-part" class="dropsection">
			<button class="secondbutton"
				on:click={() => setNewFilter('supabase')}
				class:selected={filter === 'supabase'}
				>
				Supabase
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('sveltekit')}
				class:selected={filter === 'sveltekit'}
				>
				Sveltekit
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('webui')}
				class:selected={filter === 'webui'}
				>
				Web UI
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('animation')}
				class:selected={filter === 'animation'}
				>
				Animation
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('AI')}
				class:selected={filter === 'AI'}
				>
				AI
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('dharmastuff')}
				class:selected={filter === 'dharmastuff'}
				>
				Dharmastuff
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('other')}
				class:selected={filter === 'other'}
				>
				Other
			</button>
			<button class="secondbutton"
				on:click={() => setNewFilter('')}
				class:selected={filter === ''}
				>
				All
			</button>
			</div>
		</DropDown>
	</div>
	<div class="rta-column rowgap100 soloblog newblog bord-top p-top-32">
	{#if anyFilter}
		{#if filtered && filtered.length > 0}
			{#each filtered as item}
				<div class="rta-column null" transition:slide>
					<h5 class="tt-u">
						<a href="/gpt/{item.indexing}">
							{item.title}
						</a>
					</h5>
				</div>
			{/each}
		{/if}
	{/if}
	{#if alls && alls.length > 0}
		{#each alls as item}
			<div class="rta-column null" transition:slide>
				<h5 class="tt-u">
					<a href="/gpt/{item.indexing}">
						{item.title}
					</a>
				</h5>
			</div>
		{/each}
	{/if}
	</div>

</div>


<style lang="sass">

.can-stick
	h3
		font-weight: 700

.levelzero
	.can-stick
		position: sticky
		top: 0
		background: var(--background)
		z-index: 600
		padding-top: 32px

.levelone
	.can-stick
		position: sticky
		top: 0
		background: var(--background)
		z-index: 600
		padding-top: 32px

.levelzero
	.dropsection
		display: flex
		flex-direction: row
		column-gap: 32px
		padding: 16px 0

.levelone
	.dropsection
		display: flex
		flex-direction: row
		column-gap: 32px
		padding: 16px 0


.leveltwo
	.dropsection
		display: flex
		flex-direction: column
		row-gap: 16px
		padding: 16px 0
	.newblog
		margin-bottom: 16px

</style>
