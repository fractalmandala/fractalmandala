---
title: supabase auth on sveltekit with auth helpers
tags: sveltecode auth
type: documentation
---

> handle login:

```html
<script>
  import { supabase } from '$lib/supabase';
  import { navigate } from 'svelte-routing';

  let email = '';
  let password = '';
  let errorMessage = '';

  async function handleLogin(event) {
    event.preventDefault();
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      errorMessage = error.message;
    } else {
      navigate('/');
    }
  }
</script>

<form on:submit={handleLogin}>
  <label>
    Email:
    <input type="email" bind:value={email} required />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} required />
  </label>
  <button type="submit">Login</button>
  {errorMessage && <p>{errorMessage}</p>}
</form>
```

> handle signouts

```html
<script>
  import { supabase } from '$lib/supabase';
  import { navigate } from 'svelte-routing';

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/');
  }
</script>

<button on:click={handleLogout}>Logout</button>
```

> hooks.server.ts to handle sessions:

```js
import { supabase } from '../supabase';

export async function handle({ request, resolve }) {
  const { user } = await supabase.auth.api.getUserByCookie(request.headers.cookie);
  request.locals.user = user;
  return resolve(request);
}
```

> hooks.client.ts to handle sessions on client side:

```js
import { supabase } from '../supabase';

export function getSession() {
  return supabase.auth.session();
}

export function getUser() {
  return supabase.auth.user();
}
```

> track and manage states:

```html
<script>
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  let user = null;

  async function handleAuthStateChange() {
    const session = await supabase.auth.session();
    user = session?.user ?? null;
  }

  onMount(() => {
    handleAuthStateChange();
    supabase.auth.onAuthStateChange(handleAuthStateChange);
  });
</script>

{#if user}
  <p>Logged in as {user.email}</p>
  <button on:click={handleLogout}>Logout</button>
{:else}
  <p>Not logged in</p>
  <Link to="/login">Login</Link>
{/if}
```

> fetch user info:

```html
<script>
  import { getUser } from '$lib/hooks.client';

  let user = null;

  function handleLoadUser() {
    user = getUser();
  }
</script>

<button on:click={handleLoadUser}>Load User</button>
{#if user}
  <p>User email: {user.email}</p>
{/if}
```

> sign outs in components

```html
<script>
  import { supabase } from '$lib/supabase';
  import { navigate } from 'svelte-routing';

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/');
  }
</script>

<button on:click={handleLogout}>Logout</button>
```

