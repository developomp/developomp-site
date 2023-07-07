import { useTitle } from "hoofd"
import { type ReactNode, useEffect, useState } from "react"

import PostCard from "@/components/PostCard"
import contentMap from "@/contentMap"

import ShowMoreButton from "./ShowMoreButton"

const totalPosts = Object.keys(contentMap.posts).length

export default function Home() {
    const [howMany, setHowMany] = useState(5)
    const [postCards, setPostCards] = useState<ReactNode[]>([])

    useTitle("Home")

    useEffect(() => {
        const postCards: ReactNode[] = []

        for (const date of Object.keys(contentMap.date).reverse()) {
            if (postCards.length >= howMany) break

            for (let i = contentMap.date[date].length - 1; i >= 0; i--) {
                if (postCards.length >= howMany) break

                const content_id = contentMap.date[date][i]

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
    }, [howMany])

    return (
        <div className="flex h-full w-full flex-col items-center gap-8">
            <h1>Recent Posts</h1>

            {postCards}

            {totalPosts > howMany && (
                <ShowMoreButton
                    action={() => setHowMany((prev) => prev + 10)}
                />
            )}
        </div>
    )
}
