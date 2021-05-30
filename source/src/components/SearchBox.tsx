import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import theming from "../theming"

const StyledSearchBoxContainer = styled.div`
	display: flex;
	justify-content: left;
	margin: 0.5rem;
	align-items: center;
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "whitesmoke",
			dark: "#2F3136",
		})};
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "black",
			dark: "#CFD0D0",
		})};

	&:hover {
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "#eeeeee",
				dark: "#36393F",
			})};
	}
`

const StyledSearchBox = styled.input`
	width: 80%;
	border: none;
	border-right: 1rem;
	outline: none;
	padding: 10px 10px;
	text-decoration: none;
	background-color: inherit;
	color: inherit;
`

const StyledSearchButton = styled(FontAwesomeIcon)`
	cursor: pointer;
`

export default class Navbar extends React.Component {
	render() {
		return (
			<StyledSearchBoxContainer>
				<StyledSearchBox
					type="text"
					name="search"
					placeholder="Search"
				/>
				<StyledSearchButton icon={faSearch} />
			</StyledSearchBoxContainer>
		)
	}
}
