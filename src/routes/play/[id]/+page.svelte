<script lang="ts">
	//@ts-nocheck
	import { onMount } from 'svelte'
	import hljs from 'highlight.js'
	import '$lib/styles/highlight.css'
	import { clickToCopyAction } from 'svelte-legos'
	import supabase from '$lib/utils/supabase'
	import Toast from '$lib/components/Toast.svelte'
	let nextchat:number
	let afterthis:number
	let theid:any
	let copymaterial: any
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

	onMount(async() => {
		hljs.highlightAll()
		nextchat = data.id - 1
		afterthis = data.id + 1
		copymaterial = data.response
		theid = data.id
	})

	export let data

</script>

<div class="boxofchat" on:click={closeCopySuccessMessage} on:keydown={fauxfake}>
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
	<pre class="commbody broGPT language-html">
		{data.response}
	</pre>	
	<div class="boxr">
	<button class="glowing" use:clickToCopyAction={copymaterial} on:copy-done={handleCopyDone}>
		Copy
		{#if copySuccess}
		<Toast>
			Copied!
		</Toast>
		{/if}
	</button>
	<div class="glowing">
		<a href="/play/{nextchat}">
			Previous Chat
		</a>
	</div>
	<div class="glowing">
		<a href="/play/{afterthis}">
			Next Chat
		</a>
	</div>
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

.glowing
	margin-top: 32px
	padding-top: 4px
	padding-bottom: 4px
	text-align: center
	color: #878787
	font-size: 12px
	a
		font-size: 12px
		color: #878787
	&:hover
		color: white
		a
			color: white
		border: 1px solid white

pre
	overflow-x: auto
	box-sizing: border-box
	white-space: pre-line
	word-wrap: break-word
	word-break: break-word

pre
	margin: 4px 0 0 0
	line-height: 1.6
	color: white

.boxofchat
	border: 1px solid #272727
	border-radius: 4px
	margin-bottom: 16px
	padding: 16px 32px
	backdrop-filter: blur(40px)
	background: rgba(0,0,0,0.1)

.agent
	font-size: 12px

.agent.user
	text-transform: uppercase
	text-align: right
	color: white

.agent.broGPT
	color: #10C56D
	padding-top: 16px

.commbody.user, .commbody.broGPT
	color: white
	font-family: 'Spline Sans', sans-serif
	text-transform: lowercase

.commbody.broGPT
	font-size: 14px
	padding-top: 4px
	width: 60%

.commbody.user
	text-align: right
	color: #575757
	font-size: 14px
	white-space: normal
	width: 60%
	margin-left: 40%
	border-bottom: 1px solid #272727
	padding-bottom: 16px
	padding-top: 4px


.commbody
	white-space: pre-line

@keyframes theglowing
	0%
		background-position: 0% 50%
	33%
		background-position: 50% 100%
	66%
		background-position: 100% 50%
	100%
		background-position: 50% 0%

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