import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import { Post } from "../types/typings"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

import Tag from "../components/Tag"
import TagList from "../components/TagList"

import theming from "../theming"

const StyledPostCard = styled.div`
	box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
	text-align: left;
	margin-bottom: 2rem;
	cursor: pointer;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color1,
			dark: theming.dark.color1,
		})};

	&:hover {
		box-shadow: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "0 4px 10px rgb(0 0 0 / 25%)",
				dark: "0 4px 10px rgb(255 255 255 / 20%)",
			})};
	}
`

const StyledTitle = styled.h1`
	font-size: 2rem;
	font-style: bold;
	margin-bottom: 1rem;
`

const StyledMetaContainer = styled.small`
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#555",
			dark: "#CCC",
		})};
`

const StyledPostCardContent = styled.div`
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "grey",
			dark: "lightgrey",
		})};
`

interface _PostDateBase extends Post {
	url: string
}

interface Props {
	postData: _PostDateBase
}

const PostCard = (props: Props) => {
	const navigate = useNavigate()

	return (
		<StyledPostCard
			key={props.postData.url}
			className="card main-content"
			onClick={() => {
				navigate(process.env.PUBLIC_URL + props.postData.url)
			}}
		>
			<StyledTitle>{props.postData?.title || "No title"}</StyledTitle>

			<StyledMetaContainer>
				<TagList direction="left">
					{props.postData.tags ? (
						props.postData.tags.map((tag) => {
							return (
								<Tag
									key={props.postData.title + tag}
									text={tag}
								/>
							)
						})
					) : (
						<></>
					)}
				</TagList>
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

			<hr />

			<StyledPostCardContent
				className="white-link"
				dangerouslySetInnerHTML={{
					__html: props.postData.preview,
				}}
			/>
		</StyledPostCard>
	)
}

export default PostCard
