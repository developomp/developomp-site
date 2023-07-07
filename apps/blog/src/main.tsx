import "@fontsource/noto-sans-kr/400.css"
import "@fontsource/noto-sans-kr/700.css"
import "@fontsource/source-code-pro"
import "katex/dist/katex.min.css"
import "./index.css"
import "./styles/anchor.scss"
import "./styles/blockQuote.scss"
import "./styles/button.scss"
import "./styles/checkbox.scss"
import "./styles/code.scss"
import "./styles/global.scss"
import "./styles/heading.scss"
import "./styles/hr.scss"
import "./styles/img.scss"
import "./styles/katex.scss"
import "./styles/kbd.scss"
import "./styles/list.scss"
import "./styles/mark.scss"
import "./styles/scrollbar.scss"
import "./styles/subSup.scss"
import "./styles/table.scss"

import ReactDOM from "react-dom/client"

import App from "@/App.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
)
