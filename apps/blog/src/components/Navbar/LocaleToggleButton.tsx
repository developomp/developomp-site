import { useContext } from "react"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"

import { ActionsEnum, globalContext } from "../../globalContext"
import theming from "../../styles/theming"

import type { SiteLocale } from "../../globalContext"

interface StyledLocaleToggleButtonProps {
	locale: SiteLocale
}

const StyledLocaleToggleButton = styled.button<StyledLocaleToggleButtonProps>`
	${theming.styles.navbarButtonStyle}
	border: none;
	width: 72px;

	${(props) => (props.locale == "en" ? "" : "transform: scaleX(-1);")};
`

function LocaleToggleButton() {
	const { globalState, dispatch } = useContext(globalContext)

	return (
		<>
			<StyledLocaleToggleButton
				data-tip
				data-for="locale"
				onClick={() => {
					dispatch({
						type: ActionsEnum.UPDATE_LOCALE,
						payload: globalState.locale == "en" ? "kr" : "en",
					})
				}}
				locale={globalState.locale}
			>
				<FontAwesomeIcon icon={faLanguage} />
			</StyledLocaleToggleButton>
			<ReactTooltip id="locale" type="dark" effect="solid">
				<span>{globalState.locale == "en" ? "English" : "한국어"} </span>
			</ReactTooltip>
		</>
	)
}

export default LocaleToggleButton
