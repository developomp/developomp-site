import { css } from "styled-components"

export default css`
    a {
        text-decoration: none;

        color: ${(props) => props.theme.theme.component.anchor.color.default};

        &:hover {
            color: ${(props) => props.theme.theme.component.anchor.color.hover};
        }

        &:active {
            color: ${(props) =>
                props.theme.theme.component.anchor.color.active};
        }
    }

    /* The "#" thingy used beside headers */
    a.header-anchor {
        /* compensate for navbar height*/
        display: inline-block;

        color: ${(props) => props.theme.theme.component.anchor.color.header};
    }

    /* footnote anchors */
    a[id^="fnref"] {
        display: inline;
    }
`
