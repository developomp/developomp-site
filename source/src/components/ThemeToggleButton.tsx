import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import styled, { ThemeConsumer } from "styled-components"
import ReactTooltip from "react-tooltip"
import { isMobile } from "react-device-detect"

import theming from "../theming"

const StyledThemeButton = styled.div`
	${theming.styles.navbarButtonStyle}
	${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "",
			dark: "transform: scaleX(-1);",
		})};
`

export default class Navbar extends React.Component {
	render() {
		return (
			<ThemeConsumer>
				{({ currentTheme, setTheme }) => (
					<>
						<StyledThemeButton
							data-tip
							data-for="theme"
							className="right"
							onClick={() =>
								setTheme(
									currentTheme === "dark" ? "light" : "dark"
								)
							}
						>
							{currentTheme == "dark" && (
								<FontAwesomeIcon icon={faMoon} />
							)}
							{currentTheme == "light" && (
								<FontAwesomeIcon icon={faSun} />
							)}
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
}
