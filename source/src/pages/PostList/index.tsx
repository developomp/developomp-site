/**
 * PostList.tsx
 * show posts in recent order
 */

import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import styled from "styled-components"

import PostCard from "../../components/PostCard"
import ShowMoreButton from "./ShowMoreButton"

import _map from "../../data/map.json"
import theming from "../../styles/theming"

import { Map } from "../../../types/types"

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
}

const PostList = (props: Props) => {
	const [howMany, setHowMany] = useState(5)
	const [postsLength, setPostsLength] = useState(0)
	const [postCards, setPostCards] = useState<JSX.Element[]>([])

	function loadPostCards() {
		let postCount = 0
		const postCards = [] as JSX.Element[]

		for (const date of Object.keys(map.date).reverse()) {
			if (postCount >= howMany) break

			const length = map.date[date].length

			for (let i = 0; i < length; i++) {
				if (postCount >= howMany) break

				postCount++
				const url: string = map.date[date][length - i - 1]
				postCards.push(
					<PostCard key={url} postData={{ url: url, ...map.posts[url] }} />
				)
			}
		}

		setPostCards(postCards)
	}

	useEffect(() => {
		loadPostCards()
		setPostsLength(Object.keys(map.posts).length)
	}, [howMany])

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
				<h1>Recent Posts</h1>
				{postCards}
				{postsLength > howMany && (
					<ShowMoreButton
						action={() => {
							setHowMany((prev) => prev + 5)
						}}
					/>
				)}
			</StyledPostList>
		</>
	)
}

export default PostList
