<script lang="ts">
	
	import { onMount } from 'svelte'
	import { CodeHTML, CodesFiltered } from '$lib/utils/supabase'
	import { fly } from 'svelte/transition'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	export let data
	let lang:any = data.lang
	let codes:any
	let showothers:boolean = false

	function toggleShow(){
		showothers = !showothers
	}

	onMount(async() => {
		Prism.highlightAll();
		lang = data.lang
		codes = await CodesFiltered(lang)
	})
</script>



<div class="pagecontainer x00">
	{#if data.lang && data.lang.length>0}
		<div on:mouseenter={toggleShow} style="text-transform: uppercase; color: #10D56C; padding: 4px 0px; width: max-content;">
			{data.lang}
		</div>
	{/if}
		{#if showothers}
		<div class="popup" on:mouseleave={toggleShow}>
			{#if codes && codes.length > 0}
				{#each codes as item, i}
					<p style="font-size: 16px" in:fly={{ delay: i * 30}} out:fly={{ delay: 0}}>
						<a href="/notes/{item.id}" target="_self">
						{item.title}
						</a>
					</p>
				{/each}
			{/if}
		</div>
		{/if}
	<h1>
		{data.title}
	</h1>
	<div class="forpopping">
		<h6><a href="/codes" target="_self">{data.type} </a><span> | </span><a href="/docs" target="_self"> {data.tags}</a></h6>
	</div>
	<div class="boxc">
		{#if data.note && data.note.length > 0}
			<p class="notepara">{data.note}</p>
		{/if}
			<pre class="language-{data.lang}">
				<code>
					{data.codesnippet}
				</code>
			</pre>
	</div>
</div>

<style lang="sass">

.notepara
	line-height: 1.8

.x00
	position: relative
	.popup
		position: absolute
		top: 0px
		left: 32px
		border: 1px solid #272727

h1
	text-transform: uppercase
	margin: 0
	font-family: 'Spline Sans', sans-serif
	border-bottom: 1px solid #313131
	padding-bottom: 12px
	font-weight: 600

h6
	margin: 12px 0 16px 0
	text-transform: uppercase
	color: #474747
	font-size: 16px
	font-weight: 400

.boxc
	@media screen and (min-width: 1024px)
		width: 900px
		pre
			width: 80%
		p
			font-size: 20px
			font-weight: 300
	@media screen and (max-width: 1023px)
		p
			font-weight: 400

</style>