<script lang="ts">
	
	import { onMount } from 'svelte'
	import { alertAction } from 'svelte-legos'
	import hljs from 'highlight.js'
	import supabase from '$lib/utils/supabase'
	import { CodeHTML, CodesFiltered } from '$lib/utils/supabase'
	import PopupHTML from '$lib/components/PopupHTML.svelte'
	import { fly } from 'svelte/transition'
	export let data
	import '$lib/styles/highlight.css'
	let lang:any = data.lang
	let codes:any
	let showothers:boolean = false
	let fake:boolean = false
	let codeContents:any
	let deletionID:any
	let confirmDelete:boolean = false
	let theid:any

	function onClose(){
		confirmDelete = false
	}

	function onOk(){
		confirmDelete = true
	}


	function toggleShow(){
		showothers = !showothers
	}

	function fauxfake(){
		fake = !fake
	}

	function copyToClipboard() {
  	const range = document.createRange();
  	range.selectNodeContents(codeContents);
  	const selection = window.getSelection();

  	if (selection) {
    	selection.removeAllRanges();
    	selection.addRange(range);

    try {
      	document.execCommand('copy');
      	alert('Code snippet copied to clipboard');
    	} catch (err) {
      	alert('Failed to copy code snippet');
    	}

    	selection.removeAllRanges();
  	} else {
    	alert('Failed to copy code snippet');
  	}
	}
	

	onMount(async() => {
		confirmDelete = false
		lang = data.lang
		codes = await CodesFiltered(lang)
		theid = data.id
		hljs.highlightAll()
	})
</script>



<div class="pagecontainer x00">
	<div class="metaoptions">
		<div class="metadelete"
			use:alertAction={{
					title: 'This will delete the note!',
					description: 'Are you sure? Click OK to Delete.',
				}}
			>
			<svg width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path id="gowhite" d="M8.43243 8.43235H22.7027V16.2161H8.43243V8.43235Z" fill="#fe4a49"/>
				<path id="gored" d="M8.21598 0.407227H26.9814C27.3254 0.407227 27.6554 0.543906 27.8987 0.787196C28.142 1.03049 28.2787 1.36046 28.2787 1.70452V22.4613C28.2787 22.8053 28.142 23.1353 27.8987 23.3786C27.6554 23.6219 27.3254 23.7586 26.9814 23.7586H8.21598C8.00245 23.7586 7.79222 23.7059 7.60394 23.6052C7.41565 23.5045 7.25513 23.3589 7.13663 23.1813L0.21814 12.8029C0.0759057 12.5897 0 12.3392 0 12.0829C0 11.8266 0.0759057 11.5761 0.21814 11.3629L7.13663 0.984524C7.25513 0.806903 7.41565 0.661279 7.60394 0.560574C7.79222 0.459868 8.00245 0.407195 8.21598 0.407227ZM20.4949 10.7856H11.4138V13.3802H20.4949V10.7856Z" fill="#474747"/>
			</svg>
		</div>
	</div>
	<h1>
		{data.title}
	</h1>
	<div class="gridof2">
		<div class="columnleft">
			{#if data.note && data.note.length > 0}
				<p class="notepara">{data.note}</p>
			{/if}
				<div class="codetray">
				<div class="boxc oflang">
					<small on:click={toggleShow} on:keydown={fauxfake}>{data.lang}</small>
				</div>
				<div class="boxr" on:click={copyToClipboard} on:keydown={fauxfake}>
					<svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.2372 11.5296C19.7087 11.5296 22.5229 14.3438 22.5229 17.8154C22.5229 21.2869 19.7087 24.1011 16.2372 24.1011C12.7656 24.1011 9.95145 21.2869 9.95145 17.8154C9.95145 14.3438 12.7656 11.5296 16.2372 11.5296ZM2.52608 3.10341L2.52288 5.52965V17.5344C2.52288 19.5858 4.18582 21.2487 6.23716 21.2487L9.64837 21.2498C9.97739 21.8795 10.394 22.4563 10.882 22.9637L6.23716 22.963C3.23905 22.963 0.808594 20.5326 0.808594 17.5344V5.52965C0.808594 4.40883 1.52568 3.4555 2.52608 3.10341ZM17.1335 14.488C16.9386 14.3531 16.6785 14.3531 16.4837 14.488L16.4045 14.5541L16.3384 14.6333C16.2035 14.8282 16.2035 15.0883 16.3384 15.2831L16.4045 15.3623L18.2848 17.2428L12.8014 17.2439L12.6987 17.2532C12.4654 17.2955 12.2815 17.4794 12.2392 17.7126L12.23 17.8154L12.2392 17.9181C12.2815 18.1514 12.4654 18.3352 12.6987 18.3775L12.8014 18.3868L18.2871 18.3856L16.4045 20.2684L16.3384 20.3476C16.1841 20.5703 16.2062 20.8782 16.4045 21.0766C16.6029 21.2749 16.9108 21.297 17.1335 21.1427L17.2127 21.0766L20.1037 18.1824L20.146 18.1252L20.194 18.0336L20.2237 17.9391L20.235 17.8661V17.7647L20.2238 17.6919L20.2105 17.6426L20.1737 17.5534L20.1463 17.506L20.1037 17.4483L17.2127 14.5541L17.1335 14.488ZM16.5229 0.101074C17.943 0.101074 19.0943 1.25234 19.0943 2.6725L19.095 10.9564C18.2152 10.5894 17.2498 10.3868 16.2372 10.3868C12.1344 10.3868 8.80859 13.7126 8.80859 17.8154C8.80859 18.6131 8.93431 19.3813 9.16699 20.1015L6.23716 20.1011C4.817 20.1011 3.66574 18.9498 3.66574 17.5296V2.6725C3.66574 1.25234 4.817 0.101074 6.23716 0.101074H16.5229Z" fill="white"/>
					</svg>
					<small>COPY CODE</small>
				</div>
				</div>	
				<div class="surroundcode">
				<pre>
					<code class="language-{data.lang}" bind:this={codeContents}>
						{data.codesnippet}
					</code>
				</pre>
				</div>
			</div>
		<div class="columnright">
			{#if showothers}
				{#if codes && codes.length > 0}
						{#each codes as item, i}
							<p in:fly={{ delay: i * 30}} out:fly={{ delay: 0}}>
								<a href="/notes/{item.id}" target="_self">
									{item.title}
								</a>
							</p>
						{/each}
				{/if}
			{/if}
		</div>
	</div>
</div>

<style lang="sass">

.oflang
	cursor: pointer
	width: max-content
	small
		padding: 2px
	&:hover
		background: #10C56D
		small
			color: white

.metadelete
	cursor: pointer
	svg
		object-fit: contain
		height: 15px
	&:hover
		#gored
			fill: #fe4a49
		#gowhite
			fill: white
		

.metaoptions
	display: none
	flex-direction: row
	margin-bottom: 8px

.codetray
	display: flex
	flex-direction: row
	justify-content: space-between
	padding: 12px 32px
	background: #171717
	border-bottom: 1px solid #272727
	margin-bottom: -12px
	small
		color: #878787
	.boxc
		width: max-content
	.boxr
		width: max-content
		column-gap: 4px
		justify-content: flex-end
		cursor: pointer
		svg
			height: 16px
			path
				fill: #878787
		&:hover
			svg path
				fill: #10D56C
			small
				color: white
	&:hover
		background: #111111

.surroundcode
	padding: 0px 32px 32px 32px
	background: #171717
	z-index: 10
	pre
		white-space: pre-line

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

</style>