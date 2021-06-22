import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import marked from "marked"
import { Helmet } from "react-helmet-async"

import theming from "../theming"
import posts from "../data/posts.json"

const StyledPostList = styled.div`
	padding-top: 2rem;
	margin: auto;
	text-align: center;
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#111111",
			dark: "#EEEEEE",
		})};
`

const StyledH1 = styled.h1`
	margin-bottom: 20px;
	font-weight: 500;
	margin: 0;
`

const StyledTitle = styled.h1`
	font-size: 2rem;
	font-style: bold;
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
	padding: 10px 20px;
`

interface PostListProps {
	title: string
	howMany?: number
}

interface PostListState {
	howMany: number
	isLimited: boolean
	h1Text: string
	PostCards: Array<unknown>
}

export default class PostList extends React.Component<
	PostListProps,
	PostListState
> {
	constructor(props) {
		super(props)

		const howMany = props.howMany | 0
		const isLimited = howMany ? true : false
		const h1Text = isLimited ? `${howMany} recent posts` : "All posts"

		this.state = {
			howMany: howMany,
			isLimited: isLimited,
			h1Text: h1Text,
			PostCards: [],
		}
	}

	async componentDidMount() {
		const PostCards: Array<unknown> = []
		let howMany = this.state.howMany

		for (const postPath in posts.posts) {
			if (this.state.isLimited && howMany <= 0) continue

			const post = posts.posts[postPath]

			PostCards.push(
				<StyledPostCard key={postPath} className="card main-content">
					<StyledTitle>
						<StyledLink to={postPath}>
							{post?.title ? post.title : "Unknown title"}
						</StyledLink>
					</StyledTitle>
					<small>
						Published on {post?.date ? post.date : "Unknown date"}
					</small>
					<hr />
					<div
						className="link-color"
						dangerouslySetInnerHTML={{
							__html: marked(post.preview),
						}}
					></div>
					<small>
						<StyledLink to={postPath}>Read more</StyledLink>
					</small>
				</StyledPostCard>
			)
			howMany--
		}
		this.setState({
			PostCards: PostCards,
		})
	}

	render() {
		return (
			<>
				<Helmet>
					<title>pomp | {this.props.title}</title>

					<meta property="og:title" content={this.props.title} />
					<meta property="og:type" content="website" />
					<meta
						property="og:image"
						content={`${process.env.PUBLIC_URL}/icon/icon.svg`}
					/>
				</Helmet>

				<StyledPostList>
					<StyledH1>{this.state.h1Text}</StyledH1>
					<br />
					{this.state.PostCards}
				</StyledPostList>
			</>
		)
	}
}
