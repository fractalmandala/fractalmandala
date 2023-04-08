<script lang="ts">
	import { onMount } from 'svelte'
	import { flip } from 'svelte/animate'
	import { crossfade, fly } from 'svelte/transition'
	import { allNotes, allCodes, allOthers, CodeCSS, CodeJS, CodeHTML, quillNotes } from '$lib/utils/supabase'
	import { allDocs } from '$lib/utils/localpulls'
	
	let notes:any
	let codes:any
	let gens:any
	let ccss:any
	let cjs:any
	let chtml:any
	let docs:any
	let quills:any
	let faux:boolean = false
	let area:boolean[] = Array(8).fill(false)
	area[1] = true

	function toggleArea(index:number) {
		area[index] = !area[index]
		for ( let i = 0; i < area.length; i ++ ) {
			if ( i !== index && area[i] === true ) {
				area[i] = false
			}
		}
	}

	function toggleFaux(){
		faux = !faux
	}

	const [send, receive] = crossfade({
		duration: 300
	})

	onMount(async() => {
		notes = await allNotes()
		codes = await allCodes()
		gens = await allOthers()
		ccss = await CodeCSS()
		cjs = await CodeJS()
		chtml = await CodeHTML()
		docs = await allDocs()
		quills = await quillNotes()
	})
</script>
<div class="pagecontainer">
	<div class="boxr">
		<h5 on:click={() => toggleArea(1)} on:keydown={toggleFaux} class:selectedarea={area[1]}>all</h5>
		<h5 on:click={() => toggleArea(2)} on:keydown={toggleFaux}>code</h5>
		<h5 on:click={() => toggleArea(3)} on:keydown={toggleFaux}>general</h5>
		<h5 on:click={() => toggleArea(4)} on:keydown={toggleFaux}>html</h5>
		<h5 on:click={() => toggleArea(5)} on:keydown={toggleFaux}>js</h5>
		<h5 on:click={() => toggleArea(6)} on:keydown={toggleFaux}>styling</h5>
		<h5 on:click={() => toggleArea(7)} on:keydown={toggleFaux}>docs</h5>
		<h5 on:click={() => toggleArea(8)} on:keydown={toggleFaux}>blog</h5>
	</div>
	{#if area[1]}
		{#if notes && notes.length > 0}
		<div class="boxc">
			{#each notes as item, i}
				<h4 in:fly={{ duration: 300, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</h4>
			{/each}
		</div>
		{/if}
	{/if}
	{#if area[2]}
		{#if codes && codes.length > 0}
			<div class="boxc">
			{#each codes as item, i}
				<h4 in:fly={{ duration: 100, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</h4>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[3]}
		{#if gens && gens.length > 0}
			<div class="boxc">
			{#each gens as item, i}
				<h4 in:fly={{ duration: 100, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</h4>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[4]}
		{#if chtml && chtml.length > 0}
			<div class="boxc">
			{#each chtml as item, i}
				<h4 in:fly={{ duration: 100, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</h4>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[5]}
		{#if cjs && cjs.length > 0}
			<div class="boxc">
			{#each cjs as item, i}
				<h4 in:fly={{ duration: 100, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</h4>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[6]}
		{#if ccss && ccss.length > 0}
			<div class="boxc">
			{#each ccss as item, i}
				<h4 in:fly={{ duration: 100, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
					<a href="/notes/{item.id}">
						{item.title}
					</a>
				</h4>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[7]}
		{#if docs && docs.length > 0}
			<div class="boxc">
			{#each docs as item, i}
				<h4 in:fly={{ duration: 100, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
					<a href="{item.path}">
						{item.meta.title}
					</a>
				</h4>
			{/each}
			</div>
		{/if}
	{/if}
	{#if area[8]}
		{#if quills && quills.length > 0}
			<div class="boxc">
			{#each quills as item, i}
				<h4 in:fly={{ duration: 100, delay: i * 50, x: 0, y: 48}} out:fly={{ duration: 100, delay: i * 20, x: 0, y: -48}}>
					<a href="/blog/{item.id}">
						{item.title}
					</a>
				</h4>
			{/each}
			</div>
		{/if}
	{/if}
</div>

<style lang="sass">

h4
	margin: 4px 0
	text-transform: uppercase
	color: #313131
	font-size: 2.4rem
	line-height: 1.1
	border-bottom: 1px solid #212121
	font-weight: 400
	&:hover
		color: #10D56C

.pagecontainer
	.boxr
		justify-content: space-between
		border-bottom: 1px solid #272727
		margin-bottom: 32px
		position: sticky
		top: 48px
		backdrop-filter: blur(10px)
		padding-left: 16px
		padding-right: 16px
		h5
			font-weight: 400
			text-transform: uppercase
			font-size: 20px
			margin: 4px 0
			padding: 4px 8px
			cursor: pointer
			&:hover
				background: #10D56C
				color: white
		h5.selectedarea
			color: #10D56C
			&:hover
				background: #272727
				color: white
		@media screen and (min-width: 1024px)
			width: 60%

</style>