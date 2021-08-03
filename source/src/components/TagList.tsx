import React from "react"
import styled from "styled-components"

const StyledTagList = styled.div<{ direction: string }>`
	display: flex;
	flex-wrap: wrap;
	row-gap: 0.5rem;
	column-gap: 0.5rem;
	flex-direction: row;
	justify-content: ${({ direction }) => direction};
`

interface TagListProps {
	direction?: string
}

export default class TagList extends React.Component<TagListProps> {
	render() {
		return (
			<StyledTagList direction={this.props.direction || "center"}>
				{this.props.children}
			</StyledTagList>
		)
	}
}
