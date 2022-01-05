import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

import { FetchedPage } from "../../../types/types"
import theming from "../../styles/theming"

const StyledMetaContainer = styled.div`
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#555",
			dark: "#CCC",
		})};
`

const Meta = (props: { fetchedPage: FetchedPage }) => {
	return (
		<StyledMetaContainer>
			<FontAwesomeIcon icon={faCalendar} />
			&nbsp;&nbsp;&nbsp;
			{props.fetchedPage.date || "Unknown date"}
			&nbsp;&nbsp;&nbsp;&nbsp;
			<FontAwesomeIcon icon={faHourglass} />
			&nbsp;&nbsp;&nbsp;
			{props.fetchedPage.readTime
				? props.fetchedPage.readTime + " read"
				: "unknown length"}
			&nbsp;&nbsp;&nbsp;&nbsp;
			<FontAwesomeIcon icon={faBook} />
			&nbsp;&nbsp;&nbsp;
			{props.fetchedPage.wordCount
				? props.fetchedPage.wordCount + " words"
				: "unknown words"}
		</StyledMetaContainer>
	)
}

export default Meta
