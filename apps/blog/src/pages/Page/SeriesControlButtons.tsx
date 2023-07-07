import {
    faArrowLeft,
    faArrowRight,
    faListUl,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "wouter"

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
                <Link to={prevURL}>
                    <button className="button">
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                </Link>
            ) : (
                <button className="button-disabled">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            )}

            <Link to={seriesHome}>
                <button className="button">
                    <FontAwesomeIcon icon={faListUl} />
                </button>
            </Link>

            {nextURL ? (
                <Link to={nextURL}>
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
