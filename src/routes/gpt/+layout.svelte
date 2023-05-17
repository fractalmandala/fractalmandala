<script lang="ts">
	import { onMount } from 'svelte';
	import { themeMode, breakZero, breakOne, breakTwo } from '$lib/stores/globalstores';
	import { gptAll, gptFiltered } from '$lib/utils/supabase';
	import { slide } from 'svelte/transition';
	let alls: any;
	let filter: any;
	let filtered: any;
	let anyFilter = false;
	function setNewFilter(newFilts: string) {
		filter = newFilts;
	}

	$: if (filter) {
		(async () => {
			filtered = await gptFiltered(filter);
		})();
	}

	$: if (filter === '') {
		anyFilter = false;
	} else {
		anyFilter = true;
	}

	let fake = false;
	let showBox = false;

	function toggleBox() {
		showBox = !showBox;
	}

	function fauxfake() {
		fake = !fake;
	}

	onMount(async () => {
		filtered = await gptFiltered(filter);
		alls = await gptAll();
	});
</script>

<div class="m-top-32">
<div class="rta-row between ycenter null canstick">
	<div class="rta-row colgap300 xend">
		<button
			class="secondbutton"
			on:click={() => setNewFilter('sveltekit')}
			class:selected={filter === 'sveltekit'}
		>
			Sveltekit
		</button>
		<button
			class="secondbutton"
			on:click={() => setNewFilter('supabase')}
			class:selected={filter === 'supabase'}
		>
			Supabase
		</button>
		<button
			class="secondbutton"
			on:click={() => setNewFilter('webui')}
			class:selected={filter === 'webui'}
		>
			UI
		</button>
		<button
			class="secondbutton"
			on:click={() => setNewFilter('animation')}
			class:selected={filter === 'animation'}
		>
			Animation
		</button>
		<button
			class="secondbutton"
			on:click={() => setNewFilter('other')}
			class:selected={filter === 'other'}
		>
			Other
		</button>
		<button class="secondbutton" on:click={() => setNewFilter('')} class:selected={filter === ''}>
			All
		</button>
	</div>
	<div class="rta-column">
		<h6 class="tt-u"><a href="/gpt">GPT Boi, and Others...</a></h6>
	</div>
</div>
	<slot></slot>
</div>

