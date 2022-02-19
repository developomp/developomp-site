import React from "react"
import ReactDOM from "react-dom"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"

import App from "./App"

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<HelmetProvider>
				<App />
			</HelmetProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
)
