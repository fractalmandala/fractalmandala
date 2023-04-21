import { join, resolve } from 'node:path'
import highlighter from './src/lib/utils/highlighter.js'

const __dirname = resolve()

const mdsvexconfig = {
		extensions: ['.svelte.md'],
		highlight: {
			highlighter,
		},
		layout: join(__dirname, './src/lib/components/MarkdownLayout.svelte'),
	};

export default mdsvexconfig

