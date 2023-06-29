import styled from "styled-components"
import { useTitle, useMeta } from "hoofd"

import MainContent from "../components/MainContent"

const StyledNotFound = styled(MainContent)`
    text-align: center;
`

const Styled404 = styled.h1`
    font-size: 5rem;
`

const NotFound = () => {
    useTitle("404")
    useMeta({ property: "og:title", content: "Page Not Found" })

    return (
        <>
            <StyledNotFound>
                <Styled404>404</Styled404>
                <br />
                Page was not found :(
            </StyledNotFound>
        </>
    )
}

export default NotFound
