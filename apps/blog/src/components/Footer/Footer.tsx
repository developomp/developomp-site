import GithubLinkIcon from "../GithubLinkIcon"

export default function Footer() {
    return (
        <footer className="flex h-32 justify-center bg-light-footer-bg px-4 text-light-footer-text dark:bg-dark-footer-bg dark:text-dark-footer-text">
            <div className="flex h-full w-full max-w-screen-desktop items-center justify-between text-center">
                <div>
                    Created by <b>developomp</b>
                </div>
                <GithubLinkIcon href="https://github.com/developomp/developomp-site" />
            </div>
        </footer>
    )
}
