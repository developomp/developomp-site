import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"

import theming from "../theming"

import { LanguageContext } from "../LangaugeContext"

const StyledThemeButton = styled.div<StyledThemeButtonProps>`
	${theming.styles.navbarButtonStyle}
	${(props) =>
		props.language == "en"
			? ""
			: "transform: scaleX(-1);\
			-moz-transform: scaleX(-1);\
			-webkit-transform: scaleX(-1);\
			-ms-transform: scaleX(-1);"};
`

interface StyledThemeButtonProps {
	language: string
}

export default class LanguageToggleButton extends React.Component {
	languageName = (language) => {
		let name = "English"
		if (language == "kr") name = "Korean"
		return name
	}

	render() {
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
							<span>
								Using {this.languageName(language)} language
							</span>
						</ReactTooltip>
					</>
				)}
			</LanguageContext.Consumer>
		)
	}
}
