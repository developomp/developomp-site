import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

interface Props {
    href: string
}

export default function GithubLinkIcon({ href }: Props) {
    return (
        <Link
            className="text-5xl text-light-footer-text transition-colors duration-75 hover:text-light-text-high-contrast dark:text-dark-footer-text dark:hover:text-dark-text-high-contrast"
            href={href}
            target="_blank"
            aria-label="GitHub link"
        >
            <FontAwesomeIcon icon={faGithub} />
        </Link>
    )
}
