/** PostList.tsx
 *  show posts in recent order
 */

import React from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet-async"

import theming from "../theming"
import map from "../data/map.json"

import PostCard from "../components/PostCard"

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
		const h1Text = isLimited ? `Recent Posts` : "All Posts"

		this.state = {
			howMany: howMany,
			isLimited: isLimited,
			h1Text: h1Text,
			PostCards: [],
		}
	}

	async componentDidMount() {
		const PostCards: Array<unknown> = []

		let postCount = 0
		for (const date in map.date) {
			if (postCount >= this.state.howMany) break

			const length = map.date[date].length
			for (let i = 0; i < length; i++) {
				if (postCount >= this.state.howMany) break

				postCount++
				const url: string = map.date[date][length - i - 1]
				PostCards.push(
					<PostCard
						key={url}
						postData={{ url: url, ...map.posts[url] }}
					/>
				)
			}
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
