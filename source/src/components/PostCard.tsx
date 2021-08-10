import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import theming from "../theming"

import Tag from "../components/Tag"
import TagList from "../components/TagList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

const StyledTitle = styled.h1`
	font-size: 2rem;
	font-style: bold;
	margin-bottom: 1rem;
`

const StyledMetaContainer = styled.small`
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#555",
			dark: "lightgrey",
		})};
`

const StyledLink = styled(Link)`
	text-decoration: none;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color1,
			dark: theming.dark.color1,
		})};

	&:hover {
		text-decoration: underline;
	}
`

const StyledPostCard = styled.div`
	box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
	text-align: left;
	margin-bottom: 20px;
	padding: 1rem 2rem 2rem 2rem;
`

const StyledPostCardContent = styled.div`
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "grey",
			dark: "lightgrey",
		})};
`

interface PostCardProps {
	postData: {
		url: string
		title: string | undefined
		preview: string
		readTime: string
		wordCount: number
		tags: string[]
		date: string | undefined
	}
}

export default class PostCard extends React.Component<PostCardProps> {
	render() {
		return (
			<StyledPostCard
				key={this.props.postData.url}
				className="card main-content"
			>
				<StyledTitle>
					<StyledLink
						to={`${process.env.PUBLIC_URL}${this.props.postData.url}`}
					>
						{this.props.postData?.title
							? this.props.postData.title
							: "No title"}
					</StyledLink>
				</StyledTitle>
				<StyledMetaContainer>
					<TagList direction="left">
						{this.props.postData.tags ? (
							this.props.postData.tags.map((tag) => {
								return (
									<Tag
										key={this.props.postData.title + tag}
										text={tag}
									/>
								)
							})
						) : (
							<></>
						)}
					</TagList>
					<FontAwesomeIcon icon={faCalendar} /> Published on{" "}
					{this.props.postData?.date
						? this.props.postData.date
						: "Unknown date"}
					&nbsp;&nbsp;&nbsp;&nbsp;
					<FontAwesomeIcon icon={faHourglass} />{" "}
					{this.props.postData?.readTime
						? this.props.postData.readTime + " read"
						: "unknown length"}
					&nbsp;&nbsp;&nbsp;&nbsp;
					<FontAwesomeIcon icon={faBook} />{" "}
					{this.props.postData?.wordCount
						? this.props.postData.wordCount + " words"
						: "unknown words"}
				</StyledMetaContainer>

				<hr />
				<StyledPostCardContent
					className="white-link"
					dangerouslySetInnerHTML={{
						__html: this.props.postData.preview,
					}}
				></StyledPostCardContent>
				<small>
					<StyledLink
						to={process.env.PUBLIC_URL + this.props.postData.url}
					>
						<u>Read more</u>
					</StyledLink>
				</small>
			</StyledPostCard>
		)
	}
}
