/**
 *  go to App.tsx and search for `languageState` to see the actual values
 */

import { createContext } from "react"

export default createContext({
	language: "",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	toggleLanguage: () => {},
})
