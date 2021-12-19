import markdownIt from "markdown-it" // rendering markdown
import markdownItTexMath from "markdown-it-texmath" // rendering mathematical expression
import markdownItAnchor from "markdown-it-anchor" // markdown anchor
import markdownItTaskCheckbox from "markdown-it-task-checkbox" // a TODO list checkboxes
import markDownItMark from "markdown-it-mark" // text highlighting
import markdownItSub from "markdown-it-sub" // markdown subscript
import markdownItSup from "markdown-it-sup" // markdown superscript
import highlightLines from "markdown-it-highlight-lines" // highlighting specific lines in code blocks

import toc from "markdown-toc" // table of contents generation
import hljs from "highlight.js" // code block syntax highlighting
import katex from "katex" // rendering mathematical expression
import "katex/contrib/mhchem" // chemical formula

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
	})
	.use(markdownItAnchor, {
		permalink: true,
		permalinkBefore: true,
		permalinkSymbol: "#",
	})
	.use(markdownItTaskCheckbox)
	.use(markDownItMark)
	.use(markdownItSub)
	.use(markdownItSup)
	.use(highlightLines)

export default function parseMarkdown(markdownRaw: string): string {
	return (
		md.render(markdownRaw.slice(nthIndex(markdownRaw, "---", 2) + 3)) || ""
	)
}

export function generateToc(markdownRaw: string): string {
	return md.render(toc(markdownRaw).content)
}
