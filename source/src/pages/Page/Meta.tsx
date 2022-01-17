import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faFile,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

import { PageData } from "../../../types/types"
import theming from "../../styles/theming"

const StyledMetaContainer = styled.div`
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#555",
			dark: "#CCC",
		})};
`

const Meta = (props: { fetchedPage: PageData }) => {
	return (
		<StyledMetaContainer>
			{/* posts count */}
			{props.fetchedPage.length > 0 && (
				<>
					<FontAwesomeIcon icon={faFile} />
					&nbsp;&nbsp;
					{props.fetchedPage.length} post
					{props.fetchedPage.length > 1 && "s"} &nbsp;&nbsp;&nbsp;&nbsp;
				</>
			)}
			{/* date */}
			<FontAwesomeIcon icon={faCalendar} />
			&nbsp;&nbsp;
			{props.fetchedPage.date || "Unknown date"}
			&nbsp;&nbsp;&nbsp;&nbsp;
			{/* read time */}
			<FontAwesomeIcon icon={faHourglass} />
			&nbsp;&nbsp;
			{props.fetchedPage.readTime
				? props.fetchedPage.readTime + " read"
				: "unknown length"}
			&nbsp;&nbsp;&nbsp;&nbsp;
			{/* word count */}
			<FontAwesomeIcon icon={faBook} />
			&nbsp;&nbsp;
			{props.fetchedPage.wordCount
				? props.fetchedPage.wordCount +
				  " word" +
				  (props.fetchedPage.wordCount > 1 && "s")
				: "unknown words"}
		</StyledMetaContainer>
	)
}

export default Meta
