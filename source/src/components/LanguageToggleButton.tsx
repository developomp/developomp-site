import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import theme from "styled-theming"

import ReactTooltip from "react-tooltip"

import theming from "../theming"

const StyledThemeButton = styled.div`
	${theming.styles.navbarButtonStyle}
	transition: transform 0.2s linear;
	/* ${theme("mode", {
		light: "",
		dark: "transform: scaleX(-1);\
			-moz-transform: scaleX(-1);\
			-webkit-transform: scaleX(-1);\
			-ms-transform: scaleX(-1);",
	})}; */
`

function LanguageToggleButton() {
	return (
		<>
			<StyledThemeButton data-tip data-for="language">
				<FontAwesomeIcon icon={faLanguage} />
			</StyledThemeButton>
			<ReactTooltip id="language" type="dark" effect="solid">
				<span>Change to Korean/English</span>
			</ReactTooltip>
		</>
	)
}

export default LanguageToggleButton
