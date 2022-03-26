import styled, { ThemeConsumer } from "styled-components"
import { isMobile } from "react-device-detect"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

import theming from "../../styles/theming"

const StyledThemeButton = styled.div`
	${theming.styles.navbarButtonStyle}
	${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "",
			dark: "transform: scaleX(-1);",
		})};
`

const ThemeToggleButton = () => {
	return (
		<ThemeConsumer>
			{({ currentTheme, setTheme }) => (
				<>
					<StyledThemeButton
						data-tip
						data-for="theme"
						onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
					>
						{currentTheme == "dark" && <FontAwesomeIcon icon={faMoon} />}
						{currentTheme == "light" && <FontAwesomeIcon icon={faSun} />}
					</StyledThemeButton>
					{!isMobile && (
						<ReactTooltip id="theme" type="dark" effect="solid">
							<span>Using {currentTheme} theme</span>
						</ReactTooltip>
					)}
				</>
			)}
		</ThemeConsumer>
	)
}

export default ThemeToggleButton
