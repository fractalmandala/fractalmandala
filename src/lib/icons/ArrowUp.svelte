<script lang="ts">

	import { themeMode, breakZero } from '$lib/stores/globalstores'
	import { slide } from 'svelte/transition'
	let y:number
	let showIcon = false

	$: if ( y >= 1200 ) {
		showIcon = true
	} else {
		showIcon = false
	}

</script>

<svelte:window bind:scrollY={y}/>

{#if $breakZero && showIcon}
<button class="blank-button rta-icon rta-row ycenter" on:click={() => { window.scrollTo(0, 0)}} class:dark={$themeMode} class:light={!$themeMode} transition:slide={{ axis: 'x'}}>
	<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14.4315 27.0335V10.9668L7.19818 18.2335L4.96484 16.0001L15.9982 4.9668L27.0315 16.0001L24.8315 18.2335L17.5648 10.9668V27.0335H14.4315Z" fill="#474747"/>
	</svg>
</button>
{/if}

<style lang="sass">

.rta-icon
	cursor: pointer
	background: var(--green)
	border-radius: 32px
	height: 27px
	width: 27px
	position: fixed
	bottom: 20px
	right: 4vw
	margin-left: auto
	z-index: 999
	transform-origin: center center
	transition: 0.13s
	svg
		height: 21px
		object-fit: contain
		path 
			fill: var(--background)
	&:hover
		transform: scale(0.88)

</style>