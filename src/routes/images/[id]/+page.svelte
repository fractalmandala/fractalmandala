<script lang="ts">

	export let data

</script>

<div class="bigimage">
	<img src="https://wganhlzrylmkvvaoalco.supabase.co/storage/v1/object/public/images/batch1/{data.link.slice(90,100)}" alt={data.id}>
</div>

<style lang="sass">

.bigimage
	height: 100vh
	width: 100vw
	img
		object-fit: cover
		height: 100%
		width: 100%

</style>