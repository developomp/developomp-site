import { PageData } from "@developomp-site/content/src/types/types"
import {
    faBook,
    faCalendar,
    faFile,
    faHourglass,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Meta(props: { fetchedPage: PageData }) {
    return (
        <div className="text-light-text-gray dark:text-dark-text-gray">
            {/* posts count */}
            {props.fetchedPage.length > 0 && (
                <>
                    <FontAwesomeIcon icon={faFile} />
                    &nbsp;&nbsp;
                    {props.fetchedPage.length} post
                    {props.fetchedPage.length > 1 && "s"}{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </>
            )}
            {/* date */}
            <FontAwesomeIcon icon={faCalendar} />
            &nbsp;&nbsp;
            {props.fetchedPage.date || "Unknown date"}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {/* read time */}
            <FontAwesomeIcon icon={faHourglass} />
            &nbsp;&nbsp;
            {props.fetchedPage.readTime
                ? props.fetchedPage.readTime + " read"
                : "unknown length"}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {/* word count */}
            <FontAwesomeIcon icon={faBook} />
            &nbsp;&nbsp;
            {props.fetchedPage.wordCount
                ? props.fetchedPage.wordCount +
                  " word" +
                  (props.fetchedPage.wordCount > 1 && "s")
                : "unknown words"}
        </div>
    )
}
