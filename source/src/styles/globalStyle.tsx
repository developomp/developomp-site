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
		padding: 1em 1.5em;
		overflow: auto;
		display: block;
		word-wrap: break-word;
		page-break-inside: avoid;

		/* improve code readability */

		font-size: 1.08rem;
		line-height: 1.6;
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
		font-size: 10px;
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
		text-shadow: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "0 1px 0 white",
				dark: "0 1px 0 black",
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

const whiteLinkCSS = css`
	.white-link a {
		text-decoration: none;
		color: ${theming.color.linkColor};

		&:visited {
			color: ${theming.color.linkColor};
		}
	}
`

const cardCSS = css`
	.card {
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
	}
`

const mainContentCSS = css`
	.main-content {
		margin-top: 3rem;
		width: 50%;

		@media screen and (max-width: ${theming.size.screen_size1}) {
			width: auto;
			margin: 1rem;
			margin-top: 3rem;
		}
	}
`

const globalStyle = css`
	${scrollbarCSS}
	${codeCSS}
	${kbdCSS}
	${tableCSS}
	${blockquoteCSS}
	${whiteLinkCSS}
	${cardCSS}
	${mainContentCSS}

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
		line-height: 1.5rem;
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

	* {
		transition: color 0.1s linear;
	}
`

export default createGlobalStyle`
	${globalStyle}
`
