import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { FC, MouseEvent } from "react"
import styled from "styled-components"

const StyledTag = styled.div`
    text-align: center;

    margin-right: 0.8rem;
    border-radius: 10px;

    color: ${({ theme }) => theme.theme.color.text.gray};
`

interface Props {
    text: string
    onClick?: (event: MouseEvent<never>) => void
}

const Tag: FC<Props> = (props) => {
    return (
        <StyledTag onClick={props.onClick || undefined}>
            <FontAwesomeIcon icon={faHashtag} /> &nbsp;{props.text}
        </StyledTag>
    )
}

export default Tag
