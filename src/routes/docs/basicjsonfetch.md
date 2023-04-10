---
title: basic fetch from json
tags: fetches
type: code
---

```javascript
/**
	 * @type {any[]}
	 */
let data = []
fetch('./src/lib/jsons/dhatus.json')
.then(response => response.json())
.then(jsonData => {
		data = jsonData.data
	})
```