import { useContext } from "react"
import styled from "styled-components"
import { isMobile } from "react-device-detect"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

import { ActionsEnum, globalContext } from "../../../globalContext"
import { HeaderButtonCSS } from "../HeaderButton"

const StyledThemeButton = styled.button`
	${HeaderButtonCSS}
	border: none;
	width: 72px;

	${({ theme }) =>
		theme.currentTheme === "dark" ? "transform: scaleX(-1)" : ""};
`

const ThemeToggleButton = () => {
	const { globalState, dispatch } = useContext(globalContext)
	const theme = globalState.currentTheme

	return (
		<>
			<StyledThemeButton
				data-tip
				data-for="theme"
				onClick={() =>
					dispatch({
						type: ActionsEnum.UPDATE_THEME,
						payload: theme === "dark" ? "light" : "dark",
					})
				}
			>
				{theme == "dark" && <FontAwesomeIcon icon={faMoon} />}
				{theme == "light" && <FontAwesomeIcon icon={faSun} />}
			</StyledThemeButton>

			{!isMobile && (
				<ReactTooltip id="theme" type="dark" effect="solid">
					{globalState.locale == "en" ? (
						<span>Using {theme} theme</span>
					) : (
						<span>{theme == "dark" ? "어두운" : "밝은"} 테마 사용중</span>
					)}
				</ReactTooltip>
			)}
		</>
	)
}

export default ThemeToggleButton
