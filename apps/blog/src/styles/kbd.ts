import { css } from "styled-components"

export default css`
    /* https://www.rgagnon.com/jsdetails/js-nice-effect-the-KBD-tag.html */
    kbd {
        margin: 0px 0.1em;
        padding: 0.1em 0.6em;
        border-radius: 3px;
        border: 1px solid
            ${({ theme }) => theme.theme.component.kbd.color.border};
        color: ${({ theme }) => theme.theme.component.kbd.color.text};
        line-height: 1.4;
        font-size: 13.5px;
        display: inline-block;
        box-shadow: 0px 1px 0px
                ${({ theme }) => theme.theme.component.kbd.color.outerShadow},
            inset 0px 0px 0px 2px
                ${({ theme }) => theme.theme.component.kbd.color.innerShadow};
        background-color: ${({ theme }) =>
            theme.theme.component.kbd.color.background};
    }
`
