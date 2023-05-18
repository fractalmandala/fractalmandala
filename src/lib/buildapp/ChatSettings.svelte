<script lang="ts">
	//@ts-nocheck
  import { getContext } from 'svelte';
  import { onClickOutside } from '$lib/buildapp/sharedutils';
	import SelectAgent from '$lib/buildapp/SelectAgent.svelte'
	import Modal1 from '$lib/buildapp/ModalBox.svelte'
	import Modal2 from '$lib/buildapp/ModalBox.svelte'
	import Modal3 from '$lib/buildapp/ModalBox.svelte'
	import Write from '$lib/icons/Write.svelte'
	import Settings from '$lib/icons/Settings.svelte'
	import Archive from '$lib/icons/Archive.svelte'
	import Unfold from '$lib/icons/Unfold.svelte'

	let fake = false
	let showSelectAgent = false
	let showModel = false
	let showSettings = false
	let showApi = false

	function toggleApi(){
		showApi = !showApi
	}

	function toggleModel(){
		showModel = !showModel
	}

	function toggleSettings(){
		showSettings = !showSettings
	}

	function toggleSelectAgent(){
		showSelectAgent = !showSelectAgent
	}

	function fauxfake(){
		fake = !fake
	}


</script>

<div class="rta-row colgap300"
	>

    <button
      on:click={toggleSelectAgent}
      class="blank-button"
    >
      <Write/>
    </button>

    <button
      on:click={toggleSettings}
      class="blank-button"
    >
      <Settings/>
    </button>
    <button
      on:click={toggleModel}
      class="blank-button"
    >
      <Archive/>
    </button>

    <button
      on:click={toggleApi}
      class="blank-button"
    >
      <Unfold/>	
    </button>

</div>
