<script lang="ts">

	import { browser } from '$app/environment' 
	import visibilityMode from '$lib/stores/visibility'	
	import '$lib/styles/themes.sass'
	let fake = false
	let toggled = false

	function fauxfake(){
		fake = !fake
	}

	function toggleMenu(){
		toggled = !toggled
	}

	function toggleVisibility() {
	  if (browser) {
	    visibilityMode.update((mode) => {
	      const newMode = !mode;
	      localStorage.setItem('visibilityMode', JSON.stringify(newMode));
	      return newMode;
	    });
	  }
	}

</script>

<div class="rta-column toggle" class:light={!$visibilityMode} class:dark={$visibilityMode} on:click={toggleVisibility} on:keydown={fauxfake}>
	<div class="rta-column switch" class:shift={!$visibilityMode}></div>
</div>

<style lang="sass">

.toggle
	border: 1px solid var(--borderline)
	height: 16px
	width: 36px
	border-radius: 8px
	padding: 2px
	cursor: pointer
	&:hover
		.switch
			background: var(--green)
	
.switch
	height: 12px
	width: 12px
	border-radius: 6px
	background: var(--borderline)
	transition: 0.15s

.switch.shift
	transform: translateX(18px)


</style>

