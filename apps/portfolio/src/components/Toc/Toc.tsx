import "./style.scss"

import { styled } from "@linaria/react"
import { type FC, useState } from "react"
import { Collapse } from "react-collapse"

const StyledTocToggleButton = styled.button`
    cursor: pointer;
    border: none;
    text-align: left;
    background-color: rgba(0, 0, 0, 0);
    width: 100%;
    padding: 0.5rem;
`

const StyledCollapseContainer = styled.div`
    * {
        transition: height 200ms ease-out;
    }

    ul,
    ol {
        list-style: circle;
        padding-left: 2.5rem;
        list-style-position: inside;
    }
`

const Toc: FC<{ data?: string }> = (props) => {
    const [isTocOpened, setIsTocOpened] = useState(false)

    if (!props.data) return <></>

    return (
        <>
            <StyledTocToggleButton
                className="text-light-text-high-contrast dark:text-dark-text-high-contrast"
                onClick={() => {
                    setIsTocOpened((prev) => !prev)
                }}
            >
                <strong className="flex items-center justify-center gap-1 fill-light-text-high-contrast dark:fill-dark-text-high-contrast">
                    Table of Contents
                    {isTocOpened ? (
                        //  Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 320 512"
                        >
                            <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                        </svg>
                    ) : (
                        // Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 320 512"
                        >
                            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                        </svg>
                    )}
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
