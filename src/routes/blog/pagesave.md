---
title: page save
type: documentation
tags: temp
---


```html
<script lang="ts">

	import { onMount } from 'svelte'
	import { lazyLoadImageAction } from 'svelte-legos'
	import Prism from 'prismjs'
	import '$lib/styles/prism.css'
	import '$lib/styles/prismtoolbar.css'
	import { browser } from '$app/environment'
	import { scale } from 'svelte/transition'
	import { backOut, backIn } from 'svelte/easing'
	import TubeGreenOpen from '$lib/tubes/TubeGreenOpen.svelte'
	import TubeYellowOpen from '$lib/tubes/TubeYellowOpen.svelte'
	import TubeGreenOpenCode from '$lib/tubes/TubeGreenOpen.svelte'
	import CloseButton1 from '$lib/tubes/CloseButton.svelte'
	import CloseButton2 from '$lib/tubes/CloseButton.svelte'
	import CloseButton6 from '$lib/tubes/CloseButton.svelte'
	import '$lib/styles/themes.sass'
	import '$lib/styles/tokens.sass'
	import { limitNotes, onlyStarred, Sveltecode, blogPosts, Supabases, allCodes, allGenerals, allDocums, quillNotes, MidjourneyImages, chatswithGPT } from '$lib/utils/supabase'
	let codas:any
	let notes:any
	let gens:any
	let chats:any
	let docus:any
	let starred:any
	let sveltecodes:any
	let images:any
	let supas:any
	let posts:any
	let limit = 24
	let fake = false
	let gridalign = false
	let imagesLow = 0
	let imagesHigh = 11
	let low = 0
	let high = 11
	let expand:boolean[] = Array(20).fill(false)
	expand[8] = true 
	let openThis:boolean[] = Array(200).fill(false)
	let nulled:boolean[] = Array(200).fill(false)

	function fauxfake(){
		fake = !fake
	}

	function nextTwelve(newLow:number,newHigh:number){
		low = newLow,
		high = newHigh
	}

	function togglePostItem(index:number){
		expand[index] = !expand[index]
			for (let i = 0; i < expand.length; i++) {
			if (i !== index && expand[i] === true) {
			expand[i] = false;
			}
		}
	}


	function toggleOpenItem(index:number){
		openThis[index] = !openThis[index]
			for (let i = 0; i < openThis.length; i++) {
			if (i !== index && openThis[i] === true) {
			openThis[i] = false;
			nulled[i] = true
			}
		}
		if ( gridalign === false) {
			gridalign = true
		}
	}

$:	if (browser && openThis) {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		}

	onMount(async() => {
		Prism.highlightAll()
		starred = await onlyStarred()
		posts = await blogPosts()
		notes = await limitNotes(limit)
		sveltecodes = await Sveltecode()
		docus = await allDocums()
		supas = await Supabases()
		codas = await allCodes()
		gens = await chatswithGPT()
		images = await MidjourneyImages(imagesLow,imagesHigh)
	})
</script>

<svelte:head>
<title>The Fractal Maṇḍala</title>
<meta name="description" content="tech, dev, design, dharma"/>
</svelte:head>


<div class="padl2">
	<div class="border"> 
	<div class="thinstrip">
		<div class="newstd" class:currentTag={expand[1]} on:click={() => togglePostItem(1)} on:keydown={fauxfake}>Recent</div>
		<div class="newstd" class:currentTag={expand[2]} on:click={() => togglePostItem(2)} on:keydown={fauxfake}>Starred</div>
		<div class="newstd" class:currentTag={expand[3]} on:click={() => togglePostItem(3)} on:keydown={fauxfake}>Svelte</div>
		<div class="newstd" class:currentTag={expand[4]} on:click={() => togglePostItem(4)} on:keydown={fauxfake}>Posts</div>
		<div class="newstd" class:currentTag={expand[5]} on:click={() => togglePostItem(5)} on:keydown={fauxfake}>Supa</div>
		<div class="newstd" class:currentTag={expand[6]} on:click={() => togglePostItem(6)} on:keydown={fauxfake}>Code</div>
		<div class="newstd" class:currentTag={expand[7]} on:click={() => togglePostItem(7)} on:keydown={fauxfake}>Chats</div>
		<div class="newstd" class:currentTag={expand[8]} on:click={() => togglePostItem(8)} on:keydown={fauxfake}>Images</div>
		<div class="newstd" class:currentTag={expand[12]} on:click={() => togglePostItem(12)} on:keydown={fauxfake}>
			<input type="text" placeholder="search"/>
		</div>
	</div>
	<div class="thegrid text-base prose prose-truegray xl:text-xl" class:aligned={gridalign}>
		{#if expand[1]}
			{#if notes && notes.length > 0}
				{#each notes as item, i}
					{#if item.type.length > 0 && item.type === 'code'}
						{#if openThis[i]}
						<TubeGreenOpen language={item.lang}>
							<div slot="button" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
								<CloseButton1/>
							</div>
							<small slot="lang">{item.lang}</small>
							<h5 slot="title">{item.title}</h5>
							<p slot="tags">{item.tags}</p>
							<h6 slot="note">{item.note}</h6>
							<code slot="code">{item.codesnippet}</code>
						</TubeGreenOpen>
						{:else}
						<div class="tube green" in:scale={{duration: 100, delay: i * 100, easing: backIn}} out:scale={{duration: 100, delay: i*10, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'gptchat'}
						{#if openThis[i]}
						<TubeYellowOpen>
							<div slot="button" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
								<CloseButton2/>
							</div>
							<small slot="lang">{item.type}</small>
							<h5 slot="title">{item.title}</h5>
							<p slot="tags">{item.tags}</p>
							<h6 slot="note">{item.note}</h6>
							<code slot="code">{item.codesnippet}</code>
						</TubeYellowOpen>
						{:else}
						<div class="tube yell" in:scale={{duration: 100, delay: i * 100, easing: backIn}} out:scale={{duration: 100, delay: i*10, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.codesnippet.slice(0,15)}</h5>
							<p>{item.title}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'post'}
						{#if openThis[i]}
						<div class="tube red opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{:else}
						<div class="tube red" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else}
						{#if openThis[i]}
						<div class="tube blue opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
						</div>
						{:else}
						<div class="tube blue" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{/if}
				{/each}
			{/if}
		{/if}
		{#if expand[2]}
			{#if starred && starred.length > 0}
				{#each starred as item, i}
					{#if item.type.length > 0 && item.type === 'code'}
						{#if openThis[i]}
						<div class="tube green opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre class="language-{item.lang}">
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube green" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'gptchat'}
						{#if openThis[i]}
						<div class="tube yell opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre>
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube yell" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.codesnippet.slice(0,15)}</h5>
							<p>{item.title}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'post'}
						{#if openThis[i]}
						<div class="tube red opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{:else}
						<div class="tube red" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else}
						{#if openThis[i]}
						<div class="tube blue opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
						</div>
						{:else}
						<div class="tube blue" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{/if}
				{/each}
			{/if}
		{/if}
		{#if expand[3]}
			{#if sveltecodes && sveltecodes.length > 0}
				{#each sveltecodes as item, i}
					{#if item.type.length > 0 && item.type === 'code'}
						{#if openThis[i]}
						<div class="tube green opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre class="language-{item.lang}">
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube green" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'gptchat'}
						{#if openThis[i]}
						<div class="tube yell opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre>
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube yell" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.codesnippet.slice(0,15)}</h5>
							<p>{item.title}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'post'}
						{#if openThis[i]}
						<div class="tube red opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{:else}
						<div class="tube red" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else}
						{#if openThis[i]}
						<div class="tube blue opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
						</div>
						{:else}
						<div class="tube blue" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{/if}
				{/each}
			{/if}
		{/if}
		{#if expand[4]}
			{#if posts && posts.length > 0}
				{#each posts as item, i}
					{#if item.type.length > 0 && item.type === 'code'}
						{#if openThis[i]}
						<div class="tube green opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre class="language-{item.lang}">
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube green" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'gptchat'}
						{#if openThis[i]}
						<div class="tube yell opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre>
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube yell" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.codesnippet.slice(0,15)}</h5>
							<p>{item.title}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'post'}
						{#if openThis[i]}
						<div class="tube red opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{:else}
						<div class="tube red" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else}
						{#if openThis[i]}
						<div class="tube blue opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
						</div>
						{:else}
						<div class="tube blue" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{/if}
				{/each}
			{/if}
		{/if}
		{#if expand[5]}
			{#if supas && supas.length > 0}
				{#each supas as item, i}
					{#if item.type.length > 0 && item.type === 'code'}
						{#if openThis[i]}
						<div class="tube green opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre class="language-{item.lang}">
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube green" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'gptchat'}
						{#if openThis[i]}
						<div class="tube yell opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre>
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube yell" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.codesnippet.slice(0,15)}</h5>
							<p>{item.title}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'post'}
						{#if openThis[i]}
						<div class="tube red opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{:else}
						<div class="tube red" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else}
						{#if openThis[i]}
						<div class="tube blue opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
						</div>
						{:else}
						<div class="tube blue" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{/if}
				{/each}
			{/if}
		{/if}
		{#if expand[6]}
			{#if codas && codas.length > 0}
				{#each codas as item, i}
					{#if item.type.length > 0 && item.type === 'code'}
						{#if openThis[i]}
						<TubeGreenOpenCode language={item.lang}>
							<div slot="button" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
								<CloseButton6/>
							</div>
							<small slot="lang">{item.lang}</small>
							<h5 slot="title">{item.title}</h5>
							<p slot="tags">{item.tags}</p>
							<h6 slot="note">
								<a href="/blog/code/{item.id}">Go to Page</a><br>
								{item.note}</h6>
							<code slot="code">{item.codesnippet}</code>
						</TubeGreenOpenCode>
						{:else}
						<div class="tube green" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'gptchat'}
						{#if openThis[i]}
						<div class="tube yell opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre>
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube yell" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.codesnippet.slice(0,15)}</h5>
							<p>{item.title}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'post'}
						{#if openThis[i]}
						<div class="tube red opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{:else}
						<div class="tube red" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else}
						{#if openThis[i]}
						<div class="tube blue opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
						</div>
						{:else}
						<div class="tube blue" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{/if}
				{/each}
			{/if}
		{/if}
		{#if expand[7]}
			{#if gens && gens.length > 0}
				{#each gens as item, i}
					{#if item.type.length > 0 && item.type === 'code'}
						{#if openThis[i]}
						<div class="tube green opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre class="language-{item.lang}">
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube green" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.lang}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'gptchat'}
						{#if openThis[i]}
						<div class="tube yell opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
							<pre>
								<code>
									{item.codesnippet}
								</code>
							</pre>
						</div>
						{:else}
						<div class="tube yell" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.codesnippet.slice(0,15)}</h5>
							<p>{item.title}</p>
						</div>
						{/if}
					{:else if item.type.length > 0 && item.type === 'post'}
						{#if openThis[i]}
						<div class="tube red opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{:else}
						<div class="tube red" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{:else}
						{#if openThis[i]}
						<div class="tube blue opentab" in:scale={{duration: 250, delay: 50, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<div class="closebutton">
								<svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
									<path d="M13.9036 26.7961C6.53965 26.7961 0.570312 20.8267 0.570312 13.4627C0.570312 6.09873 6.53965 0.129395 13.9036 0.129395C21.2676 0.129395 27.237 6.09873 27.237 13.4627C27.237 20.8267 21.2676 26.7961 13.9036 26.7961ZM13.9036 11.5774L10.133 7.80539L8.24631 9.69206L12.0183 13.4627L8.24631 17.2334L10.133 19.1201L13.9036 15.3481L17.6743 19.1201L19.561 17.2334L15.789 13.4627L19.561 9.69206L17.6743 7.80539L13.9036 11.5774Z" fill="white"/>
								</svg>
							</div>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
							<h6>{item.note}</h6>
						</div>
						{:else}
						<div class="tube blue" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>
							<small>{item.type}</small>
							<h5>{item.title}</h5>
							<p>{item.tags}</p>
						</div>
						{/if}
					{/if}
				{/each}
			{/if}
		{/if}
		{#if expand[8]}
			{#if images && images.length > 0}
				{#each images as item, i}
					{#if openThis[i]}
						<div class="tube opentab image" in:scale={{duration: 600, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}}>
							<img src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1{item.link.slice(89,200)}" alt={item.id}/>
						</div>
					{:else}
						<div class="tube image" in:scale={{duration: 100, delay: i * 25, easing: backIn}} out:scale={{duration: 100, easing: backOut}} on:click={() => toggleOpenItem(i)} on:keydown={fauxfake}>	
							<img use:lazyLoadImageAction src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1{item.link.slice(89,200)}" alt={item.id}/>
						</div>
					{/if}
				{/each}
			{/if}
		{/if}
	</div>
	</div>
</div>


<style lang="sass">

.thegrid
	pre
		width: 100%

.newstd input
	border: none
	text-align: center
	background: none
	text-transform: uppercase
	font-size: 12px
	color: #474747
	width: 100%
	cursor: pointer
	outline: none
	&:hover
		color: white !important

.newstd
	cursor: pointer
	border-radius: 4px
	transform-origin: center center
	color: #474747
	transition: all 0.05s ease
	font-size: 12px
	padding: 4px 8px
	position: relative
	overflow: hidden
	z-index: 1
	text-align: center
	background: #171717
	text-transform: uppercase
	&::before
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		content: ''
		z-index: -1
		background-color: hsla(200,9%,5%,0)
		transition: all 0.05s ease
		filter: blur(290px)
		background-image: radial-gradient(at 17% 36%, hsla(248,47%,99%,0.1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,0.2) 0px, transparent 50%)
	&:hover
		color: #FFFFFF
		input
			color: white
		&::before
			background-color: hsla(130,90%,45%,1)
			filter: blur(15px)
.currentTag
	color: white
	&:hover
		overflow: visible
	&::before
		filter: blur(30px)
		background-color: hsla(130,90%,45%,1)
		background-image: radial-gradient(at 17% 36%, hsla(248,47%,49%,1) 0px, transparent 1%), radial-gradient(at 80% 70%, hsla(125,87%,60%,0.2) 0px, transparent 50%)

.thinstrip
	.currentTag
		background-color: hsla(130,90%,15%,1)
		border: 1px solid #272727
	.newstd.currentTag
		box-shadow: 6px 8px 12px #030303

.thinstrip
	display: grid
	grid-auto-flow: row
	@media screen and (min-width: 1024px)
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
		grid-template-rows: 1fr 1fr
		gap: 16px 24px
		margin-bottom: 32px
	@media screen and (max-width: 1023px)
		grid-template-columns: 1fr 1fr 1fr 1fr
		grid-template-rows: 1fr 1fr 1fr
		gap: 8px 8px


</style>
```