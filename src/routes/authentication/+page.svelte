<!-- src/routes/logging-in/+page.svelte -->
<script lang="ts">

	import type { ActionData } from './$types';
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	let loading = false

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			if (result.type === 'redirect') {
				await invalidate('supabase:auth');
			} else {
				await applyAction(result);
			}
			loading = false;
		};
	};

	$: {
		const redirectTo = $page.url.searchParams.get('redirect');

		// check if user has been set in session store then redirect
		if (browser && data.session) {
			goto(redirectTo ?? '/');
		}
	}
</script>

<div class="x00 buffer bufferYt bufferYb">
	<form method="post" use:enhance={handleSubmit} class="auth-form">
		<label for=""> Email </label>
		<input
						id="email"
						name="email"
						value={form?.values?.email ?? ''}
						class="input"
						type="email"
						placeholder="Email"
						required
					/>
		<label for=""> Password </label>
					<input
						id="password"
						name="password"
						class="input"
						type="password"
						placeholder="Password"
						autocomplete="current-password"
						required
					/>
		<button class="plain green" type="submit" disabled={loading}>Login</button>
	</form>
</div>


<style lang="sass">

.auth-form
	display: flex
	flex-direction: column
	row-gap: 2px
	width: 16%
	input
		margin-bottom: 16px


</style>