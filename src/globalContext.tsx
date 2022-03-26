import { createContext, useEffect, useReducer } from "react"
import storage from "local-storage-fallback"

import type { Dispatch, ReactNode, ReactElement } from "react"

export type SiteLocale = "en" | "kr"
export type SiteTheme = "dark" | "light"

export enum ActionsEnum {
	UPDATE_THEME,
	UPDATE_LOCALE,
}

export interface IGlobalState {
	locale: SiteLocale
	theme: SiteTheme
}

export type GlobalAction =
	| {
			type: ActionsEnum.UPDATE_THEME
			payload: SiteTheme
	  }
	| {
			type: ActionsEnum.UPDATE_LOCALE
			payload: SiteLocale
	  }

export interface IGlobalContext {
	globalState: IGlobalState
	dispatch: Dispatch<GlobalAction>
}

const defaultState: IGlobalState = {
	locale: (storage.getItem("locale") || "en") as SiteLocale,
	theme: (storage.getItem("theme") || "dark") as SiteTheme,
}

export const globalContext = createContext({} as IGlobalContext)

function reducer(state = defaultState, action: GlobalAction): IGlobalState {
	switch (action.type) {
		case ActionsEnum.UPDATE_THEME:
			state.theme = action.payload
			break

		case ActionsEnum.UPDATE_LOCALE:
			state.locale = action.payload
			break

		default:
			break
	}

	return { ...state }
}

export function GlobalStore(props: { children: ReactNode }): ReactElement {
	const [globalState, dispatch] = useReducer(reducer, defaultState)

	// save theme when it is changed
	useEffect(() => {
		storage.setItem("theme", globalState.theme)
	}, [globalState.theme])

	// save locale when it is changed
	useEffect(() => {
		storage.setItem("locale", globalState.locale)
	}, [globalState.locale])

	return (
		<globalContext.Provider value={{ globalState, dispatch }}>
			{props.children}
		</globalContext.Provider>
	)
}
