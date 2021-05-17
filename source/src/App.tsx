import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { HelmetProvider } from "react-helmet-async"
import storage from "local-storage-fallback"
import { useState, useEffect } from "react"
import theme from "styled-theming"
import Spinner from "./components/Spinner"

import theming from "./theming"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/home"
import Page from "./pages/page"
import NotFound from "./pages/notfound"
import Portfolio from "./pages/portfolio"

// Theme that will be used throughout the website
const GlobalStyle = createGlobalStyle`
body {
	overflow-x: hidden;
	overflow-y: scroll;
}

html, body, #root {
	min-height: 100vh;
	margin: 0;
	display: flex;
	flex-flow: column;
	background-color: ${theme("mode", {
		light: theming.light.backgroundColor1,
		dark: theming.dark.backgroundColor1,
	})};
	color: ${theme("mode", {
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
	background-color: ${theme("mode", {
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

function App() {
	const [currentTheme, _setTheme] = useState(() => {
		const savedTheme = storage.getItem("theme")
		return savedTheme ? JSON.parse(savedTheme) : { mode: "dark" }
	})

	// save theme when theme is changed
	useEffect(() => {
		storage.setItem("theme", JSON.stringify(currentTheme))
	}, [currentTheme])

	const [isLoading, setLoading] = useState(true)

	// show loading screen until all fonts are loaded.
	// Experimental feature. Not fully supported on all browsers (IE, I'm looking at you).
	// https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet
	useEffect(() => {
		// checks if document.fonts.onloadingdone is supported on the browser
		if (typeof document.fonts.onloadingdone != undefined) {
			document.fonts.onloadingdone = () => {
				setLoading(false)
			}
		} else {
			setLoading(false)
		}
	}, [])

	return (
		<HelmetProvider>
			<ThemeProvider
				theme={{
					...currentTheme,
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					setTheme: ({ setTheme, ...theme }) => _setTheme(theme), // make setTheme function available in other components
				}}
			>
				<GlobalStyle />
				<Router>
					<Navbar />
					<div id="content">
						{isLoading ? (
							<Spinner
								size={200}
								color={
									currentTheme.mode == "light"
										? theming.light.color1
										: theming.dark.color1
								}
							/>
						) : (
							<Switch>
								<Route
									exact
									path="/"
									component={() => (
										<Home howMany={4} title="Home" />
									)}
								/>
								<Route
									exact
									path="/archives"
									component={() => <Home title="Archives" />}
								/>
								<Route
									exact
									path="/portfolio"
									component={Portfolio}
								/>
								<Route exact path="/404" component={NotFound} />
								<Route exact path="/:path*" component={Page} />
							</Switch>
						)}
					</div>
					<Footer />
				</Router>
			</ThemeProvider>
		</HelmetProvider>
	)
}

export default App
