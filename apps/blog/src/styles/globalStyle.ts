import "katex/dist/katex.min.css"

import { createGlobalStyle, css } from "styled-components"

import anchorCSS from "./anchor"
import blockquoteCSS from "./blockQuote"
import checkbox from "./checkbox"
import codeCSS from "./code"
import headerCSS from "./header"
import hrCSS from "./hr"
import katexCSS from "./katex"
import kbdCSS from "./kbd"
import markCSS from "./mark"
import scrollbarCSS from "./scrollbar"
import tableCSS from "./table"

const globalCSS = css`
    body {
        overflow-x: hidden;
        overflow-y: scroll;
    }

    html,
    body,
    #root {
        /* size */

        min-height: 100vh;
        margin: 0;

        /* style */

        display: flex;
        flex-flow: column;

        /* text */

        line-height: 2rem;
        font-size: 1rem;
        font-family: ${({ theme }) => theme.theme.font.sansSerif};
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;

        /* color */

        background-color: ${({ theme }) => theme.theme.color.background};
        color: ${({ theme }) => theme.theme.color.text.default};
    }

    * {
        transition: color 0.1s linear;
        scroll-behavior: smooth;
        scroll-margin: 4rem;
    }
`

/**
 * Theme that will be used throughout the website
 * prettier extension does not work here
 * see https://github.com/styled-components/vscode-styled-components/issues/175
 */
export default createGlobalStyle`
	${anchorCSS}
	${scrollbarCSS}
	${checkbox}
	${codeCSS}
	${kbdCSS}
	${tableCSS}
	${blockquoteCSS}
	${hrCSS}
	${headerCSS}
	${markCSS}
	${katexCSS}
	${globalCSS}
`
