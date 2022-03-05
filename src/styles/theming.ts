/** theming.ts
 *	stores values that are used across
 *	It makes changing values easier
 */

import { css } from "styled-components"

// not declared in the export object so the export object can refer to it
function theme(
	currentTheme: string,
	values: { [key: string]: string | number }
) {
	return values[currentTheme]
}

const theming = {
	theme: theme,
	font: {
		regular: "'Noto Sans KR', sans-serif",
		code: "'Source Code Pro', monospace",
	},
	size: {
		x2_small: "3px",
		small: 0,
		medium: "1rem",
		large: 0,
		x_large: 0,
		screen_size1: "1000px",
		screen_size2: "1500px",
	},
	dark: {
		backgroundColor0: "#202225",
		backgroundColor1: "#36393F",
		backgroundColor2: "#2F3136",
		color0: "#FFFFFF",
		color1: "#EEEEEE",
		color2: "#CCC",
		linkColor: "#66AAFF",
	},
	light: {
		backgroundColor0: "#FFFFFF",
		backgroundColor1: "#F7F7F7",
		backgroundColor2: "#DDDDDD",
		color0: "#000000",
		color1: "#111111",
		color2: "#555",
		linkColor: "#4592F7",
	},
	styles: {
		hoverCard: css`
			:hover {
				cursor: pointer;

				box-shadow: ${(props) =>
					theme(props.theme.currentTheme, {
						light: "0 4px 10px rgb(0 0 0 / 25%)",
						dark: "0 4px 10px rgb(255 255 255 / 20%)",
					})};
			}
		`,
		navbarButtonStyle: css`
			/* style */

			display: flex;
			cursor: pointer;
			align-items: center;
			justify-content: center;

			/* size */

			height: 100%;
			min-width: 3rem;
			margin: 0;
			padding: 0 1rem 0 1rem;

			/* text */

			text-decoration: none;

			/* color */

			color: ${(props) =>
				theme(props.theme.currentTheme, {
					light: "black",
					dark: "#CFD0D0",
				})};
			background-color: ${(props) =>
				theme(props.theme.currentTheme, {
					light: "white",
					dark: "#202225",
				})};

			/* animation */

			transition: transform 0.1s linear;
			&:hover {
				background-color: ${(props) =>
					theme(props.theme.currentTheme, {
						light: "#EEEEEE",
						dark: "#36393F",
					})};
			}
		`,
	},
}

export default theming
