---
title: Integrating Supabase and Sveltekit
tags: supabase sveltekit
type: post
---

This is an example of how to integrate Supabase with Sveltekit. Some caveats to keep in mind:

1. Using utilities like Supabase with Sveltekit involves the use of secret keys, such as a Supabase project's API key. 
2. These secret values should never be used such that they are passed out publicly, as it creates a major security vulnerability.
3. In Sveltekit, this means that 'private environment variables' are only used in server-side code, and never in client-side code.

###### Simply put, server-side code runs on the web-server (uses host-side resources/applications) while client-side code runs on the user's end. This is why private keys should not pass to client-side codes.

I'm going to assume an instance of Sveltekit project already set up and running. To begin on this with Supabase, first:

```bash
npm install @supabase/supabase-js
```