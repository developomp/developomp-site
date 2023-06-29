import markdownIt from "markdown-it" // rendering markdown
import markdownItTexMath from "markdown-it-texmath" // rendering mathematical expression
import markdownItAnchor from "markdown-it-anchor" // markdown anchor
import markdownItTaskCheckbox from "markdown-it-task-checkbox" // a TODO list checkboxes
import markDownItMark from "markdown-it-mark" // text highlighting
import markdownItSub from "markdown-it-sub" // markdown subscript
import markdownItSup from "markdown-it-sup" // markdown superscript
import markdownItFootnote from "markdown-it-footnote" // markdown footnote

import highlightLines from "markdown-it-highlight-lines" // highlighting specific lines in code blocks

import slugify from "slugify"
import matter from "gray-matter"
import toc from "markdown-toc" // table of contents generation
import hljs from "highlight.js" // code block syntax highlighting
import katex from "katex" // rendering mathematical expression
import "katex/contrib/mhchem" // chemical formula

import { JSDOM } from "jsdom" // HTML DOM parsing

import { nthIndex } from "./util"
import { MarkdownData, ParseMode } from "./types/types"

const slugifyIt = (s: string) => slugify(s, { lower: true, strict: true })

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
        permalink: markdownItAnchor.permalink.ariaHidden({
            placement: "before",
            symbol: "#",
            renderHref: (s) => `#${slugifyIt(s)}`,
        }),
        slugify: slugifyIt,
    })
    .use(markdownItTaskCheckbox)
    .use(markDownItMark)
    .use(markdownItSub)
    .use(markdownItSup)
    .use(highlightLines)
    .use(markdownItFootnote)

/**
 * parse the front matter if it exists
 *
 * @param {string} markdownRaw - raw unparsed text data of the markdown file
 * @param {string} path - filename of the markdown file
 * @param {ParseMode} mode
 */
export default function parseMarkdown(
    markdownRaw: string,
    path: string,
    mode: ParseMode
): MarkdownData {
    const fileHasFrontMatter = markdownRaw.startsWith("---")

    const frontMatter = fileHasFrontMatter
        ? matter(markdownRaw.slice(0, nthIndex(markdownRaw, "---", 2) + 3)).data
        : {}

    if (fileHasFrontMatter) {
        if (mode != ParseMode.PORTFOLIO) {
            if (!frontMatter.title)
                throw Error(`Title is not defined in file: ${path}`)

            if (mode != ParseMode.UNSEARCHABLE && !frontMatter.date)
                throw Error(`Date is not defined in file: ${path}`)
        }

        if (mode === ParseMode.PORTFOLIO) {
            if (frontMatter.overview) {
                frontMatter.overview = md.render(frontMatter.overview)
            }
        }
    }

    //
    // work with rendered DOM
    //

    const dom = new JSDOM(
        md.render(
            fileHasFrontMatter
                ? markdownRaw.slice(nthIndex(markdownRaw, "---", 2) + 3)
                : markdownRaw
        ) || ""
    )

    // add .hljs class to all block codes

    dom.window.document.querySelectorAll("pre > code").forEach((item) => {
        item.classList.add("hljs")
    })

    // add parent div to tables (horizontally scroll table on small displays)

    dom.window.document.querySelectorAll("table").forEach((item) => {
        // `element` is the element you want to wrap
        const parent = item.parentNode
        if (!parent) return // stop if table doesn't have a parent node
        const wrapper = dom.window.document.createElement("div")
        wrapper.style.overflowX = "auto"

        parent.replaceChild(wrapper, item)
        wrapper.appendChild(item)
    })

    frontMatter.content = dom.window.document.documentElement.innerHTML

    return frontMatter as MarkdownData
}

export function generateToc(markdownRaw: string): string {
    return md.render(toc(markdownRaw).content, {
        slugify: slugifyIt,
    })
}
