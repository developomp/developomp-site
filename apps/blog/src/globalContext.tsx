import type { Dispatch, ReactNode, ReactElement } from "react"
import type { Theme } from "@developomp-site/theme"

import darkTheme from "@developomp-site/theme/dist/dark.json"
import lightTheme from "@developomp-site/theme/dist/light.json"
import { createContext, useEffect, useReducer } from "react"
import storage from "local-storage-fallback"

export type SiteTheme = "dark" | "light"

export enum ActionsEnum {
	UPDATE_THEME,
	UPDATE_LOCALE,
}

// union of all actions
export type GlobalAction = {
	type: ActionsEnum.UPDATE_THEME
	payload: SiteTheme
}

export interface IGlobalState {
	currentTheme: SiteTheme
	theme: Theme
}

export interface IGlobalContext {
	globalState: IGlobalState
	dispatch: Dispatch<GlobalAction>
}

const defaultState: IGlobalState = {
	currentTheme: (storage.getItem("theme") || "dark") as SiteTheme,
	theme:
		((storage.getItem("theme") || "dark") as SiteTheme) === "dark"
			? darkTheme
			: lightTheme,
}

export const globalContext = createContext({} as IGlobalContext)

function reducer(state = defaultState, action: GlobalAction): IGlobalState {
	switch (action.type) {
		case ActionsEnum.UPDATE_THEME:
			state.currentTheme = action.payload
			state.theme = state.currentTheme === "dark" ? darkTheme : lightTheme
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
		storage.setItem("theme", globalState.currentTheme)
	}, [globalState.currentTheme])

	return (
		<globalContext.Provider value={{ globalState, dispatch }}>
			{props.children}
		</globalContext.Provider>
	)
}
