import type { SiteLocale } from "../../../globalContext"

import { useContext } from "react"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"

import { ActionsEnum, globalContext } from "../../../globalContext"
import { HeaderButtonCSS } from "../HeaderButton"

interface Props {
	locale: SiteLocale
}

const LocaleToggleButton = styled.button<Props>`
	${HeaderButtonCSS}

	border: none;
	width: 72px;

	${(props) => (props.locale == "en" ? "" : "transform: scaleX(-1);")};
`

export default () => {
	const { globalState, dispatch } = useContext(globalContext)

	return (
		<>
			<LocaleToggleButton
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
			</LocaleToggleButton>
			<ReactTooltip id="locale" type="dark" effect="solid">
				<span>{globalState.locale == "en" ? "English" : "한국어"} </span>
			</ReactTooltip>
		</>
	)
}
