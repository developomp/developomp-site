import React from "react"
import styled from "styled-components"

import { faTag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import theming from "../theming"

const StyledTag = styled.div`
	text-align: center;

	padding: 0 0.8rem 0.1rem 0.8rem;
	border-radius: 10px;

	background-color: ${theming.color.linkColor};
	color: white;
`

interface Props {
	text: string
	onClick?: (event: React.MouseEvent<never>) => void
}

const Tag = (props: Props) => {
	return (
		<StyledTag onClick={props.onClick || undefined}>
			<FontAwesomeIcon icon={faTag} /> &nbsp;{props.text}
		</StyledTag>
	)
}

export default Tag
