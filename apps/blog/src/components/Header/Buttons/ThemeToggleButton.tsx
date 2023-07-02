import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"
import { isMobile } from "react-device-detect"
import ReactTooltip from "react-tooltip"
import styled from "styled-components"

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
                aria-label="theme toggle"
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
                    <span>Using {theme} theme</span>
                </ReactTooltip>
            )}
        </>
    )
}

export default ThemeToggleButton
