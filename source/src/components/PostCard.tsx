import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import { PostData } from "../../types/types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

import Tag from "./Tag"
import TagList from "./TagList"
import MainContent from "./MainContent"

import theming from "../styles/theming"

const StyledPostCard = styled(MainContent)`
	box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
	text-align: left;
	margin-bottom: 2rem;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color1,
			dark: theming.dark.color1,
		})};

	${theming.styles.hoverCard}
`

const StyledTitle = styled.h1`
	font-size: 2rem;
	font-style: bold;
	margin: 0;
	margin-bottom: 1rem;
`

const StyledMetaContainer = styled.small`
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#555",
			dark: "#CCC",
		})};
`

interface _PostDateBase extends PostData {
	url: string
}

interface Props {
	postData: _PostDateBase
}

const PostCard = (props: Props) => {
	const navigate = useNavigate()

	return (
		<StyledPostCard
			onClick={() => navigate(process.env.PUBLIC_URL + props.postData.url)}
		>
			<StyledTitle>{props.postData?.title || "No title"}</StyledTitle>

			<br />

			<StyledMetaContainer>
				<TagList direction="left">
					{props.postData.tags &&
						props.postData.tags.map((tag) => {
							return <Tag key={props.postData.title + tag} text={tag} />
						})}
				</TagList>
				<hr />
				<FontAwesomeIcon icon={faCalendar} />
				&nbsp;&nbsp;&nbsp;
				{props.postData?.date || "Unknown date"}
				&nbsp;&nbsp;&nbsp;&nbsp;
				<FontAwesomeIcon icon={faHourglass} />
				&nbsp;&nbsp;&nbsp;
				{props.postData?.readTime
					? props.postData.readTime + " read"
					: "unknown length"}
				&nbsp;&nbsp;&nbsp;&nbsp;
				<FontAwesomeIcon icon={faBook} />
				&nbsp;&nbsp;&nbsp;
				{props.postData?.wordCount
					? props.postData.wordCount + " words"
					: "unknown words"}
			</StyledMetaContainer>
		</StyledPostCard>
	)
}

export default PostCard
