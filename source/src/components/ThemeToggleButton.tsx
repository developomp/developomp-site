import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
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
						onClick={() =>
							_theme.setTheme(
								_theme.mode === "dark"
									? { ..._theme, mode: "light" }
									: { ..._theme, mode: "dark" }
							)
						}
					>
						{_theme.mode == "dark" && (
							<FontAwesomeIcon icon={faMoon} />
						)}
						{_theme.mode == "light" && (
							<FontAwesomeIcon icon={faSun} />
						)}
					</StyledThemeButton>
					<ReactTooltip id="theme" type="dark" effect="solid">
						<span>Using {_theme.mode} theme</span>
					</ReactTooltip>
				</>
			)}
		</ThemeConsumer>
	)
}

export default Navbar
