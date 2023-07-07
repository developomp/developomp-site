import { PostData } from "@developomp-site/content/src/types/types"
import {
    faBook,
    faCalendar,
    faHourglass,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "wouter"

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
        <Link href={content_id}>
            <a className={`${className} w-full`}>
                <Card className="cursor-pointer fill-light-text-gray text-light-text-gray hover:shadow-glow dark:fill-dark-text-gray dark:text-dark-text-gray">
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
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCalendar} />
                            {date || "Unknown date"}
                            <FontAwesomeIcon icon={faBook} />
                            {readTime
                                ? readTime + " read"
                                : "unknown read time"}
                            <FontAwesomeIcon icon={faHourglass} />
                            {typeof wordCount === "number"
                                ? wordCount + " words"
                                : "unknown length"}
                        </div>
                    </small>
                </Card>
            </a>
        </Link>
    )
}
