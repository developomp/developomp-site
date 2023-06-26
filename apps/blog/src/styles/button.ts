import { css } from "styled-components"

export default css`
	/* style */

	display: flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	border: none;
	border-radius: 0.5rem;

	/* size */

	height: 3rem;
	min-width: 2.5rem;
	margin: 0;
	padding: 0 1rem 0 1rem;

	/* text */

	text-decoration: none;

	/* color */

	color: ${({ theme }) => theme.theme.color.text.default};
	background-color: ${({ theme }) =>
		theme.theme.component.ui.color.background.default};
	&:hover {
		background-color: ${({ theme }) =>
			theme.theme.component.ui.color.background.hover};
	}

	/* animation */

	transition: transform 0.1s linear;
`
