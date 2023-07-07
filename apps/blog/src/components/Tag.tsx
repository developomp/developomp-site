import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { MouseEvent } from "react"

interface Props {
    text: string
    onClick?: (event: MouseEvent<never>) => void
}

export default function Tag(props: Props) {
    return (
        <div
            className="mr-3 flex items-center rounded-lg text-center"
            onClick={props.onClick || undefined}
        >
            <FontAwesomeIcon icon={faHashtag} />
            {props.text}
        </div>
    )
}
