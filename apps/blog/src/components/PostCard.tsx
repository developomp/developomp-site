import {
    faBook,
    faCalendar,
    faHourglass,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { PostData } from "@pompydev/content/src/types/types"
import Link from "next/link"

import Card from "@/components/Card"
import Tag from "@/components/Tag"
import TagList from "@/components/TagList"

interface PostCardData extends PostData {
    content_id: string
}

interface Props {
    postData: PostCardData
    className?: string
}

export default function PostCard({ postData, className }: Props) {
    const { content_id, wordCount, date, readTime, title, tags } = postData

    return (
        <Link href={content_id} className={`${className} w-full`}>
            <Card className="w-full cursor-pointer fill-light-text-gray text-light-text-gray hover:shadow-glow dark:fill-dark-text-gray dark:text-dark-text-gray">
                <h2 className="mb-8 text-3xl">
                    {title}
                    {/* show "(series)" for urls that matches regex "/series/<series-title>" */}
                    {/\/series\/[^/]*$/.test(content_id) && " (series)"}
                </h2>
                <small>
                    <TagList>
                        {tags &&
                            tags.map((tag) => (
                                <Tag key={title + tag} text={tag} />
                            ))}
                    </TagList>
                    <hr />
                    <div className="flex flex-wrap items-center gap-x-4">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <FontAwesomeIcon icon={faCalendar} />
                            {date || "Unknown date"}
                        </div>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <FontAwesomeIcon icon={faBook} />
                            {readTime
                                ? readTime + " read"
                                : "unknown read time"}
                        </div>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <FontAwesomeIcon icon={faHourglass} />
                            {typeof wordCount === "number"
                                ? wordCount + " words"
                                : "unknown length"}
                        </div>
                    </div>
                </small>
            </Card>
        </Link>
    )
}
