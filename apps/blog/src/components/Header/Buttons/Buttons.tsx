import styled from "styled-components"

import ThemeToggleButton from "./ThemeToggleButton"
import SearchButton from "./SearchButton"

const RightButtons = styled.div`
    display: flex;
    height: 100%;
    margin-left: auto;
`

export default () => {
    return (
        <RightButtons>
            <ThemeToggleButton />
            <SearchButton />
        </RightButtons>
    )
}
