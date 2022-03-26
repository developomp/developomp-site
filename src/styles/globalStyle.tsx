import { createGlobalStyle, css } from "styled-components"

import codeblockLightCSS from "./codeblock-light"
import codeblockDarkCSS from "./codeblock-dark"

import "katex/dist/katex.min.css"

import theming from "./theming"

const anchorCSS = css`
	a {
		text-decoration: none;

		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.linkColor,
				dark: theming.dark.linkColor,
			})};

		&:hover {
			color: ${(props) =>
				theming.theme(props.theme.currentTheme, {
					light: theming.dark.linkColor,
					dark: theming.light.linkColor,
				})};
		}
	}

	/* The "#" thingy used beside headers */
	a.header-anchor {
		/* compensate for navbar height*/
		display: inline-block;
		margin-top: 4.5rem;

		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "lightgray",
				dark: "lightslategray",
			})};
	}

	/* footnote anchors */
	a[id^="fnref"] {
		display: inline;
		padding-top: 4.5rem;
	}
`

const scrollbarCSS = css`
	body::-webkit-scrollbar {
		width: 8px;
	}

	body::-webkit-scrollbar-track {
		border-radius: ${theming.size.x2_small};

		background: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.backgroundColor0,
				dark: theming.dark.backgroundColor0,
			})};
		box-shadow: inset 0 0 5px rgb(0 0 0 / 10%);
	}

	body::-webkit-scrollbar-thumb {
		border-radius: ${theming.size.x2_small};
		background: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.backgroundColor2,
				dark: "#888888",
			})};
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

	/* line code */
	:not(pre) > code {
		font-family: ${theming.font.code};
		word-wrap: break-word;
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

	/* code block */
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
		min-width: min-content;
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
		border-spacing: 0;
		width: 100%;

		td,
		th {
			padding: 8px;
			border: ${(props) =>
				theming.theme(props.theme.currentTheme, {
					light: "1px solid #ddd",
					dark: "1px solid #777777",
				})};
		}

		/* table alternating color */
		tr:nth-child(even) {
			background-color: ${(props) =>
				theming.theme(props.theme.currentTheme, {
					light: "#f2f2f2",
					dark: "#21272E",
				})};
		}
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

const hrCSS = css`
	hr {
		border: 0;
		border-bottom: 1px solid;
	}
`

const headerCSS = css`
	/* intentionally left out h1 */
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: -2rem;
		margin-bottom: 0.5rem;
		font-weight: 700;
	}

	h1 {
		font-size: 2.5rem;
	}
	h2 {
		font-size: 1.5rem;
	}
	h3 {
		font-size: 1rem;
		text-indent: 0.5rem;
	}
	h4 {
		font-size: 1rem;
		text-indent: 1rem;
	}
	h5 {
		font-size: 1rem;
		text-indent: 1.5rem;
	}
	h6 {
		font-size: 1rem;
		text-indent: 2rem;
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

const globalCSS = css`
	body {
		overflow-x: hidden;
		overflow-y: scroll;
	}

	html,
	body,
	#root {
		/* size */

		min-height: 100vh;
		margin: 0;

		/* style */

		display: flex;
		flex-flow: column;

		/* text */

		line-height: 2rem;
		font-size: ${theming.size.medium};
		font-family: ${theming.font.regular};
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;

		/* color */

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
	}

	* {
		transition: color 0.1s linear;
		scroll-behavior: smooth;
	}
`

/**
 * Theme that will be used throughout the website
 * prettier extension does not work here
 * see https://github.com/styled-components/vscode-styled-components/issues/175
 */
export default createGlobalStyle`
	${anchorCSS}
	${scrollbarCSS}
	${codeCSS}
	${kbdCSS}
	${tableCSS}
	${blockquoteCSS}
	${hrCSS}
	${headerCSS}
	${markCSS}
	${katexCSS}
	${globalCSS}
`
