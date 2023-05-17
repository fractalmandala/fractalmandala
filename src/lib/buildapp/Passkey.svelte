<script lang="ts">

	let apiKey = ''
	
	function keyIsChanged(){
		localStorage.setItem('openai_api_key', apiKey)
	}

</script>

<input type = "text" bind:value={apiKey} on:change={keyIsChanged} placeholder="enter authorization"/>