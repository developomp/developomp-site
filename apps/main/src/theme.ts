import { css } from "@emotion/css"

export const SocialProfile = css`
    * {
        color: #888888;
        transition: color 0.15s ease-out;
    }

    svg {
        width: 2.5rem;
    }

    &:hover {
        * {
            color: #ffffff;
        }
    }
`
