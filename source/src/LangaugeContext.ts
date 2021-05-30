import { createContext } from "react"

export const LanguageContext = createContext({
	language: "",
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	toggleLanguage: () => {},
})
