---
title: Hugging Face
tag: ai
featured: true
type: other
---

```javascript
MODELS=`[{
  "name": "...",
  "endpoints": [{"url": "http://127.0.0.1:8080/generate_stream"}],
  "userMessageToken": "<|prompter|>",
  "assistantMessageToken": "<|assistant|>",
  "messageEndToken": "</s>",
  "preprompt": "Below are a series of dialogues between various people and an AI assistant. The AI tries to be helpful, polite, honest, sophisticated, emotionally aware, and humble-but-knowledgeable. The assistant is happy to help with almost anything, and will do its best to understand exactly what is needed. It also tries to avoid giving false or misleading information, and it caveats when it isn't entirely sure about the right answer. That said, the assistant is practical and really does its best, and doesn't let caution get too much in the way of being useful.\n-----\n",
  "parameters": {
    "temperature": 0.9,
    "top_p": 0.95,
    "repetition_penalty": 1.2,
    "top_k": 50,
    "truncate": 1000,
    "max_new_tokens": 1000
  }
}]`
```
