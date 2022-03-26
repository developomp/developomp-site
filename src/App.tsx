import { useContext, useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import { Helmet } from "react-helmet-async"
import { isIE } from "react-device-detect"

import Loading from "./components/Loading"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Search from "./pages/Search"
import Page from "./pages/Page"
import NotFound from "./pages/NotFound"
import Portfolio from "./pages/Portfolio"

import theming from "./styles/theming"
import GlobalStyle from "./styles/globalStyle"

import { ActionsEnum, globalContext } from "./globalContext"

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

export default function App() {
	const { globalState, dispatch } = useContext(globalContext)
	const [isLoading, setIsLoading] = useState(true)

	// set loading to false if all fonts are loaded
	useEffect(() => {
		// checks if document.fonts.onloadingdone is supported on the browser
		if (typeof document.fonts.onloadingdone != undefined) {
			document.fonts.onloadingdone = () => {
				setIsLoading(false)
			}
		} else {
			setIsLoading(false)
		}
	}, [])

	if (isIE)
		return (
			<IENotSupported>
				Internet Explorer is <b>not supported.</b>
			</IENotSupported>
		)

	return (
		<ThemeProvider
			theme={{
				currentTheme: globalState.theme,
				setTheme(setThemeTo) {
					dispatch({ type: ActionsEnum.UPDATE_THEME, payload: setThemeTo })
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
						<Route path="/" element={<Home />} />
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
