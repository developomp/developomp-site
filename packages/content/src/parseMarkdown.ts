import "katex/contrib/mhchem" // chemical formula, https://katex.org/docs/node.html#using-mhchem-extension

import remarkCalloutDirectives from "@microflash/remark-callout-directives"
import matter from "gray-matter"
import { JSDOM } from "jsdom"
import toc from "markdown-toc"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeColorChips from "rehype-color-chips"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import rehypeTitleFigure from "rehype-title-figure"
import remarkDirective from "remark-directive"
import remarkFlexibleMarkers from "remark-flexible-markers"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import supersub from "remark-supersub"
import { unified } from "unified"

import type { MarkdownData } from "./types/types"
import { ParseMode } from "./types/types"
import { nthIndex } from "./util"

const processor = unified() // interface for remark and rehype
    .use(remarkParse) // markdown to AST
    .use(remarkGfm, { singleTilde: false }) // https://github.com/remarkjs/remark-gfm
    .use(supersub) // https://github.com/Symbitic/remark-plugins/tree/master/packages/remark-supersub
    .use(remarkDirective) // https://github.com/remarkjs/remark-directive
    .use(remarkCalloutDirectives) // https://github.com/Microflash/remark-callout-directives
    .use(remarkMath) // https://github.com/remarkjs/remark-math
    .use(remarkFlexibleMarkers) // https://github.com/ipikuka/remark-flexible-markers
    .use(remarkFrontmatter, ["yaml", "toml"]) // https://github.com/remarkjs/remark-frontmatter
    .use(remarkRehype, { allowDangerousHtml: true }) // markdown to HTML
    .use(rehypeRaw) // https://github.com/rehypejs/rehype-raw
    .use(rehypeSlug) // https://github.com/rehypejs/rehype-slug
    .use(rehypeTitleFigure) // https://github.com/y-temp4/rehype-title-figure
    .use(rehypeAutolinkHeadings, { content: { type: "text", value: "#" } }) // https://github.com/rehypejs/rehype-autolink-headings
    .use(rehypeHighlight) // https://github.com/rehypejs/rehype-highlight
    .use(rehypeKatex) // math and formula and stuff
    .use(rehypeColorChips) // https://github.com/shreshthmohan/rehype-color-chips
    .use(rehypeStringify) // syntax tree (hast) to HTML

/**
 * parse the front matter if it exists
 *
 * @param {string} markdownRaw - raw unparsed text data of the markdown file
 * @param {string} path - filename of the markdown file
 * @param {ParseMode} mode
 */
export default async function parseMarkdown(
    markdownRaw: string,
    path: string,
    mode: ParseMode,
): Promise<MarkdownData> {
    const fileHasFrontMatter = markdownRaw.startsWith("---")

    const frontMatter = fileHasFrontMatter
        ? matter(markdownRaw.slice(0, nthIndex(markdownRaw, "---", 2) + 3)).data
        : {}

    if (fileHasFrontMatter) {
        if (mode != ParseMode.PORTFOLIO) {
            if (!frontMatter.title)
                throw Error(`Title is not defined in file: ${path}`)

            if (!frontMatter.date)
                throw Error(`Date is not defined in file: ${path}`)
        }

        if (mode === ParseMode.PORTFOLIO) {
            if (frontMatter.overview) {
                frontMatter.overview = String(
                    processor.processSync(frontMatter.overview),
                )
            }
        }
    }

    frontMatter.content = touchupHTML(
        String(processor.processSync(markdownRaw)),
    )

    return frontMatter as MarkdownData
}

function touchupHTML(html: string): string {
    const dom = new JSDOM(html)

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

    // add hr before footnotes
    dom.window.document.querySelectorAll(".footnotes").forEach((item) => {
        item.parentNode?.insertBefore(
            dom.window.document.createElement("hr"),
            item,
        )
    })

    // https://developer.chrome.com/docs/lighthouse/best-practices/external-anchors-use-rel-noopener/
    // https://github.com/cure53/DOMPurify/issues/317#issuecomment-698800327
    dom.window.document.querySelectorAll("a").forEach((item) => {
        if ("target" in item && item["target"] === "_blank")
            item.setAttribute("rel", "noopener")
    })

    return dom.window.document.documentElement.innerHTML
}

/**
 * Generate Table of Contents as a HTML string
 */
export async function generateToc(markdownRaw: string): Promise<string> {
    return String(processor.processSync(toc(markdownRaw).content))
}
