/**
 * PostList.tsx
 * show posts in recent order
 */

import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import styled from "styled-components"

import PostCard from "../../components/PostCard"
import ShowMoreButton from "./ShowMoreButton"

import contentMap from "../../contentMap"

const PostList = styled.div`
	flex-direction: column;
	align-items: center;
	text-align: center;

	color: ${({ theme }) => theme.theme.color.text.default};
`

export default () => {
	const [howMany, setHowMany] = useState(5)
	const [postsLength, setPostsLength] = useState(0)
	const [postCards, setPostCards] = useState<JSX.Element[]>([])

	const loadPostCards = useCallback(() => {
		let postCount = 0
		const postCards = [] as JSX.Element[]

		for (const date of Object.keys(contentMap.date).reverse()) {
			if (postCount >= howMany) break

			const length = contentMap.date[date].length

			for (let i = 0; i < length; i++) {
				if (postCount >= howMany) break

				postCount++
				const content_id = contentMap.date[date][length - i - 1]

				postCards.push(
					<PostCard
						key={content_id}
						postData={{
							content_id: content_id,
							...contentMap.posts[content_id],
						}}
					/>
				)
			}
		}

		setPostCards(postCards)
	}, [howMany, postCards])

	useEffect(() => {
		loadPostCards()
		setPostsLength(Object.keys(contentMap.posts).length)
	}, [howMany])

	return (
		<>
			<Helmet>
				<title>pomp | Home</title>

				<meta property="og:type" content="website" />
				<meta property="og:image" content="/icon/icon.svg" />
			</Helmet>

			<PostList>
				<h1>Recent Posts</h1>

				{postCards}

				{postsLength > howMany && (
					<ShowMoreButton
						action={() => {
							setHowMany((prev) => prev + 5)
						}}
					/>
				)}
			</PostList>
		</>
	)
}
