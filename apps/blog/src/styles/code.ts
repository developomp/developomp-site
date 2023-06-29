import { css } from "styled-components"

export default css`
    /* highlight.js code style */
    ${({ theme }) => theme.theme.component.code.block.style}

    /* inline code */
	:not(pre) > code {
        font-family: ${({ theme }) => theme.theme.font.monospace};
        word-wrap: break-word;
        color: ${({ theme }) => theme.theme.component.code.inline.color.text};
        background-color: ${({ theme }) =>
            theme.theme.component.code.inline.color.background};
        border: 1px solid
            ${({ theme }) => theme.theme.component.code.inline.color.border};
        border-radius: 3px;
        padding: 0 3px;
    }

    /* code block */
    pre > code {
        font-family: ${(props) => props.theme.theme.font.monospace};
        border: 1px solid
            ${({ theme }) => theme.theme.component.code.block.color.border};
    }

    /* // todo: fix highlight not working properly when scrolled horizontally // */
    .highlighted-line {
        background-color: ${({ theme }) =>
            theme.theme.component.code.block.color.highlight};

        display: block;
        min-width: min-content;
        margin: 0 -1rem;
        padding: 0 1rem;
    }
`
