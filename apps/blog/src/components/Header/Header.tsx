import Image from "next/image"
import Link from "next/link"

import ReadProgress from "./ReadProgress"
import ThemeToggleButton from "./ThemeToggleButton"

export default function Header() {
    return (
        <header className="fixed z-50 h-16 w-full bg-light-ui shadow-lg dark:bg-dark-ui">
            <div className="mx-auto flex h-[60px] max-w-screen-desktop items-center justify-between">
                <Link
                    aria-label="homepage"
                    href="/"
                    className="ml-4 h-10 cursor-pointer"
                >
                    <Image
                        src="/favicon.svg"
                        alt="logo"
                        width={40}
                        height={40}
                    />
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
