import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import { Helmet } from "react-helmet-async"
import storage from "local-storage-fallback"
import { isIE } from "react-device-detect"

import { ThemeType } from "../types/styled-components"

import Loading from "./components/Loading"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import PostList from "./pages/PostList"
import Search from "./pages/Search"
import Page from "./pages/Page"
import NotFound from "./pages/NotFound"
import Portfolio from "./pages/Portfolio"

import theming from "./styles/theming"
import GlobalStyle from "./styles/globalStyle"

const IENotSupported = styled.p`
	margin: auto;
	font-size: 2rem;
	margin-top: 2rem;
	text-align: center;
	font-family: ${theming.font.regular};
`

const StyledContentContainer = styled.div`
	flex: 1 1 auto;
	margin-bottom: 3rem;
	margin-top: 5rem;
`

const App = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [currentTheme, setCurrentTheme] = useState<ThemeType>(
		(storage.getItem("theme") || "dark") as ThemeType // get theme from storage and set to "dark" mode if not set already
	)

	useEffect(() => {
		// show loading screen until all fonts are loaded.
		// Experimental feature. Not fully supported on all browsers (IE, I'm looking at you).
		// https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet

		// checks if document.fonts.onloadingdone is supported on the browser
		if (typeof document.fonts.onloadingdone != undefined) {
			document.fonts.onloadingdone = () => {
				setIsLoading(false)
			}
		} else {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		// save theme when it is changed
		storage.setItem("theme", currentTheme)
	}, [currentTheme])

	if (isIE)
		return (
			<IENotSupported>
				Internet Explorer is <b>not supported.</b>
			</IENotSupported>
		)

	return (
		<ThemeProvider
			theme={{
				currentTheme: currentTheme,
				setTheme(setThemeTo) {
					setCurrentTheme(setThemeTo)
				},
			}}
		>
			<Helmet>
				<meta property="og:site_name" content="developomp" />
				<meta property="og:title" content="Home" />
				<meta property="og:description" content="developomp's blog" />
				<meta property="og:url" content={process.env.PUBLIC_URL} />
			</Helmet>

			<GlobalStyle />

			<Navbar />
			<StyledContentContainer>
				{isLoading ? (
					<Loading />
				) : (
					<Routes>
						<Route
							path="/"
							element={<PostList howMany={5} title="Home" />}
						/>
						<Route path="/search" element={<Search />} />
						<Route path="/portfolio" element={<Portfolio />} />
						<Route path="/404" element={<NotFound />} />
						<Route path="/loading" element={<Loading />} />
						<Route path="/*" element={<Page />} />
					</Routes>
				)}
			</StyledContentContainer>
			<Footer />
		</ThemeProvider>
	)
}

export default App
