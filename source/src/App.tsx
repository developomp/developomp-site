import React from "react"
import { Switch, Route } from "react-router-dom"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { HelmetProvider } from "react-helmet-async"
import storage from "local-storage-fallback"

import theming from "./theming"
import { LanguageContext } from "./LangaugeContext"

import Spinner from "./components/Spinner"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import PostList from "./pages/postList"
import Page from "./pages/page"
import NotFound from "./pages/notfound"
import Portfolio from "./pages/portfolio"

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
}

code {
	font-family: ${theming.font.code};
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
	background-color: rgba(0, 0, 0, 5%);
	border-left: 0.4rem solid rgba(0, 0, 0, 10%);
	padding-top: 0.1rem;
	padding-right: 1rem;
	padding-bottom: 0.1rem;
	padding-left: 1.5rem;
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
		& {
			width: 100%;
		}
	}
}

.main-content {
	margin-top: 3rem;
	width: 50%;

	@media screen and (max-width: ${theming.size.screen_size1}) {
		& {
			width: 70%;
		}
	}
}

* {
	transition: color 0.1s linear;
}
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
		return (
			<HelmetProvider>
				<ThemeProvider
					theme={{
						currentTheme: this.state.currentTheme,
						setTheme: (setThemeTo) =>
							this.setState({ currentTheme: setThemeTo }), // make setTheme function available in other components
					}}
				>
					<LanguageContext.Provider
						value={{
							language: this.state.currentLanguage,
							toggleLanguage: () => {
								// cycle through languages
								let setLanguageTo = "en"
								if (this.state.currentLanguage == "en")
									setLanguageTo = "kr"
								this.setState({
									currentLanguage: setLanguageTo,
								})
							},
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
										<PostList
											key="home"
											howMany={4}
											title="Home"
										/>
									</Route>

									<Route exact path="/archives">
										<PostList
											key="archives"
											title="Archives"
										/>
									</Route>

									<Route exact path="/portfolio">
										<Portfolio />
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
					</LanguageContext.Provider>
				</ThemeProvider>
			</HelmetProvider>
		)
	}
}
