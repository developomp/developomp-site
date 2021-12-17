import markdownIt from "markdown-it" // rendering markdown
import markdownItTexMath from "markdown-it-texmath" // rendering mathematical expression
import markdownItAnchor from "markdown-it-anchor" // markdown anchor
import hljs from "highlight.js" // code block highlighting
import katex from "katex" // rendering mathematical expression
import { nthIndex } from "./util"

const md = markdownIt({
	// https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value
				// eslint-disable-next-line no-empty
			} catch (error) {}
		}

		return "" // use external default escaping
	},
	html: true,
})
	.use(markdownItTexMath, {
		engine: katex,
		delimiters: "dollars",
		katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
	})
	.use(markdownItAnchor, {})

export function parseMarkdown(markdownRaw: string): string {
	return (
		md.render(markdownRaw.slice(nthIndex(markdownRaw, "---", 2) + 3)) || ""
	)
}
