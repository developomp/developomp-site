import { MouseEvent } from "react"
import styled from "styled-components"

import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import theming from "../styles/theming"

const StyledTag = styled.div`
	text-align: center;

	padding: 0 0.8rem 0.1rem 0.8rem;
	border-radius: 10px;

	background-color: ${theming.color.linkColor};
	color: white;
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
