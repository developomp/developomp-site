import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"

import LanguageContext from "../LanguageContext"
import theming from "../theming"

const StyledThemeButton = styled.div<{ language: string }>`
	${theming.styles.navbarButtonStyle}
	transition: transform 0.2s linear;
	${(props) =>
		props.language == "en"
			? ""
			: "transform: scaleX(-1);\
			-moz-transform: scaleX(-1);\
			-webkit-transform: scaleX(-1);\
			-ms-transform: scaleX(-1);"};
`

function LanguageToggleButton() {
	function languageName(language) {
		let name = "English"
		if (language == "kr") name = "Korean"
		return name
	}

	return (
		<LanguageContext.Consumer>
			{({ language, toggleLanguage }) => (
				<>
					<StyledThemeButton
						data-tip
						data-for="language"
						onClick={toggleLanguage}
						language={language}
					>
						<FontAwesomeIcon icon={faLanguage} />
					</StyledThemeButton>
					<ReactTooltip id="language" type="dark" effect="solid">
						<span>Using {languageName(language)} language</span>
					</ReactTooltip>
				</>
			)}
		</LanguageContext.Consumer>
	)
}

export default LanguageToggleButton
