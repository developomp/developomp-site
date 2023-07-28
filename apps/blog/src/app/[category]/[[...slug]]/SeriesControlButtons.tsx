import {
    faArrowLeft,
    faArrowRight,
    faListUl,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

interface Props {
    seriesHome: string
    prevURL?: string
    nextURL?: string
}

export default function SeriesControlButtons({
    prevURL,
    seriesHome,
    nextURL,
}: Props) {
    return (
        <div className="mb-5 flex justify-between">
            {prevURL ? (
                <Link href={prevURL}>
                    <button className="button">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </Link>
            ) : (
                <button className="button-disabled">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            )}

            <Link href={seriesHome}>
                <button className="button">
                    <FontAwesomeIcon icon={faListUl} />
                </button>
            </Link>

            {nextURL ? (
                <Link href={nextURL}>
                    <button className="button">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </Link>
            ) : (
                <button className="button-disabled">
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            )}
        </div>
    )
}
