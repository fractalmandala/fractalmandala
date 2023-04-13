import { getTokens } from '$lib/utils/tokenizer'
import type { RequestHandler } from './$types'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import supabase from '$lib/utils/supabase'
import { json } from '@sveltejs/kit'

export const config = {
	runtime: 'edge'
}

const openAiKey = import.meta.env.VITE_OPENAI_API_KEY

	export const POST: RequestHandler = async ({ request }) => {
		try {
			if (!openAiKey) {
				throw new Error('OPENAI_KEY env variable not set')
			}

		const requestData = await request.json()

		if (!requestData) {
			throw new Error('No request data')
		}

		const reqMessages: ChatCompletionRequestMessage[] = requestData.messages

		if (!reqMessages) {
			throw new Error('no messages provided')
		}

		let tokenCount = 0

		reqMessages.forEach((msg) => {
			const tokens = getTokens(msg.content)
			tokenCount += tokens
		})

		const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${openAiKey}`
			},
			method: 'POST',
				body: JSON.stringify({
					input: reqMessages[reqMessages.length - 1].content
				})
			})
			if (!moderationRes.ok) {
				const err = await moderationRes.json()
				throw new Error(err.error.message)
			}

			const moderationData = await moderationRes.json()
			const [results] = moderationData.results

			if (results.flagged) {
				throw new Error('Query flagged by openai')
			}
	
			const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      	method: 'POST',
      	headers: {
        	Authorization: `Bearer ${openAiKey}`,
        	'Content-Type': 'application/json',
      	},
      	body: JSON.stringify({
        	model: 'text-embedding-ada-002',
        	input: reqMessages[reqMessages.length - 1].content
      	}),
    	})

    	if (embeddingResponse.status !== 200) {
      	throw new Error('Failed to create embedding for question')
    	}

    	const {
      	data: [{ embedding }],
    	} = await embeddingResponse.json()

    const { error , data: pageSections } = await supabase.rpc(
      'match_page_sections',
      {
        embedding,
        match_threshold: 0.78,
        match_count: 10,
        min_content_length: 50,
      }
    )

    if (error) {
      throw new Error(error.message)
    }


		const prompt =
			'You are a modern digital assistant.'
		tokenCount += getTokens(prompt)

		if (tokenCount >= 4000) {
			throw new Error('Query too large')
		}

		const messages: ChatCompletionRequestMessage[] = [
			{ role: 'system', content: prompt },
			...reqMessages
		]

		const chatRequestOpts: CreateChatCompletionRequest = {
			model: 'gpt-3.5-turbo',
			messages,
			temperature: 0.9,
			stream: true
		}

		const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
			headers: {
				Authorization: `Bearer ${openAiKey}`,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(chatRequestOpts)
		})

		if (!chatResponse.ok) {
			const err = await chatResponse.json()
			throw new Error(err.error.message)
		}

		return new Response(chatResponse.body, {
			headers: {
				'Content-Type': 'text/event-stream'
			}
		})
	} catch (err) {
		console.error(err)
		return json({ error: 'There was an error processing your request' }, { status: 500 })
	}
}