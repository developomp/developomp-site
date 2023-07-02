/**
 * PostList.tsx
 * show posts in recent order
 */

import { useMeta, useTitle } from "hoofd"
import { type FC, useCallback, useEffect, useState } from "react"
import styled from "styled-components"

import PostCard from "../../components/PostCard"
import contentMap from "../../contentMap"
import ShowMoreButton from "./ShowMoreButton"

const PostList = styled.div`
    flex-direction: column;
    align-items: center;
    text-align: center;

    color: ${({ theme }) => theme.theme.color.text.default};
`

const Home: FC = () => {
    const [howMany, setHowMany] = useState(5)
    const [postsLength, setPostsLength] = useState(0)
    const [postCards, setPostCards] = useState<JSX.Element[]>([])

    useTitle("Home")
    useMeta({ property: "og:title", content: "Home" })

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

export default Home
