import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import styled, { ThemeConsumer } from "styled-components"
import ReactTooltip from "react-tooltip"

import theming from "../theming"

export default class Navbar extends React.Component {
	StyledThemeButton = styled.div`
		${theming.styles.navbarButtonStyle}
		${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "",
				dark: "transform: scaleX(-1);\
			-moz-transform: scaleX(-1);\
			-webkit-transform: scaleX(-1);\
			-ms-transform: scaleX(-1);",
			})};
	`
	render() {
		return (
			<ThemeConsumer>
				{({ currentTheme, setTheme }) => (
					<>
						<this.StyledThemeButton
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
						</this.StyledThemeButton>
						<ReactTooltip id="theme" type="dark" effect="solid">
							<span>Using {currentTheme} theme</span>
						</ReactTooltip>
					</>
				)}
			</ThemeConsumer>
		)
	}
}
