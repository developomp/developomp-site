import "styled-components"
import type { Theme } from "@developomp-site/theme"
import { SiteTheme } from "../src/globalContext"

declare module "styled-components" {
	export interface DefaultTheme {
		currentTheme: SiteTheme
		theme: Theme
	}
}
