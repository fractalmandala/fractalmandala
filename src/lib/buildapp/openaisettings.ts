export enum OpenAiModel {
	Gpt35Turbo = 'gpt-3.5-turbo',
	Gpt4 = 'gpt-4',
	Gpt432k = 'gpt-4-32k'
}

export interface OpenAiSettings {
	model: OpenAiModel;
	max_tokens: number; // just for completions
	temperature: number; // 0-2
	top_p: number; // 0-1
	stop?: string | string[]; // max 4 entries in array
}

export const defaultOpenAiSettings: OpenAiSettings = {
	model: OpenAiModel.Gpt35Turbo,
	max_tokens: 2048,
	temperature: 1,
	top_p: 1
};

export interface OpenAiModelStats {
	maxTokens: number; // total length (prompts + completion)
	// $ per 1k tokens, see https://openai.com/pricing:
	costPrompt: number;
	costCompletion: number;
};

export const models: { [key in OpenAiModel]: OpenAiModelStats } = {
	'gpt-3.5-turbo': {
		maxTokens: 4096,
		costPrompt: 0.002,
		costCompletion: 0.002
	},
	'gpt-4': {
		maxTokens: 8192,
		costPrompt: 0.03,
		costCompletion: 0.06
	},
	'gpt-4-32k': {
		maxTokens: 32768,
		costPrompt: 0.06,
		costCompletion: 0.12
	}
};