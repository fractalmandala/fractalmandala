<script lang="ts">

	import { themeMode, breakZero, breakOne, breakTwo, readingMode } from '$lib/stores/globalstores'
	import { fly } from 'svelte/transition'
	import { slide } from 'svelte/transition'
	import { quadOut, quadIn } from 'svelte/easing'
	import BreadCrumb from '$lib/deslib/BreadCrumb.svelte'

	export let isNulled = false

	let fake = false
	let expandRightbar = false

	export let skew = false

	function toggleRightbar(){
		expandRightbar = !expandRightbar
	}
	
	function fauxfake(){
		fake = !fake
	}

</script>



<div class="flyingpage rta-column" 
	in:fly={{ delay: 500, duration: 400, y: 900, easing: quadOut}}
	out:fly={{ delay: 0, duration: 350, opacity: 0, x: 900, easing: quadIn}}
	class:dark={$themeMode}
	class:light={!$themeMode}
	class:levelzero={$breakZero}
	class:levelone={$breakOne}
	class:leveltwo={$breakTwo}
	class:reader={$readingMode}
	class:skewed={skew}
	class:nulled={isNulled}
	class:fixed={skew && isNulled}
	>
	<div class="pagemid rta-column" class:nulled={isNulled}>
		
		<slot name="mid"></slot>
	</div>
</div>

<style lang="sass">

.flyingpage
	background: var(--background)


.flyingpage.levelzero
	padding: 0px 4vw 64px 4vw


</style>