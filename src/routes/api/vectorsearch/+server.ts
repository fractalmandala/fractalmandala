import { VITE_OPENAI_API_KEY } from '$env/static/private'
import '$lib/utils/supabase'
import { getTokens } from '$lib/utils/tokenizer'
import type { CreateChatCompletionRequest, ChatCompletionRequestMessage } from 'openai'
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

export const config = {
	runtime: 'edge'
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		if (!VITE_OPENAI_API_KEY) {
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

    const sanitizedQuery = query.trim()
    const moderationResponse = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: sanitizedQuery,
      }),
    }).then((res) => res.json())

    const [results] = moderationResponse.results

    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: sanitizedQuery.replaceAll('\n', ' '),
      }),
    })	
    if (embeddingResponse.status !== 200) {
      throw new ApplicationError('Failed to create embedding for question', embeddingResponse)
    }

    const {
      data: [{ embedding }],
    } = await embeddingResponse.json()
    const { error: matchError, data: pageSections } = await supabaseClient.rpc(
      'match_page_sections',
      {
        embedding,
        match_threshold: 0.78,
        match_count: 10,
        min_content_length: 50,
      }
    )

    if (matchError) {
      throw new ApplicationError('Failed to match page sections', matchError)
    }
		
	}
}

