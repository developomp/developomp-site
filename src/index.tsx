import React from "react"
import ReactDOM from "react-dom"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"
import { GlobalStore } from "./globalContext"

import App from "./App"

ReactDOM.render(
	<React.StrictMode>
		<GlobalStore>
			<BrowserRouter>
				<HelmetProvider>
					<App />
				</HelmetProvider>
			</BrowserRouter>
		</GlobalStore>
	</React.StrictMode>,
	document.getElementById("root")
)
