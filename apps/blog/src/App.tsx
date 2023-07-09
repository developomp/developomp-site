import { useTitleTemplate } from "hoofd"
import { Route, Switch } from "wouter"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Loading from "@/components/Loading"
import Home from "@/pages/Home"
import NotFound from "@/pages/NotFound"
import Page from "@/pages/Page"

function App() {
    useTitleTemplate("pomp's blog | %s")

    return (
        <>
            <Header />
            <main className="mx-auto mb-8 mt-20 flex w-full max-w-screen-mobile grow flex-col items-center gap-8 px-4">
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                    {/* <Route path="/search">
                        <Search />
                    </Route> */}
                    <Route path="/404">
                        <NotFound />
                    </Route>
                    <Route path="/loading">
                        <Loading />
                    </Route>
                    <Route>
                        <Page />
                    </Route>
                </Switch>
            </main>
            <Footer />
        </>
    )
}

export default App
