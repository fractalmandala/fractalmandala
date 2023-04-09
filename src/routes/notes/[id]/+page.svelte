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
	let fake:boolean = false

	function toggleShow(){
		showothers = !showothers
	}

	function fauxfake(){
		fake = !fake
	}

  function goBack() {
    window.history.go(-1);
  }

	onMount(async() => {
		Prism.highlightAll();
		lang = data.lang
		codes = await CodesFiltered(lang)
	})
</script>



<div class="pagecontainer x00">
	<div class="boxr" style="gap: 32px; align-items: center; padding-bottom: 8px; border-bottom: 1px solid #272727; width: max-content; margin-bottom: 16px">
		<div on:click={goBack} on:keydown={fauxfake} class="returnbutton" style="cursor:pointer">
		<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8.72266 16.8091C4.3033 16.8091 0.722656 13.2284 0.722656 8.80908C0.722656 4.38973 4.3033 0.809082 8.72266 0.809082C13.142 0.809082 16.7227 4.38973 16.7227 8.80908C16.7227 13.2284 13.142 16.8091 8.72266 16.8091ZM5.04846 9.35747L9.41943 13.7284C9.72266 14.0317 10.213 14.0317 10.513 13.7284L11.0614 13.18C11.3646 12.8768 11.3646 12.3865 11.0614 12.0865L7.78395 8.80908L11.0614 5.53166C11.3646 5.22844 11.3646 4.73811 11.0614 4.43811L10.513 3.88973C10.2098 3.5865 9.71943 3.5865 9.41943 3.88973L5.04846 8.26069C4.74524 8.56392 4.74524 9.05424 5.04846 9.35747Z" fill="#474747"/>
		</svg>
		</div>
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
	</div>
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

.returnbutton
	&:hover
		svg path
			fill: #10D56C

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