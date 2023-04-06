---
title: supabase auth in sveltekit
tags: sveltecode auth
type: documentation
---

> Implement the login functionality in your SvelteKit project

```js
import { supabase } from './supabase.js';

async function login() {
  const { user, error } = await supabase.auth.signIn({
    email: 'user@example.com',
    password: 'password',
  });
  if (error) {
    console.error('Error signing in:', error.message);
  } else {
    console.log('Signed in successfully:', user);
  }
}
```

> Implement the logout functionality in your SvelteKit project

```js
import { supabase } from './supabase.js';

async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
  } else {
    console.log('Signed out successfully');
  }
}
```

>  Implement the signup functionality in your SvelteKit project

```js
import { supabase } from './supabase.js';

async function signup() {
  const { user, error } = await supabase.auth.signUp({
    email: 'user@example.com',
    password: 'password',
  });
  if (error) {
    console.error('Error signing up:', error.message);
  } else {
    console.log('Signed up successfully:', user);
  }
}
```

> Use Supabase to check if the user is logged in

```js
import { supabase } from './supabase.js';

async function checkSession() {
  const { user } = await supabase.auth.api.getUser();
  if (user) {
    console.log('User is logged in:', user);
  } else {
    console.log('User is not logged in');
  }
}
```

> To handle session management throughout your app, you can create two files: hooks.server.js and hooks.client.js. These files will export functions that you can use in your SvelteKit components to check if the user is logged in, and to get the user data.

```js
import { supabase } from '../supabase';

export async function handle({ request, resolve }) {
  const { user } = await supabase.auth.api.getUserByCookie(request.headers.cookie);
  request.locals.user = user;
  return resolve(request);
}
```

> This function uses the supabase.auth.api.getUserByCookie() method to check if the user is logged in. If there is a user, it is added to the request.locals object, which is available to all subsequent middleware and handlers in the SvelteKit app.

```js
import { supabase } from '../supabase';

export function getSession() {
  return supabase.auth.session();
}

export function getUser() {
  return supabase.auth.user();
}
```

> These functions use the supabase.auth.session() and supabase.auth.user() methods to get the session data and user data respectively. You can use these functions in your SvelteKit components to check if the user is logged in and to get the user data.
> Note: The hooks.server.js file will only work on the server-side, while the hooks.client.js file will work on the client-side.
> To use these functions in your SvelteKit components, you can import them like this:

```js
import { getSession, getUser } from '$lib/hooks';
```

> Then, you can call them in your component methods like this:

```js
const session = getSession();
const user = getUser();
```

