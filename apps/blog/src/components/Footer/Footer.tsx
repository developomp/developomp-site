import { faRss } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import GithubLinkIcon from "../GithubLinkIcon"

export default function Footer() {
    return (
        <footer className="flex h-32 justify-center bg-light-footer-bg px-4 text-light-footer-text dark:bg-dark-footer-bg dark:text-dark-footer-text">
            <div className="flex h-full w-full max-w-screen-desktop items-center justify-between text-center">
                <div>
                    Created by <b>pomp</b>
                </div>
                <div className="flex items-center gap-2">
                    <a
                        href="/rss.xml"
                        className="text-3xl text-light-footer-text transition-colors duration-75 hover:text-light-text-high-contrast dark:text-dark-footer-text dark:hover:text-dark-text-high-contrast"
                    >
                        <FontAwesomeIcon icon={faRss} />
                    </a>
                    <GithubLinkIcon href="https://github.com/pompydev/pompy.dev" />
                </div>
            </div>
        </footer>
    )
}
