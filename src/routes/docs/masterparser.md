---
title: Master Parser
type: documentation
tags: sveltecode
---

- necessary dependencies:

```
npm install --save svelte-parse-markdown svelte-parse-xml xml2js svelte-json-tree ujson uax14 svelte-table svelte-search
```

- Create a src/lib folder to store helper functions and components for parsing and rendering content.
- In src/lib, create a parsers.js file containing functions for parsing different file formats:

```javascript
// parsers.js
import marked from 'svelte-parse-markdown';
import xml2js from 'xml2js';
import ujson from 'ujson';
import uax14 from 'uax14';

export async function parseMarkdown(mdContent) {
  return marked(mdContent);
}

export async function parseXML(xmlContent) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlContent, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export function parseJSON(jsonContent) {
  return ujson.parse(jsonContent);
}

export function parseCoNLLu(conlluContent) {
  const sentences = uax14.split(conlluContent, uax14.UNICODE_LINE_BREAK);
  return sentences.map((sentence) => sentence.trim().split('\n').map((line) => line.split('\t')));
}
```

- Create components in src/lib for rendering parsed content:
1. Markdown.svelte: For rendering Markdown content.
2. XML.svelte: For rendering XML content.
3. JSONViewer.svelte: For rendering JSON content.
4. CoNLLuViewer.svelte: For rendering CoNLLu content.

- Use helper components and functions on page:

```html
<script>
  import { parseMarkdown, parseXML, parseJSON, parseCoNLLu } from '$lib/parsers';
  import Markdown from '$lib/Markdown.svelte';
  import XML from '$lib/XML.svelte';
  import JSONViewer from '$lib/JSONViewer.svelte';
  import CoNLLuViewer from '$lib/CoNLLuViewer.svelte';

  let mdContent = `# Your Markdown content here`;
  let xmlContent = `<root><item>Your XML content here</item></root>`;
  let jsonContent = `{"key": "Your JSON content here"}`;
  let conlluContent = `# Your CoNLLu content here`;

  let mdParsed, xmlParsed, jsonParsed, conlluParsed;

  // Parse contents when the page loads
  (async () => {
    mdParsed = await parseMarkdown(mdContent);
    xmlParsed = await parseXML(xmlContent);
    jsonParsed = parseJSON(jsonContent);
    conlluParsed = parseCoNLLu(conlluContent);
  })();
</script>

<Markdown {mdParsed} />
<XML {xmlParsed} />
<JSONViewer {jsonParsed} />
<CoNLLuViewer {conlluParsed} />
```

To make the content searchable, create a Search.svelte component in src/lib that leverages the svelte-search package. Import and use this component in your SvelteKit pages where you want to provide a search feature.

For sorting and filtering data, create components or utility functions for specific use-cases, and use them in your Svelte