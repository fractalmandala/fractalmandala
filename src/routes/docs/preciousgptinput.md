---
title: sending gpt to supabase
tags: gpt supabase
type: code
---

```javascript

	$: if (submittance) {
		submitAnswer()
	}

	async function submitAnswer(){
		try {
			const { error } = await supabase
      .from('amrit-chatswithgpt')
      .insert({ prompt: userprompt, response: submittance })
      if (error) {
        throw new Error(error.message)
      }
      console.log('submitted')
    } catch (e) {
      console.error('Error inserting into Supabase:', e)
    }
	}
```