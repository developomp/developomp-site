import { ReactNode } from "react"
import styled from "styled-components"

const StyledTagList = styled.div<{ direction: string }>`
	display: flex;
	flex-wrap: wrap;
	row-gap: 0.5rem;
	column-gap: 0.5rem;
	flex-direction: row;
	justify-content: ${({ direction }) => direction};
`

interface Props {
	direction?: string
	children?: ReactNode | undefined
}

const TagList = (props: Props) => {
	return (
		<StyledTagList direction={props.direction || "center"}>
			{props.children}
		</StyledTagList>
	)
}

export default TagList
