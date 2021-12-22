import { createGlobalStyle, css } from "styled-components"

import codeblockLightCSS from "./codeblock-light"
import codeblockDarkCSS from "./codeblock-dark"

import "katex/dist/katex.min.css"

import theming from "./theming"

const scrollbarCSS = css`
	body::-webkit-scrollbar {
		width: ${theming.size.x_small};
	}

	body::-webkit-scrollbar-track {
		border-radius: ${theming.size.x2_small};
		background: rgba(0, 0, 0, 0.06);
		box-shadow: inset 0 0 5px rgb(0 0 0 / 10%);
	}

	body::-webkit-scrollbar-thumb {
		border-radius: ${theming.size.x2_small};
		background: rgba(0, 0, 0, 0.1);
		box-shadow: inset 0 0 10px rgb(0 0 0 / 20%);
	}
`

const codeCSS = css`
	${(props) => {
		switch (props.theme.currentTheme) {
			case "dark":
				return codeblockDarkCSS
			case "light":
				return codeblockLightCSS
			default:
				return codeblockDarkCSS
		}
	}}

	:not(pre) > code {
		font-family: ${theming.font.code};
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.color1,
				dark: theming.dark.color1,
			})};
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "#eee",
				dark: "#444", // I hope no hardcore christian finds this code
			})};
		border: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "1px solid #BBB",
				dark: "1px solid #666", // especially this
			})};
		border-radius: 3px;
		padding: 0 3px;
	}

	/* https://stackoverflow.com/a/48694906/12979111 */
	pre > code {
		font-family: ${theming.font.code};
		border: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "1px solid #BBB",
				dark: "1px solid #555",
			})};
	}

	/* // todo: fix highlight not working properly when scrolled horizontally // */
	.highlighted-line {
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "#dddddd",
				dark: "#14161a",
			})};

		display: block;
		margin: 0 -1rem;
		padding: 0 1rem;
	}
`

const kbdCSS = css`
	/* https://www.rgagnon.com/jsdetails/js-nice-effect-the-KBD-tag.html */
	kbd {
		margin: 0px 0.1em;
		padding: 0.1em 0.6em;
		border-radius: 3px;
		border: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "1px solid #CCCCCC",
				dark: "1px solid #555555",
			})};
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "#333333",
				dark: "white",
			})};
		line-height: 1.4;
		font-size: 13.5px;
		display: inline-block;
		box-shadow: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "0px 1px 0px rgba(0,0,0,0.2), inset 0px 0px 0px 2px white",
				dark: "0px 1px 0px rgba(255,255,255,0.3), inset 0px 0px 0px 2px black",
			})};
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "#F7F7F7",
				dark: "black",
			})};
	}
`

const tableCSS = css`
	table {
		border-collapse: collapse;
		width: 100%;
	}

	table td,
	table th {
		border: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "1px solid #ddd",
				dark: "1px solid #777777",
			})};
		padding: 8px;
	}

	table tr:nth-child(even) {
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "#f2f2f2",
				dark: "#21272E",
			})};
	}
`

const blockquoteCSS = css`
	blockquote {
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "rgba(0, 0, 0, 5%)",
				dark: "rgba(255, 255, 255, 7%)",
			})};
		border-left: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "0.4rem solid rgba(0, 0, 0, 10%)",
				dark: "0.4rem solid rgba(255, 255, 255, 30%)",
			})};
		padding-top: 0.1rem;
		padding-right: 1rem;
		padding-bottom: 0.1rem;
		padding-left: 1.5rem;

		@media screen and (max-width: ${theming.size.screen_size1}) {
			margin: 0.5rem;
		}
	}
`

const headerCSS = css`
	/* intentionally left out h1 */

	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 2.5rem;
	}
`

const markCSS = css`
	mark {
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "rgba(255, 255, 0, 75%)",
				dark: "rgba(255, 255, 0, 50%)",
			})};
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "black",
				dark: "white",
			})};
	}
`

const katexCSS = css`
	// prevent overflowing on small displays
	.katex-html {
		overflow: auto;
		padding: 0.5rem;
	}
`

// Theme that will be used throughout the website
// wrapping it using css because prettier extension does not work well with styled-components
// https://github.com/styled-components/vscode-styled-components/issues/175
const globalStyle = css`
	${scrollbarCSS}
	${codeCSS}
	${kbdCSS}
	${tableCSS}
	${blockquoteCSS}
	${headerCSS}
	${markCSS}
	${katexCSS}
	
	body {
		overflow-x: hidden;
		overflow-y: scroll;
	}

	html,
	body,
	#root {
		min-height: 100vh;
		margin: 0;
		display: flex;
		flex-flow: column;
		line-height: 1.75rem;
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.backgroundColor1,
				dark: theming.dark.backgroundColor1,
			})};
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.color1,
				dark: theming.dark.color1,
			})};
		font-size: ${theming.size.medium};
		font-family: ${theming.font.regular};
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
	}

	a {
		text-decoration: none;
		color: ${theming.color.linkColor};
	}

	// header anchor offset to compensate for navbar
	:target:before {
		content: "";
		display: block;
		height: 4rem;
		margin: 4rem 0 0;
	}

	hr {
		border: 0;
		border-bottom: 1px solid;
	}

	* {
		transition: color 0.1s linear;
		scroll-behavior: smooth;
	}
`

export default createGlobalStyle`
	${globalStyle}
`
