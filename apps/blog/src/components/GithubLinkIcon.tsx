import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
    href: string
}

export default function GithubLinkIcon({ href }: Props) {
    return (
        <a
            className="text-5xl text-light-footer-text transition-colors duration-75 hover:text-light-text-high-contrast dark:text-dark-footer-text dark:hover:text-dark-text-high-contrast"
            href={href}
            target="_blank"
            aria-label="GitHub link"
        >
            <FontAwesomeIcon icon={faGithub} />
        </a>
    )
}
