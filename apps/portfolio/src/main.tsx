import "@fontsource/noto-sans-kr/400.css"
import "@fontsource/noto-sans-kr/700.css"
import "@fontsource/source-code-pro"
import "./index.scss"
import "@developomp-site/blog/src/styles/anchor.scss"
import "@developomp-site/blog/src/styles/callout.scss"
import "@developomp-site/blog/src/styles/colorChip.scss"
import "@developomp-site/blog/src/styles/heading.scss"
import "@developomp-site/blog/src/styles/img.scss"
import "@developomp-site/blog/src/styles/mark.scss"

import ReactDOM from "react-dom/client"

import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <App />
)
