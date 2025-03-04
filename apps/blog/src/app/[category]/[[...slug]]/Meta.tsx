import {
    faBook,
    faCalendar,
    faFile,
    faHourglass,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { PageData } from "@pompydev/content/src/types/types"

export default function Meta(props: { fetchedPage: PageData }) {
    return (
        <div className="flex flex-wrap gap-x-4 text-light-text-gray dark:text-dark-text-gray">
            {/* posts count */}
            {props.fetchedPage.length > 0 && (
                <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
                    <FontAwesomeIcon icon={faFile} />
                    {props.fetchedPage.length} post
                    {props.fetchedPage.length > 1 && "s"}{" "}
                </div>
            )}
            {/* date */}
            <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
                <FontAwesomeIcon icon={faCalendar} />
                {props.fetchedPage.date || "Unknown date"}
            </div>

            {/* read time */}
            <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
                <FontAwesomeIcon icon={faHourglass} />
                {props.fetchedPage.readTime
                    ? props.fetchedPage.readTime + " read"
                    : "unknown length"}
            </div>

            {/* word count */}
            <div className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
                <FontAwesomeIcon icon={faBook} />
                {props.fetchedPage.wordCount
                    ? props.fetchedPage.wordCount +
                      " word" +
                      (props.fetchedPage.wordCount > 1 && "s")
                    : "unknown words"}
            </div>
        </div>
    )
}
