import styled, { css } from "styled-components"

export const cardCSS = css`
	margin: auto;
	background-color: ${({ theme }) =>
		theme.currentTheme ? theme.theme.component.card.color.background : "white"};
	padding: 2rem;
	border-radius: 6px;
	box-shadow: ${({ theme }) =>
		theme.currentTheme === "dark"
			? "0 4px 10px rgb(0 0 0 / 30%), 0 0 1px rgb(0 0 0 / 30%)"
			: "0 4px 10px rgb(0 0 0 / 5%), 0 0 1px rgb(0 0 0 / 10%)"};

	@media screen and (max-width: ${({ theme }) =>
			theme.theme.maxDisplayWidth.mobile}) {
		padding: 1rem;
	}
`

export default styled.div`
	${cardCSS}
`
