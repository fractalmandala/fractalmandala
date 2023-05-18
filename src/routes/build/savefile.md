---
title: Save File
tag: important
type: stores
---

#### langchain stuff

```shell
import { OpenAI } from "langchain/llms/openai";
```

define the prompt template:

```javascript
import { PromptTemplate } from "langchain/prompts";

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});
```

Extending the previous example, we can construct an LLMChain which takes user input, formats it with a PromptTemplate, and then passes the formatted response to an LLM.

```javascript
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const model = new OpenAI({ temperature: 0.9 });
const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});
```

##### Example of Google Search agent
For this example, you'll need to set the SerpAPI environment variables in the .env file.

```shell
npm install -S serpapi
```

```javascript
import { OpenAI } from "langchain/llms/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

const model = new OpenAI({ temperature: 0 });
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
});
console.log("Loaded agent.");

const input =
  "Who is Olivia Wilde's boyfriend?" +
  " What is his current age raised to the 0.23 power?";
console.log(`Executing with input "${input}"...`);

const result = await executor.call({ input });

console.log(`Got output ${result.output}`);
```


```javascript
import { OpenAI } from "langchain/llms/openai";

// To enable streaming, we pass in `streaming: true` to the LLM constructor.
// Additionally, we pass in a handler for the `handleLLMNewToken` event.
const chat = new OpenAI({
  streaming: true,
  callbacks: [
    {
      handleLLMNewToken(token: string) {
        process.stdout.write(token);
      },
    },
  ],
});

await chat.call("Write me a song about sparkling water.");
/*
Verse 1
Crystal clear and made with care
Sparkling water on my lips, so refreshing in the air
Fizzy bubbles, light and sweet
My favorite beverage I can’t help but repeat

Chorus
A toast to sparkling water, I’m feeling so alive
Let’s take a sip, and let’s take a drive
A toast to sparkling water, it’s the best I’ve had in my life
It’s the best way to start off the night

Verse 2
It’s the perfect drink to quench my thirst
It’s the best way to stay hydrated, it’s the first
A few ice cubes, a splash of lime
It will make any day feel sublime
...
*/
```

##### GPT


```javascript
import { marked } from 'marked'
```

```html
<pre>
	{@html marked.parse(message.content)}
</pre>
```