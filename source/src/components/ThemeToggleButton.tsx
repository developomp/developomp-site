import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdjust } from "@fortawesome/free-solid-svg-icons"
import styled, { ThemeConsumer } from "styled-components"
import theme from "styled-theming"

import ReactTooltip from "react-tooltip"

import theming from "../theming"

const StyledThemeButton = styled.div`
	${theming.styles.navbarButtonStyle}
	transition: transform 0.2s linear;
	${theme("mode", {
		light: "",
		dark: "transform: scaleX(-1);\
			-moz-transform: scaleX(-1);\
			-webkit-transform: scaleX(-1);\
			-ms-transform: scaleX(-1);",
	})};
`

function Navbar() {
	return (
		<ThemeConsumer>
			{(_theme) => (
				<>
					<StyledThemeButton
						data-tip
						data-for="theme"
						className="right"
						onClick={(_: any) =>
							_theme.setTheme(
								_theme.mode === "dark"
									? { ..._theme, mode: "light" }
									: { ..._theme, mode: "dark" }
							)
						}
					>
						<FontAwesomeIcon icon={faAdjust} />
					</StyledThemeButton>
					<ReactTooltip id="theme" type="dark" effect="solid">
						<span>Change theme</span>
					</ReactTooltip>
				</>
			)}
		</ThemeConsumer>
	)
}

export default Navbar
