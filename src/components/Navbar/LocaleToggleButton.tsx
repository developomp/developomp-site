import { useContext } from "react"
import ReactTooltip from "react-tooltip"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"

import { ActionsEnum, globalContext } from "../../globalContext"
import theming from "../../styles/theming"

import type { SiteLocale } from "../../globalContext"

interface StyledLocaleToggleButtonProps {
	locale: SiteLocale
}

const StyledLocaleToggleButton = styled.div<StyledLocaleToggleButtonProps>`
	${theming.styles.navbarButtonStyle}
	${(props) => (props.locale == "en" ? "" : "transform: scaleX(-1);")};
`

const LocaleToggleButton = () => {
	const { globalState, dispatch } = useContext(globalContext)

	return (
		<>
			<StyledLocaleToggleButton
				locale={globalState.locale}
				data-tip
				data-for="locale"
				onClick={() => {
					dispatch({
						type: ActionsEnum.UPDATE_LOCALE,
						payload: globalState.locale == "en" ? "kr" : "en",
					})
				}}
			>
				<FontAwesomeIcon icon={faLanguage} />
			</StyledLocaleToggleButton>
			<ReactTooltip id="locale" type="dark" effect="solid">
				<span>Locale: {globalState.locale}</span>
			</ReactTooltip>
		</>
	)
}

export default LocaleToggleButton
