import { useContext, useEffect, useState } from "react"
import { Collapse } from "react-collapse"
import storage from "local-storage-fallback"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import theming from "../../styles/theming"
import { globalContext } from "../../globalContext"

const StyledTocToggleButton = styled.button`
	cursor: pointer;
	border: none;
	text-align: left;
	background-color: rgba(0, 0, 0, 0);
	width: 100%;
	padding: 0.5rem;
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "black",
			dark: "white",
		})};
`

const StyledCollapseContainer = styled.div`
	* {
		transition: height 200ms ease-out;
	}
`

const Toc = (props: { data?: string }) => {
	const { globalState } = useContext(globalContext)
	const [isTocOpened, setIsTocOpened] = useState(
		storage.getItem("isTocOpened") == "true"
	)

	useEffect(() => {
		storage.setItem("isTocOpened", isTocOpened.toString())
	}, [isTocOpened])

	if (!props.data) return <></>

	return (
		<>
			<StyledTocToggleButton
				onClick={() => {
					setIsTocOpened((prev) => !prev)
				}}
			>
				<strong>
					{globalState.locale == "en" ? "Table of Contents " : "목차 "}
					<FontAwesomeIcon icon={isTocOpened ? faCaretUp : faCaretDown} />
				</strong>
			</StyledTocToggleButton>
			<StyledCollapseContainer>
				<Collapse isOpened={isTocOpened}>
					<div dangerouslySetInnerHTML={{ __html: props.data }} />
				</Collapse>
			</StyledCollapseContainer>
			<hr />
		</>
	)
}

export default Toc
