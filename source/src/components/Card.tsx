import styled, { css } from "styled-components"

import theming from "../styles/theming"

export const cardCSS = css`
	margin: auto;
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "white",
			dark: "#2F3136",
		})};
	padding: 2rem;
	border-radius: 6px;
	box-shadow: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "0 4px 10px rgb(0 0 0 / 5%), 0 0 1px rgb(0 0 0 / 10%);",
			dark: "0 4px 10px rgb(0 0 0 / 30%), 0 0 1px rgb(0 0 0 / 30%);",
		})};

	@media screen and (max-width: ${theming.size.screen_size1}) {
		padding: 1rem;
	}
`

const Card = styled.div`
	${cardCSS}
`

export default Card
