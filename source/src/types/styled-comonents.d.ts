import "styled-components"

export type ThemeType = "dark" | "light"

declare module "styled-components" {
	export interface DefaultTheme {
		currentTheme: ThemeType
		setTheme(setThemeTo: ThemeType): void
	}
}
