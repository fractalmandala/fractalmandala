<script lang="ts">

	import { onMount } from 'svelte'
	import { allNotes } from '$lib/utils/supabase'
	import SvelteTable from 'svelte-table'

	let notes:any
	let data:any = []

	onMount(async() => {
		data = await allNotes()
	})

	
	
</script>

{#if data && data.length > 0}
<div class="padl2">
		<table>
			<thead>
				<tr>
					<th>Title</th>
					<th>Type</th>
					<th>Tags</th>
					<th>URL</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{#each data as item}
						<tr>
							<td>{item.title}</td>
							<td>{item.type}</td>
							<td>{item.tags}</td>
							<td>/blog/{item.type}/{item.id}</td>
							<td>{item.created_at}</td>
						</tr>
				{/each}
			</tbody>
		</table>
</div>
{/if}

<style lang="sass">

table
	text-align: left

thead
	font-size: 16px
	color: #676767
	font-weight: 400
	text-transform: uppercase

tbody
	font-size: 14px
	color: #474747

</style>