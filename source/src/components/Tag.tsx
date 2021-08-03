import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

import theming from "../theming"
import { faTag } from "@fortawesome/free-solid-svg-icons"

const StyledTag = styled.div`
	text-align: center;

	padding: 0 0.8rem 0.1rem 0.8rem;
	border-radius: 10px;

	background-color: ${theming.color.linkColor};
	color: white;
`

interface TagProps {
	text: string
}

export default class Tag extends React.Component<TagProps> {
	render() {
		return (
			<StyledTag>
				<FontAwesomeIcon icon={faTag} /> &nbsp;{this.props.text}
			</StyledTag>
		)
	}
}
