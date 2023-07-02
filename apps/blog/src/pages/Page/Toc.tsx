import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import storage from "local-storage-fallback"
import { useEffect, useState } from "react"
import { Collapse } from "react-collapse"
import styled from "styled-components"

const StyledTocToggleButton = styled.button`
    cursor: pointer;
    border: none;
    text-align: left;
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    padding: 0.5rem;
    color: ${({ theme }) => theme.theme.color.text.highContrast};
`

const StyledCollapseContainer = styled.div`
    * {
        transition: height 200ms ease-out;
    }
`

const Toc = (props: { data?: string }) => {
    const [isTocOpened, setIsTocOpened] = useState(
        storage.getItem("isTocOpened") == "true"
    )

    useEffect(() => {
        storage.setItem("isTocOpened", isTocOpened.toString())
    }, [isTocOpened])

    if (!props.data) return <></>

    return (
        <>
            <StyledTocToggleButton
                onClick={() => {
                    setIsTocOpened((prev) => !prev)
                }}
            >
                <strong>
                    Table of Contents
                    <FontAwesomeIcon
                        icon={isTocOpened ? faCaretUp : faCaretDown}
                    />
                </strong>
            </StyledTocToggleButton>
            <StyledCollapseContainer>
                <Collapse isOpened={isTocOpened}>
                    <div dangerouslySetInnerHTML={{ __html: props.data }} />
                </Collapse>
            </StyledCollapseContainer>
            <hr />
        </>
    )
}

export default Toc
