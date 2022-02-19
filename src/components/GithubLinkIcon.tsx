import { ReactNode } from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

import theming from "../styles/theming"

const StyledGithubLink = styled.a<{ size?: string }>`
	font-size: ${(props) => props.size || "2.5rem"};

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "lightgrey",
			dark: "grey",
		})};

	:hover {
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.color0,
				dark: theming.dark.color0,
			})};
	}
`

interface GithubLinkIconProps {
	link: string
	size?: string
	children?: ReactNode
}

const GithubLinkIcon = (props: GithubLinkIconProps) => {
	return (
		<StyledGithubLink size={props.size} href={props.link} target="_blank">
			<FontAwesomeIcon icon={faGithub} />
			{props.children}
		</StyledGithubLink>
	)
}

export default GithubLinkIcon
