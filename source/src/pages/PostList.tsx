/**
 * PostList.tsx
 * show posts in recent order
 */

import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import styled from "styled-components"

import PostCard from "../components/PostCard"

import _map from "../data/map.json"
import theming from "../styles/theming"

import { Map } from "../../types/typing"

const map: Map = _map

const StyledPostList = styled.div`
	text-align: center;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#111111",
			dark: "#EEEEEE",
		})};
`

interface Props {
	title: string
	howMany?: number
}

const PostList = (props: Props) => {
	const howMany = props.howMany || 0
	const [postCards, setPostCards] = useState<JSX.Element[]>([])

	useEffect(() => {
		let postCount = 0
		const _postCards = [] as JSX.Element[]

		for (const date in map.date) {
			if (postCount >= howMany) break

			const length = map.date[date].length

			for (let i = 0; i < length; i++) {
				if (postCount >= howMany) break

				postCount++
				const url: string = map.date[date][length - i - 1]
				_postCards.push(
					<PostCard
						key={url}
						postData={{ url: url, ...map.posts[url] }}
					/>
				)
			}
		}

		setPostCards(_postCards)
	}, [])

	return (
		<>
			<Helmet>
				<title>pomp | {props.title}</title>

				<meta property="og:title" content={props.title} />
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content={`${process.env.PUBLIC_URL}/icon/icon.svg`}
				/>
			</Helmet>

			<StyledPostList>
				<h1>{howMany > 0 ? `Recent ${howMany} Posts` : "All Posts"}</h1>

				{postCards}
			</StyledPostList>
		</>
	)
}

export default PostList
