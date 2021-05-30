import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import marked from "marked"
import { Helmet } from "react-helmet-async"

import theming from "../theming"
import pages from "../pages.json"

interface HomeProps {
	title: string
	howMany?: number
}

export default class PostList extends React.Component<HomeProps> {
	h1Text: string
	PostCards: Array<unknown> = []

	StyledPostList = styled.div`
		padding-top: 2rem;
		margin: auto;
		text-align: center;
		color: white;
		/* color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "#111111",
				dark: "#EEEEEE",
			})}; */
	`

	StyledH1 = styled.h1`
		margin-bottom: 20px;
		font-weight: 500;
		margin: 0;
	`

	StyledTitle = styled.h1`
		font-size: 2rem;
		font-style: bold;
	`

	StyledLink = styled(Link)`
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

	StyledPostCard = styled.div`
		box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
		text-align: left;
		margin-bottom: 20px;
		padding: 10px 20px;
	`

	constructor(props) {
		super(props)

		let howMany = props.howMany | 0

		const isLimited = howMany ? true : false

		this.h1Text = isLimited ? `${howMany} recent posts` : "All posts"

		for (const pagePath in pages) {
			if (isLimited && howMany <= 0) continue

			const post = pages[pagePath]

			this.PostCards.push(
				<this.StyledPostCard
					key={pagePath}
					className="card main-content"
				>
					<this.StyledTitle>
						<this.StyledLink to={pagePath}>
							{post.meta?.title
								? post.meta.title
								: "Unknown title"}
						</this.StyledLink>
					</this.StyledTitle>
					<small>
						Published on{" "}
						{post.meta?.date ? post.meta.date : "Unknown date"} by{" "}
						{post.meta?.author
							? post.meta.author
							: "Unknown author"}
					</small>
					<hr />
					<div
						className="link-color"
						dangerouslySetInnerHTML={{
							__html: marked(
								post.content.split(" ").slice(0, 20).join(" ") +
									"..."
							),
						}}
					></div>
					<small>
						<this.StyledLink to={pagePath}>
							Read more
						</this.StyledLink>
					</small>
				</this.StyledPostCard>
			)
			howMany--
		}
	}

	render() {
		return (
			<>
				<Helmet>
					<title>pomp | {this.props.title}</title>

					<meta property="og:title" content={this.props.title} />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="http://developomp.com" />
					<meta
						property="og:image"
						content="http://developomp.com/icon/icon.svg"
					/>
					<meta property="og:description" content="" />
				</Helmet>

				<this.StyledPostList>
					<this.StyledH1>{this.h1Text}</this.StyledH1>
					<br />
					{this.PostCards}
				</this.StyledPostList>
			</>
		)
	}
}
