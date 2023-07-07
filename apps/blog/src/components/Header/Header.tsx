import { Link } from "wouter"

import ReadProgress from "./ReadProgress"
import ThemeToggleButton from "./ThemeToggleButton"

export default function Header() {
    return (
        <header className="fixed z-50 h-16 w-full bg-light-ui shadow-lg dark:bg-dark-ui">
            <div className="mx-auto flex h-[60px] max-w-screen-desktop items-center justify-between">
                <Link to="/">
                    <a
                        aria-label="homepage"
                        className="ml-4 h-10 cursor-pointer"
                    >
                        <img
                            width="40px"
                            height="40px"
                            src="/favicon.svg"
                            alt="logo"
                        />
                    </a>
                </Link>
                <div className="flex h-full">
                    <ThemeToggleButton />
                    {/* <SearchButton /> */}
                </div>
            </div>
            <ReadProgress />
        </header>
    )
}
