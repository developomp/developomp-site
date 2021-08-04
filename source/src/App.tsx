import React from "react"
import { Switch, Route } from "react-router-dom"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { HelmetProvider } from "react-helmet-async"
import storage from "local-storage-fallback"
import { isIE } from "react-device-detect"

import "highlight.js/styles/github-dark-dimmed.css"
import "katex/dist/katex.min.css"

import theming from "./theming"

import Spinner from "./components/Spinner"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import PostList from "./pages/PostList"
import Search from "./pages/Search"
import Page from "./pages/Page"
import NotFound from "./pages/NotFound"

// Theme that will be used throughout the website
const GlobalStyle = createGlobalStyle<{ theme: { currentTheme: string } }>`
body {
	overflow-x: hidden;
	overflow-y: scroll;
}

html, body, #root {
	min-height: 100vh;
	margin: 0;
	display: flex;
	flex-flow: column;
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
	-moz-osx-font-smoothing: grayscale;
	text-rendering: optimizeLegibility;
}

body::-webkit-scrollbar {
	width: ${theming.size.x_small};
}

body::-webkit-scrollbar-track {
	border-radius: ${theming.size.x2_small};
    background: rgba(0,0,0,0.06);
    box-shadow: inset 0 0 5px rgb(0 0 0 / 10%);
}

body::-webkit-scrollbar-thumb {
	border-radius: ${theming.size.x2_small};
    background: rgba(0,0,0,0.1);
    box-shadow: inset 0 0 10px rgb(0 0 0 / 20%);
}

#content {
	display:inline-block;
	flex: 1 1 auto;
	margin-bottom: 3rem;
	margin-top: 3rem;
}

code {
	font-family: ${theming.font.code};
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color1,
			dark: theming.dark.color1,
		})};
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#eee",
			dark: "#555",
		})};
    border-radius: 3px;
    padding: 0 3px;
}

/* https://stackoverflow.com/a/48694906/12979111 */
pre > code {
    font-family: ${theming.font.code};
	color: #adbac7;
	background-color: #22272e;
    border: 1px solid #ddd;
    page-break-inside: avoid;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
}

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

.link-color a {
	text-decoration: none;
	color: ${theming.color.linkColor};

	&:visited {
		color: ${theming.color.linkColor};
	}
}

p {
	 line-height: 1.5rem;
}

blockquote {
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "rgba(0, 0, 0, 5%)",
			dark: "rgba(255, 255, 255, 3%)",
		})};
		
	border-left: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "0.4rem solid rgba(0, 0, 0, 10%)",
			dark: "0.4rem solid rgba(255, 255, 255, 5%)",
		})};
	padding-top: 0.1rem;
	padding-right: 1rem;
	padding-bottom: 0.1rem;
	padding-left: 1.5rem;

	@media screen and (max-width: ${theming.size.screen_size1}) {
		margin: 0.5rem;
	}
}

.card {
	margin: auto;
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "white",
			dark: "#2F3136",
		})};
	padding: 2rem;
	border-radius: 6px;
	box-shadow: 0 4px 10px rgb(0 0 0 / 5%), 0 0 1px rgb(0 0 0 / 10%);

	@media screen and (max-width: ${theming.size.screen_size1}) {
		padding: 1rem;
	}
}

.main-content {
	margin-top: 3rem;
	width: 50%;

	@media screen and (max-width: ${theming.size.screen_size1}) {
		width: auto;
		margin: 1rem;
		margin-top: 3rem;
	}
}

* {
	transition: color 0.1s linear;
}
`

const StyledP = styled.p`
	margin: auto;
	font-size: 2rem;
	margin-top: 2rem;
	text-align: center;
	font-family: ${theming.font.regular};
`

interface AppProps {}

interface AppState {
	isLoading: boolean
	currentTheme: string
	currentLanguage: string
}

export default class App extends React.Component<AppProps, AppState> {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: true,
			currentTheme: storage.getItem("theme") || "dark", // get theme from storage and set to "dark" mode if not set already
			currentLanguage: storage.getItem("lang") || "en", // get language from storage and set to "en" if not set already
		}
	}

	componentDidMount() {
		// show loading screen until all fonts are loaded.
		// Experimental feature. Not fully supported on all browsers (IE, I'm looking at you).
		// https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet

		// checks if document.fonts.onloadingdone is supported on the browser
		if (typeof document.fonts.onloadingdone != undefined) {
			document.fonts.onloadingdone = () => {
				this.setState({ isLoading: false })
			}
		} else {
			this.setState({ isLoading: false })
		}
	}

	componentDidUpdate(_, prevState) {
		if (this.state.currentTheme !== prevState.currentTheme) {
			// save theme when it is changed
			storage.setItem("theme", this.state.currentTheme)
		}

		if (this.state.currentLanguage !== prevState.currentLanguage) {
			// save language when it is changed
			storage.setItem("lang", this.state.currentLanguage)
		}
	}

	render() {
		if (isIE)
			return (
				<>
					<StyledP>
						<b>Internet Explorer</b> is not supported.
					</StyledP>
				</>
			)
		else
			return (
				<HelmetProvider>
					<ThemeProvider
						theme={{
							currentTheme: this.state.currentTheme,
							setTheme: (setThemeTo) =>
								this.setState({ currentTheme: setThemeTo }), // make setTheme function available in other components
						}}
					>
						<GlobalStyle />
						<Navbar />
						<div id="content">
							{this.state.isLoading ? (
								<Spinner size={200} />
							) : (
								<Switch>
									<Route exact path="/">
										<PostList howMany={4} title="Home" />
									</Route>

									<Route exact path="/search">
										<Search />
									</Route>

									<Route exact path="/404">
										<NotFound />
									</Route>

									<Route exact path="/:path*">
										{({ match }) => (
											<Page key={match.params.path} />
										)}
									</Route>
								</Switch>
							)}
						</div>
						<Footer />
					</ThemeProvider>
				</HelmetProvider>
			)
	}
}
