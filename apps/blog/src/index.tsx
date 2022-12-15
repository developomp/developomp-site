import { createRoot } from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"
import { GlobalStore } from "./globalContext"

import App from "./App"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)
root.render(
	<GlobalStore>
		<BrowserRouter>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</BrowserRouter>
	</GlobalStore>
)