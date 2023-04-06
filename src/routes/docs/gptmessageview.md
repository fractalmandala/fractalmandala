---
title: gpt message view
tags: gpt
type: code
---

```javascript
<script lang="ts">
	import type { ChatMessage } from '$lib/types';

	export let message: ChatMessage;
</script>

<div
	class={[
		message.from === 'user' ? 'usermessg' : 'usermessg2'
	].join(' ')}
>
	{message.content}
</div>

<style lang="sass">

.usermessg
	color: #676767
	margin: 0
	padding: 0 0 4px 16px
	border-bottom: 1px solid #272727
	margin-top: 20px
	text-transform: capitalize
	border-left: 2px solid #10D56C	

</style>
```
