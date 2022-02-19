import styled from "styled-components"

import theming from "../../styles/theming"

const StyledSearchBar = styled.input`
	width: 100%;
	border-radius: 100px; /* arbitrarily large value */
	height: 2.5rem;
	text-align: center;
	font-size: 1.2rem;
	outline: none;

	border: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "1px solid #ccc",
			dark: "1px solid #555",
		})};

	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.dark.color1,
			dark: theming.dark.backgroundColor1,
		})};

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color1,
			dark: theming.dark.color1,
		})};
`

export default StyledSearchBar
