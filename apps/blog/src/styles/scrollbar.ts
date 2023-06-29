import { css } from "styled-components"

export default css`
    body::-webkit-scrollbar {
        width: ${(props) => props.theme.theme.component.scrollbar.width};
    }

    body::-webkit-scrollbar-track {
        border-radius: ${(props) =>
            props.theme.theme.component.scrollbar.borderRadius};
        background: ${(props) =>
            props.theme.theme.component.scrollbar.color.track};
        box-shadow: inset 0 0 5px rgb(0 0 0 / 10%);
    }

    body::-webkit-scrollbar-thumb {
        border-radius: ${(props) =>
            props.theme.theme.component.scrollbar.borderRadius};
        background: ${(props) =>
            props.theme.theme.component.scrollbar.color.thumb};
        box-shadow: inset 0 0 10px rgb(0 0 0 / 20%);
    }
`
