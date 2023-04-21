<script lang="ts">

	import { onMount, afterUpdate } from 'svelte'
	import { page } from '$app/stores'
	import supabase from '$lib/utils/supabase'

	let items:any
	let link:any
	let input:any

	$: if ( link === 'gene') {
		input = 'general'
	} 
	
	$:if ( link === 'gptc') {
			input = 'gptchat'
		}

	$:if ( link === 'code') {
			input = 'code'
		}

	$: if (input) {
		(async() => {
			items = await getItems(input)
		})()
	}

	
	export async function getItems(type:string){
		const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('type',type)
		if (error) throw new Error(error.message)
		return data
	}

	onMount(async() => {
		link = $page.url.pathname.substr(6,4)
		items = await getItems(input)
	})

</script>


<div class="padl1">
	<div class="pagemain">
		<slot></slot>
	</div>
	<div class="pageside" data-lenis-prevent>
	{link}
		{#if items && items.length > 0}
			{#each items as item}
				<p>
					<a href="/blog/{input}/{item.id}">
					{item.title}
					</a>
				</p>
			{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.padl1
	display: flex
	flex-direction: row

.pagemain
	width: calc(100% - 360px)

.pageside
	width: 360px
	p
		margin: 0
		text-align: right
		color: #474747
		&:hover
			color: #10C56D
	@media screen and (min-width: 1024px)
		padding-top: 160px
		height: 600px
		overflow-y: scroll

</style>