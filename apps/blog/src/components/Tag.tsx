import { MouseEvent } from "react"
import styled from "styled-components"

import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Tag = styled.div`
	text-align: center;

	margin-right: 0.8rem;
	border-radius: 10px;

	color: ${({ theme }) => theme.theme.color.text.gray};
`

interface Props {
	text: string
	onClick?: (event: MouseEvent<never>) => void
}

export default (props: Props) => {
	return (
		<Tag onClick={props.onClick || undefined}>
			<FontAwesomeIcon icon={faHashtag} /> &nbsp;{props.text}
		</Tag>
	)
}
