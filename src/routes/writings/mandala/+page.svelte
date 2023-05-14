<script lang="ts">

	import { onMount } from 'svelte'
	import { themeMode } from '$lib/stores/globalstores'
	import { slide } from 'svelte/transition'
	import { aphorisms1, aphorisms2, aphorisms3, aphorisms4 } from '$lib/utils/supabase'
	let sutra1:any
	let sutra2:any
	let sutra3:any
	let sutra4:any
	let thisSutra = Array(4).fill(false)
	let fake = false

	$: anySutraOpen = thisSutra.some(item => item)

	function fauxfake(){
		fake = !fake
	}

	function scrollToAnchor(){
		const element = document.getElementById("anchorpoint");
		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				left: 0,
				behavior: "smooth",
			});
		}
	}

	function toggleSutra(index:number) {
		thisSutra[index] = !thisSutra[index]
		for ( let i = 0; i < thisSutra.length; i ++ ) {
			if ( i !== index && thisSutra[i] === true ) {
				thisSutra[i] = false
			}
		}
	}

	onMount(async() => {
		sutra1 = await aphorisms1();
		sutra2 = await aphorisms2();
		sutra3 = await aphorisms3();
		sutra4 = await aphorisms4();
	})


</script>

<div class="rta-column stickyboy" class:dark={$themeMode} class:light={!$themeMode}>
	<h3 class="bord-bot p-bot-16">
		Fractal Maṇḍala
	</h3>
