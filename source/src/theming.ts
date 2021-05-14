/** theming.ts
 *	stores values that are used across
 *	It makes changing values easier
 */

import theme from "styled-theming"
import { css } from "styled-components"

export default {
	font: {
		regular: "'Noto Sans KR', sans-serif",
		code: "'Source Code Pro', monospace",
	},
	size: {
		x2_small: "3px",
		x_small: "8px",
		small: 0,
		medium: "14px",
		large: 0,
		x_large: 0,
		screen_size1: "950px",
	},
	color: {
		linkColor: "#3273dc",
	},
	dark: {
		backgroundColor0: "#202225",
		backgroundColor1: "#36393F",
		color0: "#FFFFFF",
		color1: "#EEEEEE",
	},
	light: {
		backgroundColor0: "#FFFFFF",
		backgroundColor1: "#F7F7F7",
		color0: "#000000",
		color1: "#111111",
	},
	styles: {
		navbarButtonStyle: css`
			cursor: pointer;
			font-size: 1em;
			border-radius: 0.5rem;
			float: left;
			padding: 14px 16px;
			text-decoration: none;
			margin: 0.1em;
			color: ${theme("mode", {
				light: "black",
				dark: "#CFD0D0",
			})};
			background-color: ${theme("mode", {
				light: "white",
				dark: "#202225",
			})};
			&:hover {
				background-color: ${theme("mode", {
					light: "lightgrey",
					dark: "#36393F",
				})};
			}
		`,
	},
}
