<script>
  import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte'
</script>

<Header></Header>
<div class="boxc">
	<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdadldszvZBZvPN_41ObseVSCfGqJaa2ig2w&usqp=CAU" alt="error"/>
	<h1>oops! no page here.</h1>
	<button><a href="/">GO TO HOME</a></button>
</div>

<style lang="sass">

button
	background: #10C56D
	border: none
	color: white
	padding: 8px

.boxc
	width: 100%
	height: calc(100vh - 112px)
	background: white
	justify-content: center
	align-items: center

img
	width: 200px
	object-fit: contain

</style>


