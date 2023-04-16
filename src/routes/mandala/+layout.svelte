<script lang="ts">

	import '$lib/styles/themes.sass'
	import '$lib/styles/global.sass'
	import { onMount } from 'svelte'
	import { limitDocs, limitMandalas } from '$lib/utils/localpulls'
	import { limitNotes, chatswithGPT } from '$lib/utils/supabase'

	let limit = 4
	let docus:any
	let mands:any
	let notes:any
	let chats:any

	onMount(async() => {
		docus = await limitDocs()
		mands = await limitMandalas()
		notes = await limitNotes(limit)
		chats = await chatswithGPT(limit)
	})

</script>

<div>
	<slot></slot>
	<div class="newgrids buffer bufferYt bufferYb">
		{#if notes && notes.length > 0}
		{#each notes as item}
			{#if item.type === 'code'}
				<div class="tube green">
					<small>{item.lang}</small>
					<h5>
						<a href="/mandala/codes/{item.counting}">
							{item.title}
						</a>
					</h5>
					<p>{item.tags}</p>
				</div>
			{:else}
			<div class="tube green">
				<small>{item.type}</small>
				<h5>
					<a href="/mandala/notes/{item.counting}">
						{item.title}
					</a>
				</h5>
				<p>{item.tags}</p>
			</div>
			{/if}
		{/each}
		{/if}
		{#if chats && chats.length > 0}
		{#each chats as item}
			<div class="tube yellow">
				<small>GPT</small>
				<h5>
					<a href="/mandala/gpt/{item.id}">
						{item.prompt.slice(0,25)}
					</a>
				</h5>
				<p>{item.response.slice(0,40)}</p>
			</div>
		{/each}
		{/if}
		{#if mands && mands.length > 0}
		{#each mands as item}
			<div class="tube blue">
				<small>{item.meta.tags}</small>
				<h5>
					<a href="{item.path}">
						{item.meta.title}
					</a>
				</h5>
				<p>{item.meta.type}</p>
			</div>
		{/each}
		{/if}
		{#if docus && docus.length > 0}
		{#each docus as item}
			<div class="tube red">
				<small>{item.meta.tags}</small>
				<h5>
					<a href="{item.path}">
						{item.meta.title}
					</a>
				</h5>
				<p>{item.meta.type}</p>
			</div>			
		{/each}
		{/if}
	</div>
</div>

<style lang="sass">

.newgrids
	display: grid
	grid-auto-flow: row
	grid-template-columns: 1fr 1fr 1fr 1fr
	grid-template-rows: auto
	grid-template-areas: ". . . ."
	gap: 64px 64px
	@media screen and (min-width: 1024px)
		padding-left: 10vw
		padding-right: 10vw
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr
		grid-template-rows: auto
		grid-template-areas: ". ."
		gap: 24px 24px

</style>
