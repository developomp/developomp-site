import markdownIt from "markdown-it" // rendering markdown
import markdownItTexMath from "markdown-it-texmath" // rendering mathematical expression
import markdownItAnchor from "markdown-it-anchor" // markdown anchor
import markdownItTaskCheckbox from "markdown-it-task-checkbox" // a TODO list checkboxes
import markDownItMark from "markdown-it-mark" // text highlighting
import markdownItSub from "markdown-it-sub" // markdown subscript
import markdownItSup from "markdown-it-sup" // markdown superscript
import markdownItFootnote from "markdown-it-footnote" // markdown footnote

import highlightLines from "markdown-it-highlight-lines" // highlighting specific lines in code blocks

import matter from "gray-matter"
import toc from "markdown-toc" // table of contents generation
import hljs from "highlight.js" // code block syntax highlighting
import katex from "katex" // rendering mathematical expression
import "katex/contrib/mhchem" // chemical formula

import { JSDOM } from "jsdom" // HTML DOM parsing

import { nthIndex } from "./util"
import { MarkdownData, ParseMode } from "../types/types"

const md = markdownIt({
	// https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md
	highlight: (str, lang) => {
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
	.use(markdownItFootnote)

export default function parseMarkdown(markdownRaw: string): string {
	return (
		// todo: accurately calculate start and end of front matter
		md.render(markdownRaw.slice(nthIndex(markdownRaw, "---", 2) + 3)) || ""
	)
}

export function generateToc(markdownRaw: string): string {
	return md.render(toc(markdownRaw).content)
}

/**
 * parse the front matter if it exists
 *
 * @param {string} markdownRaw - raw unparsed text data of the markdown file
 * @param {string} path - filename of the markdown file
 * @param {ParseMode} mode
 */
export function parseFrontMatter(
	markdownRaw: string,
	path: string,
	mode: ParseMode
): MarkdownData {
	// todo: accurately calculate start and end of front matter
	const frontMatter = matter(
		markdownRaw.slice(0, nthIndex(markdownRaw, "---", 2) + 3)
	).data

	if (mode != ParseMode.PORTFOLIO) {
		if (!frontMatter.title) throw Error(`Title is not defined in file: ${path}`)

		if (mode != ParseMode.UNSEARCHABLE && !frontMatter.date)
			throw Error(`Date is not defined in file: ${path}`)
	}

	const dom = new JSDOM(parseMarkdown(markdownRaw))

	// add .hljs class to all block codes
	dom.window.document.querySelectorAll("pre > code").forEach((item) => {
		item.classList.add("hljs")
	})

	frontMatter.content = dom.window.document.documentElement.innerHTML

	return frontMatter as MarkdownData
}
