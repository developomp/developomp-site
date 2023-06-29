import darkTheme from "@developomp-site/theme/dist/dark.json"
import lightTheme from "@developomp-site/theme/dist/light.json"

import { useContext, useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import { useTitleTemplate, useTitle, useMeta } from "hoofd"
import { isIE } from "react-device-detect"

import Loading from "./components/Loading"
import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Search from "./pages/Search"
import Page from "./pages/Page"
import NotFound from "./pages/NotFound"

import GlobalStyle from "./styles/globalStyle"

import { globalContext } from "./globalContext"

const IENotSupported = styled.p`
    margin: auto;
    font-size: 2rem;
    margin-top: 2rem;
    text-align: center;
    font-family: ${(props) => props.theme.theme.font.sansSerif};
`

const StyledContentContainer = styled.div`
    flex: 1 1 auto;
    margin-bottom: 3rem;
    margin-top: 5rem;
`

export default function App() {
    const { globalState } = useContext(globalContext)
    const [isLoading, setIsLoading] = useState(true)

    useTitleTemplate("pomp's blog | %s")
    useTitle("Home")
    useMeta({ property: "og:title", content: "Home" })

    useEffect(() => {
        // set loading to false if all fonts are loaded
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
                currentTheme: globalState.currentTheme,
                theme:
                    globalState.currentTheme === "dark"
                        ? darkTheme
                        : lightTheme,
            }}
        >
            <GlobalStyle />

            <Header />
            <StyledContentContainer>
                {isLoading ? (
                    <Loading />
                ) : (
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="search" element={<Search />} />
                        <Route path="404" element={<NotFound />} />
                        <Route path="loading" element={<Loading />} />
                        <Route path="*" element={<Page />} />
                    </Routes>
                )}
            </StyledContentContainer>
            <Footer />
        </ThemeProvider>
    )
}