</div>
<div class="rta-column text snipstyle p-bot-64" class:dark={$themeMode} class:light={!$themeMode}>
	<p>
		The 'fractal maṇḍala' is a metaphor for the Indian civilizational conciousness. It signifies a two-fold distinction:
	</p>
	<ol>
		<li>
			The civilization is multi-level, or fractal. As Shri Rajiv Malhotra says- "the same essential truths are embedded into every aspect of the civilization."
		</li>
		<li>
			It is coherent, like a rounded maṇḍala. The essential truths and diverse dimensionality are all tied into core civilizational imperatives, for example- "asato mā sadgamaya, tamaso mā jyotirgamaya."
		</li>
	</ol>
	<p>
		I've written several essays expanding on this, which you can find in the subsection menu. Below are the four essential aphorisms, the caturasūtra, for understanding Indian civilizational consciousness.
	</p>
	<div class="rta-column bord-top m-top-16">
		<h4>Caturasūtra - the 4 Essential Aphorisms</h4>
	</div>
	<p>
		Over a period of immense cultural continuity, evidenced to us in <span class="is-green">itihāsa.</span>
	</p>
	<p>
		Information was processed in increasingly complex ways, in the geographical discrete known to us as <span class="is-green">bhārata.</span>
	</p>
	<p>
		Emerged a civilizational consciousness with multi-level coherence. We call it <span class="is-green">dharma.</span>
	</p>
	<h5>The caturasūtra explain how this could happen. Use the tabs to toggle between them.</h5>
	<div class="rta-row colgap200 m-top-16 p-top-16 bord-top p-bot-16" id="anchorpoint">
		<button class="secondbutton" on:click={() => toggleSutra(1)} class:selectedsecond={thisSutra[1]}>
			1
		</button>
		<button class="secondbutton" on:click={() => toggleSutra(2)} class:selectedsecond={thisSutra[2]}>
			2
		</button>
		<button class="secondbutton" on:click={() => toggleSutra(3)} class:selectedsecond={thisSutra[3]}>
			3
		</button>
		<button class="secondbutton" on:click={() => toggleSutra(4)} class:selectedsecond={thisSutra[4]}>
			4
		</button>	
	</div>
	{#if thisSutra[1]}
		<div class="rta-column rowgap300" transition:slide>
			{#if sutra1 && sutra1.length > 0}
				{#each sutra1 as item}
					<h4>{item.aphorism}</h4>
					<h4 class="ta-r">{item.iast}</h4>
					<h5>
						{item.english}
					</h5>	
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<div class="rta-image w32 height-30">
							<img src={item.image1} alt={item.id}/>
						</div>
						<pre class="w64">
							{item.para1}
						</pre>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<pre class="w64">
							{item.para2}
						</pre>
						<div class="rta-image w32 height-30">
							<img src={item.image2} alt={item.id}/>
						</div>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<div class="rta-image w32 height-30">
							<img src={item.image3} alt={item.id}/>
						</div>
						<pre class="w64">
							{item.para3}
						</pre>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<pre class="w64">
							{item.para4}
						</pre>
						<div class="rta-image w32 height-30">
							<img src={item.image4} alt={item.id}/>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
	{#if thisSutra[2]}
		<div class="rta-column rowgap300" transition:slide>
			{#if sutra2 && sutra2.length > 0}
				{#each sutra2 as item}
					<h4>{item.aphorism}</h4>
					<h4 class="ta-r">{item.iast}</h4>
					<h5>
						{item.english}
					</h5>	
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<div class="rta-image w32 height-30">
							<img src={item.image1} alt={item.id}/>
						</div>
						<pre class="w64">
							{item.para1}
						</pre>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<pre class="w64">
							{item.para2}
						</pre>
						<div class="rta-image w32 height-30">
							<img src={item.image2} alt={item.id}/>
						</div>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<div class="rta-image w32 height-30">
							<img src={item.image3} alt={item.id}/>
						</div>
						<pre class="w64">
							{item.para3}
						</pre>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<pre class="w64">
							{item.para4}
						</pre>
						<div class="rta-image w32 height-30">
							<img src={item.image4} alt={item.id}/>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
	{#if thisSutra[3]}
		<div class="rta-column rowgap300" transition:slide>
			{#if sutra3 && sutra3.length > 0}
				{#each sutra3 as item}
					<h4>{item.aphorism}</h4>
					<h4 class="ta-r">{item.iast}</h4>
					<h5>
						{item.english}
					</h5>	
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<div class="rta-image w32 height-30">
							<img src={item.image1} alt={item.id}/>
						</div>
						<pre class="w64">
							{item.para1}
						</pre>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<pre class="w64">
							{item.para2}
						</pre>
						<div class="rta-image w32 height-30">
							<img src={item.image2} alt={item.id}/>
						</div>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<div class="rta-image w32 height-30">
							<img src={item.image3} alt={item.id}/>
						</div>
						<pre class="w64">
							{item.para3}
						</pre>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<pre class="w64">
							{item.para4}
						</pre>
						<div class="rta-image w32 height-30">
							<img src={item.image4} alt={item.id}/>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
	{#if thisSutra[4]}
		<div class="rta-column rowgap300" transition:slide>
			{#if sutra4 && sutra4.length > 0}
				{#each sutra4 as item}
					<h4>{item.aphorism}</h4>
					<h4 class="ta-r">{item.iast}</h4>
					<h5>
						{item.english}
					</h5>	
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<div class="rta-image w32 height-30">
							<img src={item.image1} alt={item.id}/>
						</div>
						<pre class="w64">
							{item.para1}
						</pre>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<pre class="w64">
							{item.para2}
						</pre>
						<div class="rta-image w32 height-30">
							<img src={item.image2} alt={item.id}/>
						</div>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<div class="rta-image w32 height-30">
							<img src={item.image3} alt={item.id}/>
						</div>
						<pre class="w64">
							{item.para3}
						</pre>
					</div>
					<div class="rta-row colgap200 p-bot-32 bord-bot">
						<pre class="w64">
							{item.para4}
						</pre>
						<div class="rta-image w32 height-30">
							<img src={item.image4} alt={item.id}/>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
	{#if anySutraOpen}
	<div class="rta-row colgap200 m-top-16 p-top-16 p-bot-16" on:click={scrollToAnchor} on:keydown={fauxfake}>
		<button class="secondbutton" on:click={() => toggleSutra(1)} class:selectedsecond={thisSutra[1]}>
			1
		</button>
		<button class="secondbutton" on:click={() => toggleSutra(2)} class:selectedsecond={thisSutra[2]}>
			2
		</button>
		<button class="secondbutton" on:click={() => toggleSutra(3)} class:selectedsecond={thisSutra[3]}>
			3
		</button>
		<button class="secondbutton" on:click={() => toggleSutra(4)} class:selectedsecond={thisSutra[4]}>
			4
		</button>	
	</div>
	{/if}
</div>
