import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default function SearchButton() {
    return (
        <Link
            href="/search"
            aria-label="go to search page"
            className="flex w-20 cursor-pointer items-center justify-center text-light-text-default hover:bg-light-ui-hover hover:text-light-text-default dark:text-dark-text-default dark:hover:bg-dark-ui-hover dark:hover:text-dark-text-default"
        >
            <FontAwesomeIcon icon={faSearch} />
        </Link>
    )
}
