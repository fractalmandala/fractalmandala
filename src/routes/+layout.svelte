<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import '$lib/styles/global.sass'
</script>

<svelte:head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css2?family=Akshar:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<Header></Header>
<slot></slot>