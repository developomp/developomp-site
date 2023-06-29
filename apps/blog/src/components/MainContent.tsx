import styled, { css } from "styled-components"

import Card from "./Card"

export const mainContentCSS = css`
    margin-top: 1rem;
    width: 50%;

    img {
        max-width: 100%;
    }

    table img {
        max-width: fit-content;
    }

    @media screen and (max-width: ${({ theme }) =>
            theme.theme.maxDisplayWidth.mobile}) {
        width: auto;
        margin: 1rem;
    }
`

const MainContent = styled(Card)`
    ${mainContentCSS}
`

export default MainContent
