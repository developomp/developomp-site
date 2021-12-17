import { useEffect, useState } from "react"
import { Collapse } from "react-collapse"
import storage from "local-storage-fallback"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"

import theming from "../../styles/theming"

import { FetchedPage } from "../../types/typings"

const StyledTocToggleButton = styled.button`
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

const Toc = (props: { fetchedPage: FetchedPage }) => {
	const [isTocOpened, setIsTocOpened] = useState(
		storage.getItem("isTocOpened") == "true"
	)

	useEffect(() => {
		storage.setItem("isTocOpened", isTocOpened.toString())
	}, [isTocOpened])

	return (
		<>
			<StyledTocToggleButton
				onClick={() => {
					setIsTocOpened((prev) => !prev)
				}}
			>
				<strong>Table of Content </strong>
				{isTocOpened ? (
					<FontAwesomeIcon icon={faCaretUp} />
				) : (
					<FontAwesomeIcon icon={faCaretDown} />
				)}
			</StyledTocToggleButton>
			<StyledCollapseContainer>
				<Collapse isOpened={isTocOpened}>
					<div className="white-link">{props.fetchedPage.toc}</div>
				</Collapse>
			</StyledCollapseContainer>
			<hr />
		</>
	)
}

export default Toc
