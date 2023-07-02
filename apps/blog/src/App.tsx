import darkTheme from "@developomp-site/theme/dist/dark.json"
import lightTheme from "@developomp-site/theme/dist/light.json"
import { useMeta, useTitle, useTitleTemplate } from "hoofd"
import { useContext, useEffect, useState } from "react"
import { isIE } from "react-device-detect"
import { Route, Routes } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"

import Footer from "./components/Footer"
import Header from "./components/Header"
import Loading from "./components/Loading"
import { globalContext } from "./globalContext"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Page from "./pages/Page"
import Search from "./pages/Search"
import GlobalStyle from "./styles/globalStyle"

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
