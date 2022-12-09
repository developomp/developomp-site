/**
 * PostList.tsx
 * show posts in recent order
 */

import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import styled from "styled-components"

import PostCard from "../../components/PostCard"
import ShowMoreButton from "./ShowMoreButton"

import _map from "../../data/map.json"
import theming from "../../styles/theming"

import { globalContext } from "../../globalContext"

import type { Map } from "../../../types/types"

const map: Map = _map

const StyledPostList = styled.div`
	text-align: center;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#111111",
			dark: "#EEEEEE",
		})};
`

const Home = () => {
	const { globalState } = useContext(globalContext)
	const { locale } = globalState

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
				const content_id = map.date[date][length - i - 1]

				postCards.push(
					<PostCard
						key={content_id}
						postData={{
							content_id: content_id,
							...map.posts[content_id],
						}}
					/>
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
				<title>pomp | {locale == "en" ? "Home" : "홈"}</title>

				<meta property="og:type" content="website" />
				<meta property="og:image" content="/icon/icon.svg" />
			</Helmet>

			<StyledPostList>
				<h1>{locale == "en" ? "Recent Posts" : "최근 포스트"}</h1>
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

export default Home
