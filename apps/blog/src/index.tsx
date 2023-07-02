import "@fontsource/noto-sans-kr/400.css"
import "@fontsource/noto-sans-kr/700.css"
import "@fontsource/source-code-pro"

import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import { GlobalStore } from "./globalContext"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)
root.render(
    <GlobalStore>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalStore>
)
