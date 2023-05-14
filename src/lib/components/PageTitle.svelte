<script lang="ts">

	export let pageTitle:string = ''
	let siteName = 'Fractal Maṇḍala'
	let nullify = false

	$: if ( pageTitle === siteName) {
		nullify = true
	} else {
		nullify = false
	}

</script>


{#if !nullify}
	<title>
		{pageTitle} at {siteName}
	</title>
{:else}
	<title>
		{siteName}
	</title>
{/if}
<meta name="robots" content="index, follow">
<meta name="googlebot" content="index, follow">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@saamaanyafreaky">
<meta name="twitter:creator" content="@saamaanyafreaky">
<meta property="og:type" content="website">
<meta property="og:image" content="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/website/fmcover.png">
<meta property="og:image:alt" content="mandala">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="600">
<meta name="description" content="digital garden on dharma, history, dev, design...">
<meta property="og:title" content="Fractal Maṇḍala">
<meta property="og:description" content="digital garden on dharma, history, dev, design...">
<meta property="og:url" content="https://www.fractalmandala.in">

