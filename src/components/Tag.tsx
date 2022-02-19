import { MouseEvent } from "react"
import styled from "styled-components"

import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import theming from "../styles/theming"

const StyledTag = styled.div`
	text-align: center;

	margin-right: 0.8rem;
	border-radius: 10px;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color2,
			dark: theming.dark.color2,
		})};
`

interface Props {
	text: string
	onClick?: (event: MouseEvent<never>) => void
}

const Tag = (props: Props) => {
	return (
		<StyledTag onClick={props.onClick || undefined}>
			<FontAwesomeIcon icon={faHashtag} /> &nbsp;{props.text}
		</StyledTag>
	)
}

export default Tag
