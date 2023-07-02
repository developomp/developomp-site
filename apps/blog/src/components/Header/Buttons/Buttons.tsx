import { type FC } from "react"
import styled from "styled-components"

import SearchButton from "./SearchButton"
import ThemeToggleButton from "./ThemeToggleButton"

const RightButtons = styled.div`
    display: flex;
    height: 100%;
    margin-left: auto;
`

const Buttons: FC = () => {
    return (
        <RightButtons>
            <ThemeToggleButton />
            <SearchButton />
        </RightButtons>
    )
}

export default Buttons
