<script lang="ts">

	import GPTBox from '$lib/agents/GPTBox.svelte'
	import '$lib/styles/themes.sass'
	let fake = false
	let area:boolean[] = Array(9).fill(false)
	area[1] = true
	let isChat = false
	let password = ''
	let input: HTMLInputElement

	const keyed = import.meta.env.VITE_OWN_PUBLIC

	function toggleChat(){
		if ( password === keyed ) {
		isChat = !isChat
		input.value = ''
		}
	}

	function fauxfake(){
		fake = !fake
	}

</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>


<div class="padl1 sides">
	<form class="boxr passform">
		<input type="password" bind:value={password} bind:this={input}/>
		<div class="newstd maxwid" on:click={toggleChat} on:keydown={fauxfake}>Open</div>
	</form>
		{#if isChat}
			<GPTBox></GPTBox>
		{/if}
</div>


<style lang="sass">

.passform
	column-gap: 16px

input[type=password]
	background: none
	color: white
	border: 1px solid #272727
	outline: none
	padding: 5px
	border-radius: 4px

.maxwid
	padding-left: 32px
	padding-right: 32px
	min-width: 80px
	max-width: max-content

.newstd
	cursor: pointer
	border-radius: 4px
	cursor: pointer
	transform-origin: center center
	color: #474747
	transition: all 0.05s ease
	font-size: 14px
	padding: 4px 8px
	position: relative
	overflow: hidden
	z-index: 1
	text-align: center
	background: #171717
	&::before
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		content: ''
		z-index: -1
		background-color: hsla(200,9%,5%,0)
		transition: all 0.05s ease
		filter: blur(290px)
		background-image: radial-gradient(at 17% 36%, hsla(248,47%,99%,0.1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,0.2) 0px, transparent 50%)
	&:hover
		color: #FFFFFF
		&::before
			background-color: hsla(130,90%,45%,1)
			filter: blur(15px)

</style>