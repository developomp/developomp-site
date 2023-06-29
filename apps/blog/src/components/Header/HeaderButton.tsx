/**
 * @file Manages the configuration settings for the widget.
 */

import styled, { css } from "styled-components"

export const HeaderButtonCSS = css`
    /* style */

    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    /* size */

    height: 100%;
    min-width: 2.5rem;
    margin: 0;
    padding: 0 1rem 0 1rem;

    /* text */

    text-decoration: none;

    /* color */

    color: ${({ theme }) => theme.theme.color.text.default};
    background-color: ${({ theme }) =>
        theme.theme.component.ui.color.background.default};

    /* animation */

    transition: transform 0.1s linear;
    &:hover {
        background-color: ${({ theme }) =>
            theme.theme.component.ui.color.background.hover};
    }
`

export default styled.div`
    ${HeaderButtonCSS}
`
