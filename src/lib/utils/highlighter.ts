import { parse } from 'node-html-parser'
import { getHighlighter } from 'shiki'

const THEME = 'github-dark'

function escapeHTML(code: string): string {
	return code.replace(
		/[{}`]/g,
		(character: string) => ({ '{': '&lbrace;', '}': '&rbrace;', '`': '&grave;' }[character] || character),
	)
}

function rangeParser(rangeString: string): number[] {
	const result: number[] = []
	const ranges: string[] = rangeString.split(',')
	ranges.forEach((element: string) => {
		if (element.indexOf('-') === -1) {
			result.push(parseInt(element, 10))
			} else {
			const limits: string[] = element.split('-')
			const start: number = parseInt(limits[0], 10)
			const end: number = parseInt(limits[1], 10)
			for (let i = start; i <= end; i += 1) {
				result.push(i);
			}
		}
	})
	return result
}

function makeFocussable(html: string): string {
	const root = parse(html)
	const preElement = root.querySelector('pre')
	if (preElement) {
		preElement.setAttribute('tabIndex', '0')
	}
	return root.toString()
}

async function highlighter(code: string, lang: string, meta?: string): Promise<string> {
	const shikiHighlighter = await getHighlighter({
	theme: THEME,
	langs: ['javascript','typescript','html','css','sass','sql','shell','bash']
	})

	let html: string
	if (!meta) {
		html = shikiHighlighter.codeToHtml(code, {
			lang,
		})
	} else {
		const highlightMeta: string = /{([\d,-]+)}/.exec(meta)![1]
		const highlightLines: number[] = rangeParser(highlightMeta)

		html = shikiHighlighter.codeToHtml(code, {
			lang,
			lineOptions: highlightLines.map((element: number) => ({
				line: element,
				classes: ['highlight-line'],
			})),
		})
	}
	html = makeFocussable(html)
	return escapeHTML(html)
}

export default highlighter