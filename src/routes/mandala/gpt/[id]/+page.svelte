<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import { clickToCopyAction } from 'svelte-legos'
	import ButtonGlow from '$lib/components/ButtonGlow.svelte'
	import ButtonGlow2 from '$lib/components/ButtonGlow.svelte'
	import ButtonGlow3 from '$lib/components/ButtonGlow.svelte'
	import supabase from '$lib/utils/supabase'
	import Toast from '$lib/components/Toast.svelte'
	let nextchat:number
	let afterthis:number
	let theid:any
	let copymaterial: any
	let styledText
	let copySuccess:boolean = false
	let fake = false
	let deleteConfirmation:boolean = false

	function deleteWarning(){
		deleteConfirmation = !deleteConfirmation
	}

	function fauxfake(){
		fake = !fake
	}

	function handleCopyDone(){
		if ( copySuccess === false ) {
			copySuccess = true
		}
	}

	function closeCopySuccessMessage(){
		if ( copySuccess === true ) {
			copySuccess = false
		}
	}

	const deleteDocument = async() => {
		const { error } = await supabase
		.from('amrit-chatswithgpt')
		.delete()
		.eq('id',theid)
		if (error) throw new Error(error.message)
		location.replace("/")		
	}

	const regex = /```([\s\S]*?)```/g;

	onMount(async() => {
		hljs.highlightAll()
		nextchat = data.id - 1
		afterthis = data.id + 1
		copymaterial = data.response
		styledText = data.response
		theid = data.id
	})

	export let data

</script>

<div class="boxofchat wider buffer bufferYb bufferYt" on:click={closeCopySuccessMessage} on:keydown={fauxfake}>
	<div class="agent user">
		ID - {data.id}<br>
		<p style="color: #fe4a49; margin-top: 4px; cursor: pointer" on:click={deleteWarning} on:keydown={fauxfake}>Delete</p>
	</div>
	<div class="commbody user">
		{data.prompt}
	</div>
	<div class="agent broGPT">
		GPT:
	</div>
	<code class="commbody broGPT language-html">
		{styledText}
	</code>	
	<div class="boxr" style="margin-top: 32px">
		<ButtonGlow --buttonwidth="128px" --this="var(--orange)">
			<div use:clickToCopyAction={copymaterial} on:copy-done={handleCopyDone}>
				Copy
					{#if copySuccess}
						<Toast>Copied!</Toast>
					{/if}
			</div>
		</ButtonGlow>
		<ButtonGlow2 --buttonwidth="128px" --this="var(--orange)">
			<a href="/mandala/gpt/{nextchat}">
				Previous Chat
			</a>
		</ButtonGlow2>
		<ButtonGlow3 --buttonwidth="128px" --this="var(--orange)">
			<a href="/mandala/gpt/{afterthis}">
				Next Chat
			</a>
		</ButtonGlow3>
	</div>
</div>
{#if deleteConfirmation}
	<div class="confirmationmodal">
		<div class="insidemodal">
			<h5>This will delete the document!</h5>
			<h5 style="color: #fe4a49">Are you sure?</h5>
			<div class="boxr">
				<button class="plain green" on:click={deleteDocument} on:keydown={fauxfake}>Yes</button>
				<button class="plain red" on:click={deleteWarning} on:keydown={fauxfake}>Cancel</button>
			</div>
		</div>
	</div>
	{/if}



<style lang="sass">

.boxr
	gap: 24px

.boxofchat
	border-radius: 4px
	min-height: 100vh
	padding-top: 96px

.agent
	font-size: 12px

.agent.user
	text-transform: uppercase
	color: white

.agent.broGPT
	color: #10C56D
	padding-top: 16px

.commbody.user, .commbody.broGPT
	color: white
	font-family: 'Spline Sans', sans-serif

.commbody.broGPT
	font-size: 18px
	padding-top: 4px
	font-weight: 400
	line-height: 1.6

.commbody.user
	color: #575757
	font-size: 16px
	white-space: normal
	border-bottom: 1px solid #272727
	padding-bottom: 16px
	padding-top: 4px

.commbody
	white-space: pre-line

.confirmationmodal
	position: absolute
	top: 0
	left: 0
	width: 100%
	height: 100%
	display: flex
	flex-direction: column
	align-items: center
	justify-content: center
	backdrop-filter: blur(20px)
	.insidemodal
		width: 200px
		display: flex
		flex-direction: column
		background: white
		height: max-content
		padding: 16px
		color: #272727
		text-align: center
		align-items: center
		row-gap: 8px
		h5
			margin: 0
		.boxr
			gap: 16px
			justify-content: center

</style>