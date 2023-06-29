import { ReactNode } from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

const StyledGithubLink = styled.a<{ size?: string }>`
    font-size: ${(props) => props.size || "2.5rem"};
    color: ${({ theme }) =>
        theme.currentTheme === "dark" ? "grey" : "lightgrey"};

    :hover {
        color: ${({ theme }) => theme.theme.color.text.highContrast};
    }
`

interface Props {
    link: string
    size?: string
    children?: ReactNode
}

export default ({ link, size, children }: Props) => {
    return (
        <StyledGithubLink
            aria-label="GitHub repository"
            size={size}
            href={link}
            target="_blank"
        >
            <FontAwesomeIcon icon={faGithub} />
            {children}
        </StyledGithubLink>
    )
}
