import React from "react"
import marked from "marked"
import styled from "styled-components"
import { Link } from "react-router-dom"

import theming from "../theming"
import Tag from "../components/Tag"

const StyledTitle = styled.h1`
	font-size: 2rem;
	font-style: bold;
	margin-bottom: 1rem;
`

const StyledLink = styled(Link)`
	text-decoration: none;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "black",
			dark: "white",
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
			dark: "darkgrey",
		})};
`

interface PostCardProps {
	postData: {
		url: string
		title: string | undefined
		preview: string
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
				<small>
					<table>
						{this.props.postData.tags ? (
							this.props.postData.tags.map((tag) => {
								return (
									<td key={this.props.postData.title + tag}>
										<Tag text={tag} />
									</td>
								)
							})
						) : (
							<></>
						)}
					</table>
					Published on{" "}
					{this.props.postData?.date
						? this.props.postData.date
						: "Unknown date"}
				</small>

				<hr />
				<StyledPostCardContent
					className="link-color"
					dangerouslySetInnerHTML={{
						__html: marked(this.props.postData.preview),
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
