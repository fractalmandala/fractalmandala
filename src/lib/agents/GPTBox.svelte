<script lang="ts">

	import BroGPT from '$lib/agents/broGPT.svelte'
	import Sanskrit from '$lib/agents/Sanskrit.svelte'
	import Svelter from '$lib/agents/Svelter.svelte'
	import Writer from '$lib/agents/Writer.svelte'
	import Tester from '$lib/agents/Tester.svelte'
	import Titler from '$lib/agents/Titler.svelte'
	import Arvind from '$lib/agents/Arvind.svelte'


	let selectedAgent:boolean[] = Array(4).fill(false)
	let fake = false

	function fauxfake(){
		fake = !fake
	}

	function selectAgent(index:number){
		selectedAgent[index] = !selectedAgent[index]
		for ( let i = 0; i < selectedAgent.length; i ++ ) {
			if ( i !== index && selectedAgent[i] === true ) {
				selectedAgent[i] = false
			}
		}
	}
	

</script>

<div class="boxc">
	<small>Select GPT Agent:</small>
		<div class="rta-row colgap200">
			<div class="agents" on:click={() => selectAgent(1)} on:keydown={fauxfake} class:selectedone={selectedAgent[1]}>broGPT</div>
			<div class="agents" on:click={() => selectAgent(2)} on:keydown={fauxfake} class:selectedtwo={selectedAgent[2]}>the Sanskritist</div>
			<div class="agents" on:click={() => selectAgent(3)} on:keydown={fauxfake} class:selectedthree={selectedAgent[3]}>Svelta Lowda</div>
			<div class="agents" on:click={() => selectAgent(4)} on:keydown={fauxfake} class:selectedfour={selectedAgent[4]}>Write</div>
			<div class="agents" on:click={() => selectAgent(5)} on:keydown={fauxfake} class:selectedfive={selectedAgent[5]}>Test</div>
			<div class="agents" on:click={() => selectAgent(6)} on:keydown={fauxfake} class:selectedfive={selectedAgent[6]}>Title</div>
			<div class="agents" on:click={() => selectAgent(7)} on:keydown={fauxfake} class:selectedtwo={selectedAgent[7]}>Arvind</div>
		</div>
		{#if selectedAgent[2]}
			<Sanskrit></Sanskrit>
		{:else if selectedAgent[3]}
			<Svelter></Svelter>
		{:else if selectedAgent[4]}
			<Writer></Writer>
		{:else if selectedAgent[5]}
			<Tester></Tester>
		{:else if selectedAgent[6]}
			<Titler></Titler>
		{:else if selectedAgent[7]}
			<Arvind></Arvind>
		{:else}
			<BroGPT></BroGPT>
		{/if}
</div>

<style lang="sass">

.boxc
	border-top: 1px solid #272727
	padding-top: 32px
	>small
		color: #373737
	.rta-row
		padding-top: var(--l1)
		gap: var(--l1)
		border-bottom: 1px solid var(--line)
		padding-bottom: var(--l1)
	@media screen and (min-width: 1024px)
		margin-top: 32px

.agents.selectedone
	color: #10D56C
	&:hover
		color: #676767

.agents.selectedtwo
	color: #227ceb
	&:hover
		color: #676767

.agents.selectedthree
	color: #F64241
	&:hover
		color: #676767

.agents.selectedfour
	color: #f4d301
	&:hover
		color: #676767

.agents.selectedfive
	color: #10D56C
	&:hover
		color: #676767

.agents
	text-transform: uppercase
	cursor: pointer
	font-size: 16px
	padding: 4px
	color: #676767
	&:hover
		color: white


</style>