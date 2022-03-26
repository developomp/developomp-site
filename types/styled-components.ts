import "styled-components"
import type { SiteTheme } from "../src/globalContext"

declare module "styled-components" {
	export interface DefaultTheme {
		currentTheme: SiteTheme
		setTheme(setThemeTo: SiteTheme): void
	}
}
