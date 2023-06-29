import { useTitleTemplate } from "hoofd"
import { type FC } from "react"
import { Route, Switch } from "wouter"

import Header from "@/components/Header"
import Home from "@/routes/Home"
import Loading from "@/routes/Loading"
import NotFound from "@/routes/NotFound"
import Project from "@/routes/Project"

const App: FC = () => {
    useTitleTemplate("Portfolio | %s")
    // no need to set title and meta tags here

    return (
        <>
            <Header />
            <div className="mb-10 mt-20 w-full max-w-screen-md px-4">
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>

                    <Route path="/project/:id">
                        <Project />
                    </Route>

                    <Route path="/loading">
                        <Loading />
                    </Route>

                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default App
