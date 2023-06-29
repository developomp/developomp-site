import { css } from "styled-components"

export default css`
    blockquote {
        background-color: ${({ theme }) =>
            theme.theme.component.blockQuote.color.background};
        border-left: 0.4rem solid
            ${({ theme }) => theme.theme.component.blockQuote.color.borderLeft};
        padding-top: 0.1rem;
        padding-right: 1rem;
        padding-bottom: 0.1rem;
        padding-left: 1.5rem;

        @media screen and (max-width: ${({ theme }) =>
                theme.theme.maxDisplayWidth.mobile}) {
            margin: 0.5rem;
        }
    }
`
