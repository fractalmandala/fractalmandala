<script lang="ts">

	import supabase from '$lib/utils/supabase'

	let email = '';
	let password = '';
	let error = '';

	const login = async () => {
		const { error } = await supabase.auth.signInWithPassword({
		email,
		password
		})

		if (error) {
			console.error(error);
		}
	}

</script>

<div class="padl1">

	{#if error}
		<p>error</p>
	{/if}

	<form on:submit|preventDefault={login}>
		<label>
			Email:
			<input type="email" bind:value={email} />
		</label>
		<br />
		<label>
			Password:
			<input type="password" bind:value={password} />
		</label>
		<br />
		<button type="submit">Login</button>
	</form>

</div>