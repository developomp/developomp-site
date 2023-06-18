import styled from "styled-components"
import { Link } from "react-router-dom"

import { PostData } from "@developomp-site/blog-content/src/types/types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

import Tag from "./Tag"
import TagList from "./TagList"
import MainContent from "./MainContent"

const PostCard = styled(MainContent)`
	box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
	text-align: left;
	margin-bottom: 2rem;

	:hover {
		cursor: pointer;
		box-shadow: 0 4px 10px
			${({ theme }) => theme.theme.component.card.color.hoverGlow};
	}
`

const PostCardContainer = styled(Link)`
	display: block;
	padding: 2rem;
	text-decoration: none;
	padding: 0;

	/* override link color */
	color: ${({ theme }) => theme.theme.color.text.gray};
	&:hover {
		color: ${({ theme }) => theme.theme.color.text.gray};
	}
`

const Title = styled.h1`
	font-size: 2rem;
	font-style: bold;
	margin: 0;
	margin-bottom: 1rem;
`

const MetaContainer = styled.small``

interface PostCardData extends PostData {
	content_id: string
}

interface Props {
	postData: PostCardData
}

export default (props: Props) => {
	const { postData } = props
	const { content_id, wordCount, date, readTime, title, tags } = postData

	return (
		<PostCard>
			<PostCardContainer to={content_id}>
				<Title>
					{title || "No title"}
					{/* show "(series)" for urls that matches regex "/series/<series-title>" */}
					{/\/series\/[^/]*$/.test(content_id) && " (series)"}
				</Title>

				<br />

				<MetaContainer>
					<TagList direction="left">
						{tags &&
							tags.map((tag) => {
								return <Tag key={title + tag} text={tag} />
							})}
					</TagList>
					<hr />
					<FontAwesomeIcon icon={faCalendar} />
					&nbsp;&nbsp;&nbsp;
					{date || "Unknown date"}
					&nbsp;&nbsp;&nbsp;&nbsp;
					<FontAwesomeIcon icon={faHourglass} />
					&nbsp;&nbsp;&nbsp;
					{readTime ? readTime + " read" : "unknown read time"}
					&nbsp;&nbsp;&nbsp;&nbsp;
					<FontAwesomeIcon icon={faBook} />
					&nbsp;&nbsp;&nbsp;
					{typeof wordCount === "number"
						? wordCount + " words"
						: "unknown length"}
				</MetaContainer>
			</PostCardContainer>
		</PostCard>
	)
}
