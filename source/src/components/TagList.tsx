import React from "react"
import styled from "styled-components"

const StyledTagList = styled.div`
	display: flex;
	flex-wrap: wrap;
	row-gap: 0.5rem;
	column-gap: 0.5rem;
	flex-direction: row;
	justify-content: center;
`

export default class TagList extends React.Component {
	render() {
		// eslint-disable-next-line react/prop-types
		return <StyledTagList>{this.props.children}</StyledTagList>
	}
}
