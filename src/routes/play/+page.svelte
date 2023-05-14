<script lang="ts">


	import visibilityMode from '$lib/stores/visibility'

	async function verifyKey() {
	    if (typeof window !== 'undefined') {
	        const storedValue = localStorage.getItem('key');
	
	        const response = await fetch('/api/password', {
	            method: 'POST',
	            headers: {
	                'Content-Type': 'application/json'
	            },
	            body: JSON.stringify({ key: storedValue })
	        });
	
	        const result = await response.json();
	
	        if (result.valid) {
	            console.log('The stored value is "xyz"');
	        } else {
	            console.log('The stored value is not "xyz"');
	        }
	    }
	}
	
	verifyKey();



</script>

<div class="rta-column" class:light={!$visibilityMode} class:dark={$visibilityMode}>
	<h3 class="bord-bot p-bot-16">Just a playground for building stuff...</h3>
	
</div>